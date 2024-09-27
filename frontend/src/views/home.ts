import { Router } from '../router/router';
import { AuthHandler } from '../utils/classes/AuthHandler';
import { DrawingAreaPreviewElementsStore } from '../store/DrawingAreaPreviewElementsStore';
import { showCustomMessageModal } from '../utils/functions/showCustomMessageModal';

/**
 * Klasse für die Home-Seite.
 */
export class HomePage {
  /**
   * Rendert die Home-Seite.
   */
  static async render(): Promise<string> {
    return `
             <main class="container-home">
                <section class="container-header">
                    <img src="../assets/tha_logo.svg" alt="Logo" />
                     <div class="sub-container-header-text">
                        <h2>Willkommen bei meinem Multiuser-Zeichenprogramm!</h2>
                        <h4>von Michael Mertl im SoSe2024</h4>
                     </div>
                     <button id="logout-button" class="custom-button">Logout</button>
                </section>
                
                <section class="container-main">
                    <h2>Profileinstellungen</h2>
                    <section class="container-profile-settings">
                        <div class="sub-container-profile-settings">
                            <label for="userId">User ID:</label>
                            <span id="userId"></span>
                        </div>
                        <div class="sub-container-profile-settings">
                            <label for="username">Aktueller Benutzername: </label>
                            <span id="username"></span>
                            <form class="sub-container-profile-settings" id="username-form">
                                <label for="new-username">Neuer Benutzername: </label>
                                <input type="text" id="new-username" name="new-username" required>
                                <button type="submit" class="custom-button">Benutzername speichern</button>
                            </form>      
                        </div>
                        <div class="sub-container-profile-settings">
                            <label for="email">Aktuelle E-Mail: </label>
                            <span id="email"></span>
                            <form class="sub-container-profile-settings" id="email-form">
                                <label for="new-email">Neue E-Mail: </label>
                                <input type="text" id="new-email" name="new-email" required>
                                <button type="submit" class="custom-button">E-Mail speichern</button>
                            </form>      
                        </div>                        
                        <form class="sub-container-profile-settings" id="password-form">
                            <label for="old-password">Altes Passwort:</label>
                            <input type="password" id="old-password" name="old-password" required>
                            <label for="new-password">Neues Passwort:</label>
                            <input type="password" id="new-password" name="new-password" required>
                            <label for="confirm-new-password">Neues Passwort bestätigen:</label>
                            <input type="password" id="confirm-new-password" name="confirm-new-password" required>
                            <button type="submit" class="custom-button">Passwort speichern</button>
                        </form>      
                    </section>
                </section>      
                
                <section class="container-main">
                    <h2>Zeichenflächen</h2>
                    <div class="sub-container-main">
                      <button class="custom-button" id="add-drawing-area-button">Neue Zeichenfläche erstellen</button>
                      <button class="custom-button" id="refresh-drawing-area-button">Zeichen-flächen neu Laden</button>
                    </div>
                    <section class="container-preview-drawing-area" id="preview-drawing-area"> 
                    </section>
                </section>           
            </main>
        `;
  }

  /**
   * Initialisiert die Home-Seite.
   * @param router - Router-Instanz.
   * @param authHandler - AuthHandler-Instanz.
   */
  static initialize(router: Router, authHandler: AuthHandler) {
    /**
     * Setzt die Benutzerinformationen in die entsprechenden Elemente.
     */
    const userIdElement = document.getElementById('userId');
    if (userIdElement) {
      userIdElement.innerText = authHandler.getUserId();
    }
    const usernameElement = document.getElementById('username');
    if (usernameElement) {
      usernameElement.innerText = authHandler.getUsername();
    }
    const emailElement = document.getElementById('email');
    if (emailElement) {
      emailElement.innerText = authHandler.getEMail();
    }

    /**
     * Event-Listener für die Profileinstellungen.
     */
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
      logoutButton.addEventListener('click', async () => {
        await authHandler.logout();
        await router.navigateTo('#/login');
      });
    }

    /**
     * Event-Listener für die Änderung des Benutzernamens.
     */
    const usernameForm = document.getElementById('username-form');
    if (usernameForm) {
      usernameForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const newUsername = (
          document.getElementById('new-username') as HTMLInputElement
        ).value;
        const { success, message } =
          await authHandler.updateUsername(newUsername);
        showCustomMessageModal('Status', message);
        if (success && usernameElement) {
          usernameElement.innerText = newUsername;
          const newUsernameInput = document.getElementById(
            'new-username'
          ) as HTMLInputElement;
          newUsernameInput.value = '';
        }
      });
    }

    /**
     * Event-Listener für die Änderung der E-Mail-Adresse.
     */
    const emailForm = document.getElementById('email-form');
    if (emailForm) {
      emailForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const newEmail = (
          document.getElementById('new-email') as HTMLInputElement
        ).value;
        const { success, message } = await authHandler.updateEmail(newEmail);
        showCustomMessageModal('Status', message);
        if (success && emailElement) {
          emailElement.innerText = newEmail;
          const newEmailInput = document.getElementById(
            'new-email'
          ) as HTMLInputElement;
          newEmailInput.value = '';
        }
      });
    }

    /**
     * Event-Listener für die Änderung des Passworts.
     */
    const passwordForm = document.getElementById('password-form');
    if (passwordForm) {
      passwordForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const oldPassword = (
          document.getElementById('old-password') as HTMLInputElement
        ).value;
        const newPassword = (
          document.getElementById('new-password') as HTMLInputElement
        ).value;
        const confirmNewPassword = (
          document.getElementById('confirm-new-password') as HTMLInputElement
        ).value;
        if (newPassword !== confirmNewPassword) {
          showCustomMessageModal(
            'Fehler',
            'Die neuen Passwörter stimmen nicht überein!'
          );
          return;
        }
        const { success, message } = await authHandler.updatePassword(
          oldPassword,
          newPassword
        );
        showCustomMessageModal('Status', message);
        if (success) {
          const oldPasswordInput = document.getElementById(
            'old-password'
          ) as HTMLInputElement;
          const newPasswordInput = document.getElementById(
            'new-password'
          ) as HTMLInputElement;
          const confirmNewPasswordInput = document.getElementById(
            'confirm-new-password'
          ) as HTMLInputElement;
          oldPasswordInput.value = '';
          newPasswordInput.value = '';
          confirmNewPasswordInput.value = '';
        }
      });
    }

    const parentElement = document.getElementById('preview-drawing-area');
    if (!parentElement) {
      return;
    }

    /**
     * Erstellt die Vorschau-Zeichenflächen-Elemente auf der Home-Seite.
     */
    const drawingAreaPreviewElementsStore =
      DrawingAreaPreviewElementsStore.getInstance();
    drawingAreaPreviewElementsStore
      .getDrawingAreaPreviewElements()
      .forEach((dap) => {
        dap.initialize(
          router,
          authHandler,
          parentElement,
          drawingAreaPreviewElementsStore
        );
      });

    /**
     * Event-Listener für das Hinzufügen einer neuen Zeichenfläche.
     */
    const addDrawingAreaButton = document.getElementById(
      'add-drawing-area-button'
    );
    if (addDrawingAreaButton) {
      addDrawingAreaButton.addEventListener('click', async () => {
        try {
          const drawingAreaPreview =
            await drawingAreaPreviewElementsStore.addDrawingAreaPreviewElements();
          drawingAreaPreview.initialize(
            router,
            authHandler,
            parentElement,
            drawingAreaPreviewElementsStore
          );
        } catch (e) {
          showCustomMessageModal('Fehler', `${e}`);
        }
      });
    }

    /**
     * Event-Listener für das Aktualisieren der Vorschau-Zeichenflächen-Elemente.
     * Nötig, da man so jederzeit die Vorschau-Zeichenflächen-Elemente aktualisieren kann.
     * Es kann nämlich jederzeit vorkommen, dass man zu einer neuen Zeichenfläche hinzugefügt oder von einer entfernt wird.
     */
    const refreshDrawingAreaButton = document.getElementById(
      'refresh-drawing-area-button'
    );
    if (refreshDrawingAreaButton) {
      refreshDrawingAreaButton.addEventListener('click', async () => {
        try {
          const { success, message } = await authHandler.refreshDrawingAreas();
          if (success) {
            parentElement.innerHTML = '';
            drawingAreaPreviewElementsStore
              .getDrawingAreaPreviewElements()
              .forEach((dap) => {
                dap.initialize(
                  router,
                  authHandler,
                  parentElement,
                  drawingAreaPreviewElementsStore
                );
              });
          }
          showCustomMessageModal('Status', message);
        } catch (e) {
          showCustomMessageModal('Fehler', `${e}`);
        }
      });
    }
  }
}
