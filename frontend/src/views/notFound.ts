import { Router } from '../router/router';
import { AuthHandler } from '../utils/classes/AuthHandler';

/**
 * Klasse für die 404-Seite.
 */
export class NotFoundPage {
  /**
   * Rendert die 404-Seite.
   */
  static render() {
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
                    <h2>Error 404</h2>
                    <p>Die Seite, die Sie suchen, existiert nicht.</p>
                </section>
                
                <section class="container-footer">
                    <p>Hier geht es zurück zur
                        <span id="back-to-home" class="container-footer-text-button">Startseite</span>
                    </p>
                </section>
            </main>
        `;
  }

  /**
   * Initialisiert die 404-Seite.
   * @param router - Router-Instanz
   * @param authHandler - AuthHandler-Instanz
   */
  static initialize(router: Router, authHandler: AuthHandler) {
    /**
     * Event-Listener für den "Zurück zur Startseite"-Button.
     */
    const backToHome = document.getElementById('back-to-home');
    if (backToHome) {
      backToHome.addEventListener('click', async () => {
        if (authHandler.isLoggedIn()) {
          await router.navigateTo('#/');
        } else {
          await router.navigateTo('#/login');
        }
      });
    }
  }
}
