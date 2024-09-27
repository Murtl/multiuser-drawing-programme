import { Router } from '../../router/router';
import { DrawingAreaPreviewElementsStore } from '../../store/DrawingAreaPreviewElementsStore';
import { AuthHandler } from './AuthHandler';
import {
  drawingAreaPermissions,
  drawingAreaPermissionsType,
} from '../interfaces-types/typesPermissions';
import { showCustomMessageModal } from '../functions/showCustomMessageModal';

/**
 * Klasse für die Vorschau-Elemente der Zeichenflächen, die auf der Übersichtsseite gerendert werden.
 */
export class DrawingAreaPreview {
  /**
   * Identifikationsnummer des Vorschau-Elements, damit es eindeutig identifiziert werden kann im DOM.
   */
  private readonly identifier: number;
  private readonly permission: drawingAreaPermissionsType;
  private readonly drawingAreaId: string;

  constructor(
    identifier: number,
    permission: drawingAreaPermissionsType,
    drawingAreaId: string
  ) {
    this.identifier = identifier;
    this.permission = permission;
    this.drawingAreaId = drawingAreaId;
  }

  /**
   * Gibt die ID der Zeichenfläche zurück.
   */
  getDrawingAreaId(): string {
    return this.drawingAreaId;
  }

  /**
   * Gibt die Rechte des Benutzers auf der Zeichenfläche zurück.
   */
  getPermission(): drawingAreaPermissionsType {
    return this.permission;
  }

  /**
   * Rendert das Vorschau-Element der Zeichenfläche.
   */
  render(): string {
    const subContainer = document.createElement('div');
    subContainer.classList.add('sub-container-preview-drawing-area-element');
    const createButton = document.createElement('button');
    createButton.classList.add('custom-button');
    createButton.id = `open-draw-area-button-${this.identifier}`;
    createButton.innerText = 'Öffnen';
    subContainer.innerHTML = `
            <span>Deine Rechte auf dieser Zeichenfläche (ID: ${this.drawingAreaId}): </span>
            <span>${drawingAreaPermissions[this.permission]}</span>
        `;
    subContainer.appendChild(createButton);
    if (this.permission === 'O') {
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('custom-button');
      deleteButton.innerText = 'Löschen';
      deleteButton.id = `delete-draw-area-button-${this.identifier}`;
      subContainer.appendChild(deleteButton);
    }
    return `
            <img src="../../assets/drawingAreaPreview.png" alt="drawingAreaPreview" class="drawing-area-preview-img"/>
            ${subContainer.outerHTML}
        `;
  }

  /**
   * Initialisiert das Vorschau-Element der Zeichenfläche.
   * @param router - Router-Instanz
   * @param authHandler - AuthHandler-Instanz
   * @param parentElement - Eltern-Element, in dem das Vorschau-Element gerendert wird
   * @param drawingAreaPreviewElementsStore - DrawingAreaPreviewElementsStore-Instanz
   */
  initialize(
    router: Router,
    authHandler: AuthHandler,
    parentElement: HTMLElement,
    drawingAreaPreviewElementsStore: DrawingAreaPreviewElementsStore
  ): void {
    const newDrawingAreaPreviewElement = document.createElement('section');
    newDrawingAreaPreviewElement.classList.add(
      'container-preview-drawing-area-element'
    );
    newDrawingAreaPreviewElement.innerHTML = this.render();
    parentElement.appendChild(newDrawingAreaPreviewElement);

    const openDrawAreaButton = document.getElementById(
      `open-draw-area-button-${this.identifier}`
    );
    if (openDrawAreaButton) {
      openDrawAreaButton.addEventListener('click', async () => {
        await router.navigateTo(`#/drawing-area/${this.drawingAreaId}`);
      });
    }

    if (this.permission === 'O') {
      const deleteDrawAreaButton = document.getElementById(
        `delete-draw-area-button-${this.identifier}`
      );
      if (deleteDrawAreaButton) {
        deleteDrawAreaButton.addEventListener('click', async () => {
          try {
            await drawingAreaPreviewElementsStore.removeDrawingAreaPreviewElement(
              this
            );
            newDrawingAreaPreviewElement.remove();
            showCustomMessageModal(
              'Erfolg',
              'Zeichenfläche wurde erfolgreich gelöscht!'
            );
          } catch (e) {
            showCustomMessageModal('Fehler', `${e}`);
          }
        });
      }
    }
  }
}
