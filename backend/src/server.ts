import express, { Request, Response } from 'express';
import path from 'path';
import authRoutes from './authRoutes';
import drawingAreaRoutes from './drawingAreaRoutes';
import expressWs from 'express-ws';
import { createWebSocketRoutes } from './createWebSocketRoutes';
import { userTokenPayloadType } from './helperUtils';
import cookieParser from 'cookie-parser';

const app = expressWs(express()).app;
const PORT = 3000;

/**
 * Erweiterung des Express-Request-Objekts um ein user-Attribut, das den Typ userTokenPayloadType hat.
 */
declare global {
  namespace Express {
    interface Request {
      user: userTokenPayloadType;
    }
  }
}

/**
 * Middleware, die Cookies aus den Anfragen liest und verfügbar macht.
 */
app.use(cookieParser());

/**
 * Middleware, die den Request-Body als JSON interpretiert.
 */
app.use(express.json());

/**
 * Bereitstellung des Frontend-Codes beim Aufruf der Server-URL.
 */
app.use(express.static(path.join(__dirname, '../../frontend/dist')));
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

/**
 * Nutzung der Authentifizierung-Routen.
 */
app.use('/api/auth', authRoutes);

/**
 * Nutzung der Zeichenflächen-Routen.
 */
app.use('/api/drawingArea', drawingAreaRoutes);

/**
 * Erstellung der Websocket-Routen für die verschiedenen Zeichenflächen.
 */
createWebSocketRoutes(app);

/**
 * Starten des Servers.
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
