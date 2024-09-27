"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const drawingAreaRoutes_1 = __importDefault(require("./drawingAreaRoutes"));
const express_ws_1 = __importDefault(require("express-ws"));
const createWebSocketRoutes_1 = require("./createWebSocketRoutes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_ws_1.default)((0, express_1.default)()).app;
const PORT = 3000;
/**
 * Middleware, die Cookies aus den Anfragen liest und verfügbar macht.
 */
app.use((0, cookie_parser_1.default)());
/**
 * Middleware, die den Request-Body als JSON interpretiert.
 */
app.use(express_1.default.json());
/**
 * Bereitstellung des Frontend-Codes beim Aufruf der Server-URL.
 */
app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/dist')));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../frontend/dist/index.html'));
});
/**
 * Nutzung der Authentifizierung-Routen.
 */
app.use('/api/auth', authRoutes_1.default);
/**
 * Nutzung der Zeichenflächen-Routen.
 */
app.use('/api/drawingArea', drawingAreaRoutes_1.default);
/**
 * Erstellung der Websocket-Routen für die verschiedenen Zeichenflächen.
 */
(0, createWebSocketRoutes_1.createWebSocketRoutes)(app);
/**
 * Starten des Servers.
 */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
