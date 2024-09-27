import { Router } from './router/router';
import { AuthHandler } from './utils/classes/AuthHandler';

/**
 * Initialisiert die App und den Router, nachdem der DOM geladen wurde.
 */
document.addEventListener('DOMContentLoaded', async (e) => {
  e.stopImmediatePropagation();
  const app = document.getElementById('app');
  if (app) {
    const authHandler = new AuthHandler();
    await authHandler.init();
    const router = new Router(app, authHandler);
    await router.init();
  }
});
