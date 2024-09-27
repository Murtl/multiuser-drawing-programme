import { Router } from '../router/router';
import { AuthHandler } from '../utils/classes/AuthHandler';
import { ShapeFactory, ShapeView } from '../utils/interfaces-types/typesShapes';
import { IShapeManager } from '../utils/interfaces-types/IShapeManager';
import { CustomIShapeManager } from '../utils/classes/CustomIShapeManager';
import {
  CircleFactory,
  LineFactory,
  RectangleFactory,
  SelectorFactory,
  TriangleFactory,
} from '../utils/classes/ShapeFactories';
import { ToolArea } from '../utils/classes/ToolArea';
import { Canvas } from '../utils/classes/Canvas';
import { EventFan } from '../utils/classes/EventFan';
import {
  drawingAreaPermissions,
  drawingAreaPermissionsType,
} from '../utils/interfaces-types/typesPermissions';
import {
  addUserToDrawingArea,
  getUsersForDrawingArea,
  removeUserFromDrawingArea,
} from '../utils/functions/updateUsersForDrawingArea';
import { getInformationForDrawingArea } from '../utils/functions/getInformationForDrawingArea';
import { SelectColorFactory } from '../utils/classes/SelectColorFactory';
import { DrawingAreaIShapesStore } from '../store/DrawingAreaIShapesStore';
import { showCustomMessageModal } from '../utils/functions/showCustomMessageModal';

/**
 * Klasse für die eine DrawingArea-Seite.
 */
export class DrawingArea {
  private readonly drawingAreaId: string;
  private readonly permission: drawingAreaPermissionsType;
  private readonly authHandler: AuthHandler;
  private moderatedState: boolean = false;
  private iShapeStore = DrawingAreaIShapesStore.getInstance();

  constructor(
    drawingAreaId: string,
    permission: drawingAreaPermissionsType,
    authHandler: AuthHandler
  ) {
    this.drawingAreaId = drawingAreaId;
    this.permission = permission;
    this.authHandler = authHandler;
  }

  /**
   * Rendert die Zeichenfläche.
   */
  async render(): Promise<string> {
    return `
            <p>Wählen Sie auf der linken Seite Ihr Zeichenwerkzeug aus.
            Haben Sie eines ausgewählt, können Sie mit der Maus
            die entsprechenden Figuren zeichen. Typischerweise, indem
            Sie die Maus drücken, dann mit gedrückter Maustaste die
            Form bestimmen, und dann anschließend die Maustaste loslassen.
            </p>
                        
            <div class="custom-drawing-area-wrapper" id="customDrawingAreaWrapper">
                <ul class="tools" id="tools"></ul>
            
                <canvas id="drawArea" class="draw-area" width="900" height="800"></canvas>      
                
                <section class="sub-custom-drawing-area-wrapper">
                    <p>Zeichenfläche ID: ${this.drawingAreaId}</p>
                    <p>Deine Rechte: ${drawingAreaPermissions[this.permission]}</p>
                    <p id="moderate-p">Zustand der Zeichenfläche: ${this.moderatedState ? 'moderiert' : 'normal'}</p>
                    <div class="dynamic-sub-custom-drawing-area-wrapper" id="dynamic-sub-wrapper">
                    </div>
                    <button class="custom-button" id="back">Zurück zur Übersicht</button>     
                    <button class="custom-button" id="logout">Logout</button>
                    <p>Verbundene User auf dieser Zeichenfläche:</p>      
                    <ul id="connectedUsers">               
                       
                    </ul> 
                </section> 
            </div>
        `;
  }

  /**
   * Initialisiert die Zeichenfläche.
   * @param router - Router-Instanz
   */
  async initialize(router: Router) {
    /**
     * Erstellt eine WebSocket-Verbindung zum Server für die DrawingArea.
     */
    const ws = new WebSocket(
      `ws://localhost:3000/ws/drawingArea/${this.drawingAreaId}`
    );

    /**
     * Event-Handler für die WebSocket-Verbindung bei Verbindungsaufbau.
     */
    ws.onopen = () => {
      console.log(`Verbunden mit DrawingArea: ${this.drawingAreaId}`);
    };

    /**
     * Event-Handler für die WebSocket-Verbindung bei Verbindungsschluss.
     */
    ws.onclose = () => {
      console.log(
        `Verbindung zu DrawingArea ${this.drawingAreaId} geschlossen`
      );
    };

    /**
     * Event-Handler für die WebSocket-Verbindung bei verschiedenen Nachrichten.
     * @param event - Event-Objekt vom Server
     */
    ws.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      /**
       * Beim connectedUsers-Event werden die derzeitig verbundenen User auf der DrawingArea in der Liste aktualisiert.
       */
      if (message.type === 'connectedUsers') {
        const connectedUsersListElement =
          document.getElementById('connectedUsers');
        const connectedUsers = message.connectedUsers;
        if (connectedUsersListElement) {
          connectedUsersListElement.innerHTML = '';
          connectedUsers.forEach((user: { name: string; color: string }) => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            span.innerText = `${user.color}`;
            span.style.color = user.color;
            li.innerText = `User: ${user.name}, Selekt-Farbe: `;
            li.appendChild(span);
            connectedUsersListElement.appendChild(li);
          });
        }
        /**
         * Beim selectColor-Event wird die Selekt-Farbe gesetzt, die der User für die Zeichenfläche hat.
         */
      } else if (message.type === 'selectColor') {
        const selectColor = message.selectColor;
        SelectColorFactory.setSelectColor(selectColor);
        /**
         * Beim update-Event werden die Shapes auf der DrawingArea aktualisiert.
         */
      } else if (message.type === 'update') {
        eventFan.applyEvents(message.event);
        /**
         * Beim moderate-Event wird der Zustand der Zeichenfläche aktualisiert.
         * Je nach Zustand wird die Zeichenfläche für den User, abhängig von seinen Rechten, gesperrt oder entsperrt.
         */
      } else if (message.type === 'moderate') {
        this.moderatedState = message.moderated;
        if (moderateP) {
          moderateP.innerText = `Zustand der Zeichenfläche: ${
            this.moderatedState ? 'moderiert' : 'normal'
          }`;
        }
        if (this.permission === 'W') {
          if (this.moderatedState) {
            canvasDomElm.style.pointerEvents = 'none';
            menu.remove();
          } else {
            canvasDomElm.style.pointerEvents = 'auto';
            const customDrawingAreaWrapper = document.getElementById(
              'customDrawingAreaWrapper'
            );
            if (customDrawingAreaWrapper) {
              customDrawingAreaWrapper.insertBefore(menu, canvasDomElm);
            }
          }
        }
        /**
         * Beim eventSuccess-Event werden die Shapes auf der DrawingArea aktualisiert.
         * Kommt immer dann, wenn der User eine Aktion auf der DrawingArea durchgeführt hat und diese erfolgreich war.
         */
      } else if (message.type === 'eventSuccess') {
        eventFan.applyEvents(message.event);
        /**
         * Beim error-Event wird eine Fehlermeldung angezeigt.
         */
      } else if (message.type === 'error') {
        showCustomMessageModal('Fehler', message.message);
        /**
         * Beim criticalError-Event wird eine Fehlermeldung angezeigt und der User wird auf die Startseite weitergeleitet.
         */
      } else if (message.type === 'criticalError') {
        showCustomMessageModal('Kritischer Fehler', message.message);
        await this.authHandler.refreshDrawingAreas();
        ws.close();
        await router.navigateTo('#/');
      } else {
        showCustomMessageModal(
          'Unbekannter Fehler',
          `Unbekannter Fehler vom Server: ${message}`
        );
      }
    };

    /**
     * Registriert den WebSocket für die DrawingArea, damit der Router die Verbindung schließen kann, wenn die Seite verlassen wird.
     */
    router.registerWebsocket(ws);

    /**
     * Initialisiert die Zeichenfläche mit den Tools und dem EventFan.
     */
    const canvasDomElm = document.getElementById(
      'drawArea'
    ) as HTMLCanvasElement;
    const menu = document.getElementById('tools') as HTMLElement;
    let canvas: ShapeView;
    const eventFan = new EventFan();
    const sm: IShapeManager = new CustomIShapeManager(
      eventFan,
      ws,
      this.authHandler.getUserId()
    );
    const shapesSelector: ShapeFactory[] = [
      new LineFactory(sm),
      new CircleFactory(sm),
      new RectangleFactory(sm),
      new TriangleFactory(sm),
      new SelectorFactory(sm, this.authHandler.getUserId()),
    ];
    const toolArea = new ToolArea(shapesSelector, menu);
    canvas = new Canvas(canvasDomElm, toolArea, this.authHandler.getUserId());
    eventFan.register(canvas);

    /**
     * Event-Listener für den Logout-Button.
     */
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
      logoutButton.addEventListener('click', async () => {
        await this.authHandler.logout();
        await router.navigateTo('#/login');
      });
    }

    /**
     * Event-Listener für den Zurück-Button.
     */
    const backButton = document.getElementById('back');
    if (backButton) {
      backButton.addEventListener('click', async () => {
        await router.navigateTo('#/');
      });
    }

    /**
     * Erstellt die dynamischen Buttons für die DrawingArea, abhängig von den Rechten des Users.
     */
    this.createDynamicButtons(ws);

    /**
     * Lädt die Informationen für die DrawingArea.
     */
    await this.getDrawingAreaInformation(eventFan, ws, router);

    /**
     * Ist der Zustand der Zeichenfläche moderiert, werden die Zeichenfläche und das Menü für den User, abhängig von den Rechten, gesperrt.
     */
    if (
      (this.moderatedState && this.permission === 'W') ||
      this.permission === 'R'
    ) {
      menu.remove();
    }
    const moderateP = document.getElementById('moderate-p');
    if (moderateP) {
      moderateP.innerText = `Zustand der Zeichenfläche: ${
        this.moderatedState ? 'moderiert' : 'normal'
      }`;
    }
  }

  /**
   * Lädt die Informationen für die DrawingArea.
   * @param eventFan - EventFan-Instanz
   * @param ws - WebSocket-Instanz
   * @param router - Router-Instanz
   */
  private async getDrawingAreaInformation(
    eventFan: EventFan,
    ws: WebSocket,
    router: Router
  ) {
    const { success, message, isModerated, eventsForDrawingArea } =
      await getInformationForDrawingArea(this.drawingAreaId);
    if (
      success &&
      isModerated !== undefined &&
      eventsForDrawingArea !== undefined
    ) {
      this.moderatedState = isModerated;
      this.iShapeStore.setIShapes([]);
      this.iShapeStore.setSelectedIShapes([]);
      eventFan.applyEvents(eventsForDrawingArea);
    }
    /**
     * Wenn die Anfrage fehlschlägt, wird eine Fehlermeldung angezeigt und der User wird auf die Startseite weitergeleitet.
     */
    if (!success) {
      showCustomMessageModal('Fehler', message);
      ws.close();
      await this.authHandler.refreshDrawingAreas();
      await router.navigateTo('#/');
    }
  }

  /**
   * Erstellt die dynamischen Buttons für die DrawingArea, abhängig von den Rechten des Users.
   * @param ws - WebSocket-Instanz
   */
  private createDynamicButtons(ws: WebSocket): void {
    const dynamicSubWrapper = document.getElementById('dynamic-sub-wrapper');
    if (
      dynamicSubWrapper &&
      (this.permission === 'O' ||
        this.permission === 'CO' ||
        this.permission === 'M')
    ) {
      /**
       * Button zum Einladen eines Users auf die DrawingArea.
       * Achtung: Die User-ID muss manuell eingegeben und in Erfahrung gebracht werden.
       */
      const inviteButton = document.createElement('button');
      inviteButton.classList.add('custom-button');
      inviteButton.innerText = 'User Einladen';
      inviteButton.id = 'invite';
      inviteButton.addEventListener('click', () => {
        this.createInviteModal();
      });
      dynamicSubWrapper.appendChild(inviteButton);

      /**
       * Button zum Entfernen eines Users von der DrawingArea.
       */
      const removeUserButton = document.createElement('button');
      removeUserButton.classList.add('custom-button');
      removeUserButton.innerText = 'User Entfernen';
      removeUserButton.id = 'removeUser';
      removeUserButton.addEventListener('click', async () => {
        await this.createRemoveUserModal();
      });
      dynamicSubWrapper.appendChild(removeUserButton);

      /**
       * Button zum Setzten des Zustands der Zeichenfläche auf moderiert oder normal.
       */
      const moderateButton = document.createElement('button');
      moderateButton.classList.add('custom-button');
      moderateButton.innerText = 'Toggle Moderieren';
      moderateButton.addEventListener('click', async () => {
        await this.moderateHandler(ws);
      });
      dynamicSubWrapper.appendChild(moderateButton);
    }
  }

  /**
   * Handler für das Setzen des Zustands der Zeichenfläche auf moderiert oder normal.
   * @param ws - WebSocket-Instanz
   */
  private async moderateHandler(ws: WebSocket): Promise<void> {
    const moderateEvent = {
      type: 'moderate',
      moderated: !this.moderatedState,
    };
    ws.send(JSON.stringify(moderateEvent));
  }

  /**
   * Erstellt das Modal zum Einladen eines Users auf die DrawingArea.
   */
  private createInviteModal(): void {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.style.display = 'block';

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const closeButton = document.createElement('span');
    closeButton.classList.add('close');
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    const inputLabel = document.createElement('label');
    inputLabel.textContent = 'User-ID: ';
    inputLabel.htmlFor = 'userId-input';
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Enter text here...';
    inputField.id = 'userId-input';
    inputField.style.width = '200px';

    const radioOptions = document.createElement('div');

    /**
     * Je nach Recht des Users werden die Rechte, die der eingeladene User auf der DrawingArea haben kann, angezeigt.
     */
    const permissionKeys: drawingAreaPermissionsType[] = ['V', 'W', 'R'];
    if (this.permission === 'O') {
      permissionKeys.unshift('CO', 'M');
    }
    if (this.permission === 'CO') {
      permissionKeys.unshift('M');
    }
    permissionKeys.forEach((key: drawingAreaPermissionsType) => {
      const label = document.createElement('label');
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'permission';
      radio.value = key;
      label.appendChild(radio);
      label.appendChild(document.createTextNode(drawingAreaPermissions[key]));
      radioOptions.appendChild(label);
      radioOptions.appendChild(document.createElement('br'));
    });

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Einladen';
    submitButton.addEventListener('click', async () => {
      try {
        const userIdToAdd = (
          document.getElementById('userId-input') as HTMLInputElement
        ).value;
        const permission = (
          document.querySelector(
            'input[name="permission"]:checked'
          ) as HTMLInputElement
        ).value;
        if (!userIdToAdd || !permission) {
          showCustomMessageModal('Fehler', 'Bitte füllen Sie alle Felder aus!');
          return;
        }
        const { success, message } = await addUserToDrawingArea(
          this.drawingAreaId,
          permission as drawingAreaPermissionsType,
          userIdToAdd
        );

        showCustomMessageModal('Status', message);
        if (success) {
          document.body.removeChild(modal);
        }
      } catch (error) {
        showCustomMessageModal('Fehler', 'Bitte füllen Sie alle Felder aus!');
        return;
      }
    });

    modalContent.appendChild(closeButton);
    modalContent.appendChild(inputLabel);
    modalContent.appendChild(inputField);
    modalContent.appendChild(radioOptions);
    modalContent.appendChild(submitButton);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
  }

  /**
   * Erstellt das Modal zum Entfernen eines Users von der DrawingArea.
   */
  private async createRemoveUserModal() {
    const deleteModal = document.createElement('div');
    deleteModal.classList.add('modal');
    deleteModal.style.display = 'block';

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const closeButton = document.createElement('span');
    closeButton.classList.add('close');
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', () => {
      document.body.removeChild(deleteModal);
    });

    /**
     * Je nach Recht des Users werden die User, die auf der DrawingArea verbunden sind, angezeigt.
     * Er kann nur die User entfernen, die ein niedrigeres Recht als er selbst haben.
     */
    const usersForDrawingArea = await getUsersForDrawingArea(
      this.drawingAreaId
    );
    if (usersForDrawingArea.users && usersForDrawingArea.users.length > 0) {
      const table = document.createElement('table');
      const thead = document.createElement('thead');
      const tr = document.createElement('tr');
      const th1 = document.createElement('th');
      th1.textContent = 'User-ID';
      const th2 = document.createElement('th');
      th2.textContent = 'Recht';
      const th3 = document.createElement('th');
      th3.textContent = 'Aktion';
      tr.appendChild(th1);
      tr.appendChild(th2);
      tr.appendChild(th3);
      thead.appendChild(tr);
      table.appendChild(thead);
      const tbody = document.createElement('tbody');
      usersForDrawingArea.users.forEach((user) => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.textContent = user.userId;
        const td2 = document.createElement('td');
        td2.textContent = drawingAreaPermissions[user.permission];
        const td3 = document.createElement('td');
        const button = document.createElement('button');
        button.textContent = 'Remove';
        button.addEventListener('click', async () => {
          const { success, message } = await removeUserFromDrawingArea(
            this.drawingAreaId,
            user.userId
          );
          showCustomMessageModal('Status', message);
          if (success) {
            document.body.removeChild(deleteModal);
          }
        });
        td3.appendChild(button);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);
      });
      table.style.borderSpacing = '10px';
      table.appendChild(tbody);

      modalContent.appendChild(closeButton);
      modalContent.appendChild(table);
      deleteModal.appendChild(modalContent);
    } else {
      const noDataInfo = document.createElement('p');
      noDataInfo.textContent = 'Keine User gefunden';
      modalContent.appendChild(closeButton);
      modalContent.appendChild(noDataInfo);
      deleteModal.appendChild(modalContent);
    }

    document.body.appendChild(deleteModal);
  }
}
