import { HomePage } from '../views/home';
import { LoginPage } from '../views/login';
import { RegisterPage } from '../views/register';
import { NotFoundPage } from '../views/notFound';
import { AuthHandler } from '../utils/classes/AuthHandler';
import { DrawingArea } from '../views/drawingArea';
import { DrawingAreaPreviewElementsStore } from '../store/DrawingAreaPreviewElementsStore';

/**
 * Router Klasse, die die Navigation zwischen den verschiedenen Seiten der Anwendung steuert.
 */
export class Router {
  private readonly appElement: HTMLElement;
  private readonly authHandler: AuthHandler;
  private readonly drawingAreaPreviewElementsStore =
    DrawingAreaPreviewElementsStore.getInstance();
  private ws?: WebSocket;
  /**
   * Flag, das angibt, ob die Navigation durch den Router oder durch den Benutzer erfolgt.
   */
  private isProgrammaticNavigation: boolean = false;

  constructor(appElement: HTMLElement, authHandler: AuthHandler) {
    this.appElement = appElement;
    this.authHandler = authHandler;

    window.addEventListener('hashchange', async (e: HashChangeEvent) => {
      e.stopImmediatePropagation();
      if (!this.isProgrammaticNavigation) {
        await this.renderPage();
      }
    });
  }

  registerWebsocket(ws: WebSocket) {
    this.ws = ws;
  }

  closeWebsocket() {
    this.ws?.close();
  }

  async init() {
    await this.renderPage();
  }

  async navigateTo(hash: string) {
    this.isProgrammaticNavigation = true;
    window.location.hash = hash;
    await this.renderPage();
    this.isProgrammaticNavigation = false;
  }

  private async renderPage() {
    this.closeWebsocket();
    const hash = window.location.hash || '#/login';

    /**
     * Wenn der Hash mit '#/drawing-area/' beginnt, wird die DrawingArea-Seite dynamisch gerendert mit der angegebenen IP.
     */
    if (hash.startsWith('#/drawing-area/')) {
      if (!this.authHandler.isLoggedIn()) {
        this.appElement.innerHTML = await LoginPage.render();
        LoginPage.initialize(this, this.authHandler);
      } else {
        const id = hash.split('/')[2];
        let drawingArea: DrawingArea | undefined;
        this.drawingAreaPreviewElementsStore
          .getDrawingAreaPreviewElements()
          .forEach((element) => {
            if (element.getDrawingAreaId() === id) {
              drawingArea = new DrawingArea(
                id,
                element.getPermission(),
                this.authHandler
              );
            }
          });
        if (drawingArea) {
          this.appElement.innerHTML = await drawingArea.render();
          await drawingArea.initialize(this);
        } else {
          this.appElement.innerHTML = NotFoundPage.render();
          NotFoundPage.initialize(this, this.authHandler);
        }
      }
    } else {
      switch (hash) {
        case '#/login':
          if (this.authHandler.isLoggedIn()) {
            this.appElement.innerHTML = await HomePage.render();
            HomePage.initialize(this, this.authHandler);
          } else {
            this.appElement.innerHTML = await LoginPage.render();
            LoginPage.initialize(this, this.authHandler);
          }
          break;
        case '#/register':
          if (this.authHandler.isLoggedIn()) {
            this.appElement.innerHTML = await HomePage.render();
            HomePage.initialize(this, this.authHandler);
          } else {
            this.appElement.innerHTML = RegisterPage.render();
            RegisterPage.initialize(this, this.authHandler);
          }
          break;
        case '#/':
          if (!this.authHandler.isLoggedIn()) {
            this.appElement.innerHTML = await LoginPage.render();
            LoginPage.initialize(this, this.authHandler);
          } else {
            this.appElement.innerHTML = await HomePage.render();
            HomePage.initialize(this, this.authHandler);
          }
          break;
        default:
          this.appElement.innerHTML = NotFoundPage.render();
          NotFoundPage.initialize(this, this.authHandler);
          break;
      }
    }
  }
}
