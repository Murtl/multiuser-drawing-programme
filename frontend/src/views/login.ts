import { Router } from '../router/router';
import { AuthHandler } from '../utils/classes/AuthHandler';
import { showCustomMessageModal } from '../utils/functions/showCustomMessageModal';

/**
 * Klasse für die Login-Seite.
 */
export class LoginPage {
  /**
   * Rendert die Login-Seite.
   */
  static async render(): Promise<string> {
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
                    <h2>Login</h2>
                    <form id="login-form" class="sub-container-main-form">
                        <label for="username">Benutzername:</label>
                        <input type="text" id="username" name="username" required>
                        <label for="email">E-Mail:</label>
                        <input type="text" id="email" name="email" required>
                        <label for="password">Passwort:</label>
                        <input type="password" id="password" name="password" required>
                        <button type="submit" class="custom-button">Login</button>
                    </form>
                </section>
                
                <section class="container-footer">
                    <p>Noch keinen Account? 
                        <span id="register-button" class="container-footer-text-button">Hier Registrieren</span>
                    </p>
                </section>
            </main>
        `;
  }

  /**
   * Initialisiert die Login-Seite.
   * @param router - Router-Instanz
   * @param authHandler - AuthHandler-Instanz
   */
  static initialize(router: Router, authHandler: AuthHandler) {
    /**
     * Event-Listener für das Login-Formular
     */
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = (
          document.getElementById('username') as HTMLInputElement
        ).value;
        const email = (document.getElementById('email') as HTMLInputElement)
          .value;
        const password = (
          document.getElementById('password') as HTMLInputElement
        ).value;

        const { success, message } = await authHandler.login(
          username,
          email,
          password
        );

        showCustomMessageModal('Status', message);
        if (success) {
          await router.navigateTo('#/');
        }
      });
    }

    /**
     * Event-Listener für den Registrieren-Button, der den Benutzer zur Registrierungsseite weiterleitet.
     */
    const registerButton = document.getElementById('register-button');
    if (registerButton) {
      registerButton.addEventListener('click', async () => {
        await router.navigateTo('#/register');
      });
    }
  }
}
