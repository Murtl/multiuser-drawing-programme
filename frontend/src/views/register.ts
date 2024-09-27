import { Router } from '../router/router';
import { AuthHandler } from '../utils/classes/AuthHandler';
import { showCustomMessageModal } from '../utils/functions/showCustomMessageModal';

/**
 * Klasse für die Registrierungs-Seite.
 */
export class RegisterPage {
  /**
   * Rendert die Registrierungs-Seite.
   */
  static render(): string {
    return `
            <main class="container">
                <section class="container-header">
                    <img src="../assets/tha_logo.svg" alt="Logo" />
                     <div class="sub-container-header-text">
                        <h2>Willkommen bei meinem Multiuser-Zeichenprogramm!</h2>
                        <h4>von Michael Mertl im SoSe2024</h4>
                     </div>
                </section>
                
                <section class="container-main">
                    <h2>Registrieren</h2>
                    <form id="register-form" class="sub-container-main-form">
                         <label for="username">Benutzername:</label>
                        <input type="text" id="username" name="username" required>
                        <label for="email">E-Mail:</label>
                        <input type="text" id="email" name="email" required>
                        <label for="password">Passwort:</label>
                        <input type="password" id="password" name="password" required>
                        <label for="password-confirm">Passwort bestätigen:</label>
                        <input type="password" id="password-confirm" name="password-confirm" required>
                        <button type="submit" class="custom-button">Registrieren</button>
                    </form>
                </section>
                
                <section class="container-footer">
                    <p>Bereits einen Account?
                        <span id="login-button" class="container-footer-text-button">Hier Einloggen</span>
                    </p>
                </section>
            </main>
        `;
  }

  /**
   * Initialisiert die Registrierungs-Seite.
   * @param router - Router-Instanz
   * @param authHandler - AuthHandler-Instanz
   */
  static initialize(router: Router, authHandler: AuthHandler) {
    /**
     * Event-Listener für das Registrierungs-Formular.
     */
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
      registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = (
          document.getElementById('username') as HTMLInputElement
        ).value;
        const email = (document.getElementById('email') as HTMLInputElement)
          .value;
        const password = (
          document.getElementById('password') as HTMLInputElement
        ).value;
        const passwordConfirm = (
          document.getElementById('password-confirm') as HTMLInputElement
        ).value;

        if (password !== passwordConfirm) {
          showCustomMessageModal('Fehler', 'Passwörter stimmen nicht überein.');
          return;
        }

        const { success, message } = await authHandler.register(
          username,
          email,
          password
        );

        showCustomMessageModal('Status', message);
        if (success) {
          await router.navigateTo('#/login');
        }
      });
    }

    /**
     * Event-Listener für den "Hier Einloggen"-Button, der den Benutzer zur Login-Seite weiterleitet.
     */
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
      loginButton.addEventListener('click', async () => {
        await router.navigateTo('#/login');
      });
    }
  }
}
