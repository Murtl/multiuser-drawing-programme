"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebSocketRoutes = void 0;
const helperUtils_1 = require("./helperUtils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Erstellt die WebSocket-Routen für die verschiedenen Zeichenflächen.
 * @param app die Express-App
 */
function createWebSocketRoutes(app) {
    const drawingAreaRooms = {};
    const drawingAreaRoomUsers = {};
    const forbiddenSelectColors = [
        '#000000',
        '#ffffff',
        '#d3d3d3',
        '#ff0000',
        '#00ff00',
        '#ffff00',
        '#000fff',
        'transparent',
    ];
    const usedSelectColors = [];
    /**
     * Berechnet eine zufällige Farbe für die Selektion unter Berücksichtigung der verbotenen und bereits verwendeten Farben.
     */
    function calcSelectColor() {
        let color = '';
        while (true) {
            color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            if (!forbiddenSelectColors.includes(color) &&
                !usedSelectColors.includes(color)) {
                usedSelectColors.push(color);
                return color;
            }
        }
    }
    /**
     * WebSocket-Verbindung für eine Zeichenfläche für eine gewisse id.
     */
    app.ws('/ws/drawingArea/:id', (ws, req) => {
        const cookies = req.cookies;
        /**
         * Überprüfung, ob Cookies vorhanden sind bei der Verbindung.
         */
        if (!cookies) {
            const customError = {
                message: `Cookies fehlen!`,
                type: 'criticalError',
            };
            ws.send(JSON.stringify(customError));
            ws.close();
            return;
        }
        const token = cookies.token;
        /**
         * Überprüfung, ob ein Token vorhanden ist bei der Verbindung.
         */
        if (!token) {
            const customError = {
                message: `Token fehlt!`,
                type: 'criticalError',
            };
            ws.send(JSON.stringify(customError));
            ws.close();
            return;
        }
        /**
         * Überprüfung, ob das Token gültig ist.
         */
        jsonwebtoken_1.default.verify(token, helperUtils_1.secretKey, (err, user) => {
            if (err) {
                const customError = {
                    message: `Token fehlerhaft!`,
                    type: 'criticalError',
                };
                ws.send(JSON.stringify(customError));
                ws.close();
                return;
            }
            req.user = user;
        });
        const drawingAreaId = req.params.id;
        /**
         * Überprüfung, ob bereits eine WebSocket-Verbindung für die Zeichenfläche besteht.
         */
        if (!drawingAreaRooms[drawingAreaId]) {
            drawingAreaRooms[drawingAreaId] = [];
        }
        /**
         * Hinzufügen des WebSocket-Clients zur Zeichenfläche und Überprüfung, ob der Client bereits verbunden ist.
         */
        if (drawingAreaRooms[drawingAreaId].find((client) => client.userId === req.user.id)) {
            const customError = {
                message: `Client ist bereits verbunden!`,
                type: 'criticalError',
            };
            ws.send(JSON.stringify(customError));
            ws.close();
            return;
        }
        drawingAreaRooms[drawingAreaId].push({ ws, userId: req.user.id });
        console.log(`Client hat sich zu DrawingArea ${drawingAreaId} verbunden.`);
        /**
         * Berechnung einer zufälligen Farbe für die Selektion und Versenden an den Client.
         */
        const customSelectColor = {
            type: 'selectColor',
            selectColor: calcSelectColor(),
        };
        ws.send(JSON.stringify(customSelectColor));
        /**
         * Hinzufügen des Benutzers zur Liste der verbundenen Benutzer.
         */
        const connectedUser = drawingAreaRoomUsers[drawingAreaId] || [];
        const newUser = {
            name: `${req.user.username}#${req.user.id.substring(0, 5)}`,
            color: customSelectColor.selectColor,
        };
        connectedUser.push(newUser);
        drawingAreaRoomUsers[drawingAreaId] = connectedUser;
        /**
         * Versenden der verbundenen Benutzer an alle Clients zur Anzeige.
         */
        const customConnectedUsers = {
            type: 'connectedUsers',
            connectedUsers: drawingAreaRoomUsers[drawingAreaId],
        };
        drawingAreaRooms[drawingAreaId].forEach((client) => {
            if (client.ws.readyState === ws.OPEN) {
                client.ws.send(JSON.stringify(customConnectedUsers));
            }
        });
        /**
         * Empfangen von Nachrichten vom Client.
         */
        ws.on('message', (message) => {
            try {
                /**
                 * Parsen der Nachricht in einen customWebSocketEventType
                 */
                const customEvent = JSON.parse(message.toString());
                /**
                 * Überprüfung, ob die Zeichenfläche existiert.
                 * Kann sein, dass diese zur Laufzeit von dem Owner gelöscht wird.
                 */
                const drawingAreas = (0, helperUtils_1.readDrawingAreasFromFile)();
                const drawingAreaIndex = drawingAreas.findIndex((drawingArea) => drawingArea.id === drawingAreaId);
                if (drawingAreaIndex === -1) {
                    const customError = {
                        message: `Zeichenfläche mit der ID ${drawingAreaId} nicht gefunden!`,
                        type: 'criticalError',
                    };
                    ws.send(JSON.stringify(customError));
                    ws.close();
                    return;
                }
                /**
                 * Überprüfung, ob der Benutzer existiert.
                 */
                const userId = req.user.id;
                const users = (0, helperUtils_1.readUsersFromFile)();
                const userIndex = users.findIndex((user) => user.id === userId);
                if (userIndex === -1) {
                    const customError = {
                        message: `User mit der ID ${userId} nicht gefunden!`,
                        type: 'criticalError',
                    };
                    ws.send(JSON.stringify(customError));
                    ws.close();
                    return;
                }
                /**
                 * Überprüfung, ob der Benutzer autorisiert ist, die Zeichenfläche zu sehen.
                 * Kann sein, dass der Owner den Benutzer zur Laufzeit entfernt.
                 */
                const userAuthorized = drawingAreas[drawingAreaIndex].authorizedUsers.find((authorizedUser) => authorizedUser.userId === req.user.id);
                if (!userAuthorized) {
                    const customError = {
                        message: `User ist nicht autorisiert, diese Zeichenfläche zu sehen!`,
                        type: 'criticalError',
                    };
                    ws.send(JSON.stringify(customError));
                    ws.close();
                    return;
                }
                /**
                 * Überprüfung, ob es sich um ein "moderate"-Event handelt und Behandlung.
                 */
                if (customEvent.type === 'moderate') {
                    handleModerate(drawingAreas, drawingAreaIndex, customEvent, ws, drawingAreaRooms[drawingAreaId], userId);
                    return;
                }
                /**
                 * Überprüfung, ob der Benutzer die Berechtigung hat, ein Event hinzuzufügen.
                 */
                if (userAuthorized.permission === helperUtils_1.DrawingAreaPermissions.READER) {
                    throw new Error('User hat nicht die Berechtigung, ein Event hinzuzufügen!');
                }
                /**
                 * Überprüfung, ob der Benutzer die Berechtigung hat, ein Event hinzuzufügen, wenn die Zeichenfläche moderiert ist.
                 */
                if (userAuthorized.permission === helperUtils_1.DrawingAreaPermissions.WRITER &&
                    drawingAreas[drawingAreaIndex].isModerated) {
                    throw new Error('User hat nicht die Berechtigung, ein Event hinzuzufügen, da die Zeichenfläche moderiert ist!');
                }
                /**
                 * Überprüfung, ob der Event-Typ erlaubt ist.
                 */
                if (customEvent.type !== 'IShapeAdded' &&
                    customEvent.type !== 'IShapeRemoved' &&
                    customEvent.type !== 'IShapeSelected' &&
                    customEvent.type !== 'IShapeUnselected') {
                    throw new Error('Event-Typ nicht erlaubt!');
                }
                /**
                 * Behandlung des "IShapeRemoved"-Events.
                 */
                if (customEvent.type === 'IShapeRemoved') {
                    handleIShapeRemoved(drawingAreas, drawingAreaIndex, customEvent, ws, drawingAreaRooms[drawingAreaId]);
                    return;
                }
                /**
                 * Behandlung des "IShapeSelected"-Events.
                 */
                if (customEvent.type === 'IShapeSelected') {
                    handleIShapeSelected(drawingAreas, drawingAreaIndex, customEvent, ws, drawingAreaRooms[drawingAreaId]);
                    return;
                }
                /**
                 * Behandlung des "IShapeUnselected"-Events.
                 */
                if (customEvent.type === 'IShapeUnselected') {
                    handleIShapeUnselected(drawingAreas, drawingAreaIndex, customEvent, ws, drawingAreaRooms[drawingAreaId]);
                    return;
                }
                /**
                 * Hinzufügen des Events zur Zeichenfläche.
                 */
                drawingAreas[drawingAreaIndex].eventsForDrawingArea.push(customEvent);
                (0, helperUtils_1.writeDrawingAreasToFile)(drawingAreas);
                /**
                 * Versenden eines Erfolgs-Events an den aufrufenden Client.
                 */
                const customSuccess = {
                    message: 'Event erfolgreich hinzugefügt.',
                    type: 'eventSuccess',
                    event: [customEvent],
                };
                ws.send(JSON.stringify(customSuccess));
                /**
                 * Versenden des Update-Events an alle anderen Clients.
                 */
                drawingAreaRooms[drawingAreaId].forEach((client) => {
                    if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                        const customUpdate = {
                            type: 'update',
                            event: [customEvent],
                        };
                        client.ws.send(JSON.stringify(customUpdate));
                    }
                });
            }
            catch (e) {
                /**
                 * Versenden eines Fehler-Events an den aufrufenden Client.
                 */
                const customError = {
                    message: `${e}`,
                    type: 'error',
                };
                ws.send(JSON.stringify(customError));
            }
        });
        ws.on('close', () => {
            console.log(`Client hat die Verbindung zu DrawingArea ${drawingAreaId} geschlossen.`);
            /**
             * Entfernen des WebSocket-Clients aus der Zeichenfläche.
             */
            drawingAreaRooms[drawingAreaId] = drawingAreaRooms[drawingAreaId].filter((client) => client.ws !== ws);
            const drawingAreas = (0, helperUtils_1.readDrawingAreasFromFile)();
            const drawingAreaIndex = drawingAreas.findIndex((drawingArea) => drawingArea.id === drawingAreaId);
            const userId = req.user.id;
            handleClose(drawingAreas, drawingAreaIndex, ws, drawingAreaId, userId, drawingAreaRooms[drawingAreaId], drawingAreaRoomUsers, req);
        });
    });
}
exports.createWebSocketRoutes = createWebSocketRoutes;
/**
 * Behandlung des "moderate"-Events.
 * @param drawingAreas - die Zeichenflächen
 * @param drawingAreaIndex - der Index der Zeichenfläche
 * @param customEvent - das customEvent
 * @param ws - der WebSocket-Client
 * @param clients - die WebSocket-Clients
 * @param userId - die User-ID
 */
function handleModerate(drawingAreas, drawingAreaIndex, customEvent, ws, clients, userId) {
    /**
     * Überprüfung, ob der Benutzer die Berechtigung hat, den Zustand der Zeichenfläche zu ändern.
     */
    const authorizedSetModerateUserInsideDrawingAreaIndex = drawingAreas[drawingAreaIndex].authorizedUsers.findIndex((authorizedUser) => authorizedUser.userId === userId &&
        (authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.OWNER ||
            authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.COOWNER ||
            authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.MODERATOR));
    if (authorizedSetModerateUserInsideDrawingAreaIndex === -1) {
        throw new Error('User ist nicht autorisiert, den Zustand der Zeichenfläche zu ändern!');
    }
    /**
     * Setzen des moderierten Zustands der Zeichenfläche.
     */
    drawingAreas[drawingAreaIndex].isModerated = customEvent.moderated;
    (0, helperUtils_1.writeDrawingAreasToFile)(drawingAreas);
    /**
     * Versenden des "moderate"-Events an alle Clients.
     */
    const customModerate = {
        type: 'moderate',
        moderated: customEvent.moderated,
    };
    clients.forEach((client) => {
        if (client.ws.readyState === ws.OPEN) {
            client.ws.send(JSON.stringify(customModerate));
        }
    });
    /**
     * Entfernen aller selektierten Shapes, wenn die Zeichenfläche moderiert wird und der User nicht mehr die Berechtigung hat.
     */
    if (customEvent.moderated) {
        const unselectShapeEvents = [];
        const newEventsForDrawingArea = [];
        drawingAreas[drawingAreaIndex].eventsForDrawingArea.map((event) => {
            if (event.type === 'IShapeSelected' &&
                drawingAreas[drawingAreaIndex].authorizedUsers.find((authorizedUser) => authorizedUser.userId === event.userId &&
                    (authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.WRITER ||
                        authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.READER))) {
                unselectShapeEvents.push({
                    type: 'IShapeUnselected',
                    id: event.iShape.id,
                });
            }
            else {
                newEventsForDrawingArea.push(event);
            }
        });
        drawingAreas[drawingAreaIndex].eventsForDrawingArea =
            newEventsForDrawingArea;
        (0, helperUtils_1.writeDrawingAreasToFile)(drawingAreas);
        /**
         * Versenden der "IShapeUnselected"-Events an alle Clients.
         */
        const customUpdate = {
            type: 'update',
            event: unselectShapeEvents,
        };
        clients.forEach((client) => {
            if (client.ws.readyState === ws.OPEN) {
                client.ws.send(JSON.stringify(customUpdate));
            }
        });
    }
    return;
}
/**
 * Behandlung des "IShapeRemoved"-Events.
 * @param drawingAreas - die Zeichenflächen
 * @param drawingAreaIndex - der Index der Zeichenfläche
 * @param customEvent - das customEvent
 * @param ws - der WebSocket-Client
 * @param clients - die WebSocket-Clients
 */
function handleIShapeRemoved(drawingAreas, drawingAreaIndex, customEvent, ws, clients) {
    /**
     * Überprüfung, ob das Event 'IShapeAdded' in der Zeichenfläche existiert.
     */
    const shapeIndex = drawingAreas[drawingAreaIndex].eventsForDrawingArea.findIndex((event) => event.type === 'IShapeAdded' && event.iShape.id === customEvent.id);
    if (shapeIndex !== -1) {
        drawingAreas[drawingAreaIndex].eventsForDrawingArea.splice(shapeIndex, 1);
        (0, helperUtils_1.writeDrawingAreasToFile)(drawingAreas);
        /**
         * Versenden eines Erfolgs-Events an den aufrufenden Client.
         */
        const customSuccess = {
            message: 'Event erfolgreich hinzugefügt.',
            type: 'eventSuccess',
            event: [customEvent],
        };
        ws.send(JSON.stringify(customSuccess));
        /**
         * Versenden des Update-Events an alle anderen Clients.
         */
        clients.forEach((client) => {
            if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                const customUpdate = {
                    type: 'update',
                    event: [customEvent],
                };
                client.ws.send(JSON.stringify(customUpdate));
            }
        });
        return;
    }
    throw new Error('Zugehöriger event "IShapeAdded" nicht gefunden!');
}
/**
 * Behandlung des "IShapeSelected"-Events.
 * @param drawingAreas - die Zeichenflächen
 * @param drawingAreaIndex - der Index der Zeichenfläche
 * @param customEvent - das customEvent
 * @param ws - der WebSocket-Client
 * @param clients - die WebSocket-Clients
 */
function handleIShapeSelected(drawingAreas, drawingAreaIndex, customEvent, ws, clients) {
    const shapeIndex = drawingAreas[drawingAreaIndex].eventsForDrawingArea.findIndex((event) => event.type === 'IShapeSelected' &&
        event.iShape.id === customEvent.iShape.id &&
        event.userId !== customEvent.userId);
    /**
     * Überprüfung, ob die Shape bereits selektiert wurde.
     */
    if (shapeIndex !== -1) {
        const customError = {
            message: 'Ein anderer User hat diese Shape bereits selektiert!',
            type: 'error',
        };
        ws.send(JSON.stringify(customError));
        return;
    }
    drawingAreas[drawingAreaIndex].eventsForDrawingArea.push(customEvent);
    (0, helperUtils_1.writeDrawingAreasToFile)(drawingAreas);
    /**
     * Versenden eines Erfolgs-Events an den aufrufenden Client.
     */
    const customSuccess = {
        message: 'Event erfolgreich hinzugefügt.',
        type: 'eventSuccess',
        event: [customEvent],
    };
    ws.send(JSON.stringify(customSuccess));
    /**
     * Versenden des Update-Events an alle anderen Clients.
     */
    clients.forEach((client) => {
        if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
            const customUpdate = {
                type: 'update',
                event: [customEvent],
            };
            client.ws.send(JSON.stringify(customUpdate));
        }
    });
    return;
}
/**
 * Behandlung des "IShapeUnselected"-Events.
 * @param drawingAreas - die Zeichenflächen
 * @param drawingAreaIndex - der Index der Zeichenfläche
 * @param customEvent - das customEvent
 * @param ws - der WebSocket-Client
 * @param clients - die WebSocket-Clients
 */
function handleIShapeUnselected(drawingAreas, drawingAreaIndex, customEvent, ws, clients) {
    const shapeIndex = drawingAreas[drawingAreaIndex].eventsForDrawingArea.findIndex((event) => event.type === 'IShapeSelected' && event.iShape.id === customEvent.id);
    if (shapeIndex !== -1) {
        /**
         * Überprüfung, ob der User die Berechtigung hat, diese Shape zu deselektieren.
         */
        if (drawingAreas[drawingAreaIndex].eventsForDrawingArea[shapeIndex].userId !== customEvent.userId) {
            throw new Error('User hat nicht die Berechtigung, diese Shape zu deselektieren!');
        }
        drawingAreas[drawingAreaIndex].eventsForDrawingArea.splice(shapeIndex, 1);
        (0, helperUtils_1.writeDrawingAreasToFile)(drawingAreas);
        /**
         * Versenden eines Erfolgs-Events an den aufrufenden Client.
         */
        const customSuccess = {
            message: 'Event erfolgreich hinzugefügt.',
            type: 'eventSuccess',
            event: [customEvent],
        };
        ws.send(JSON.stringify(customSuccess));
        /**
         * Versenden des Update-Events an alle anderen Clients.
         */
        clients.forEach((client) => {
            if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                const customUpdate = {
                    type: 'update',
                    event: [customEvent],
                };
                client.ws.send(JSON.stringify(customUpdate));
            }
        });
        return;
    }
    throw new Error('Zugehöriger event "IShapeSelected" nicht gefunden!');
}
/**
 * Behandlung des Schließens der WebSocket-Verbindung.
 * @param drawingAreas - die Zeichenflächen
 * @param drawingAreaIndex - der Index der Zeichenfläche
 * @param ws - der WebSocket-Client
 * @param drawingAreaId - die ID der Zeichenfläche
 * @param userId - die User-ID
 * @param clients - die WebSocket-Clients
 * @param drawingAreaRoomUsers - die verbundenen Benutzer der Zeichenfläche
 * @param req - der Request
 */
function handleClose(drawingAreas, drawingAreaIndex, ws, drawingAreaId, userId, clients, drawingAreaRoomUsers, req) {
    /**
     * Erstellen der "IShapeUnselected"-Events für alle selektierten Shapes des Benutzers, der die Verbindung getrennt hat.
     */
    const unselectShapeEvents = [];
    const newEventsForDrawingArea = [];
    if (drawingAreas[drawingAreaIndex] === undefined) {
        return;
    }
    drawingAreas[drawingAreaIndex].eventsForDrawingArea.map((event) => {
        if (event.type === 'IShapeSelected' && event.userId === userId) {
            unselectShapeEvents.push({
                type: 'IShapeUnselected',
                id: event.iShape.id,
            });
        }
        else {
            newEventsForDrawingArea.push(event);
        }
    });
    drawingAreas[drawingAreaIndex].eventsForDrawingArea = newEventsForDrawingArea;
    (0, helperUtils_1.writeDrawingAreasToFile)(drawingAreas);
    /**
     * Versenden der "IShapeUnselected"-Events an alle Clients.
     */
    clients.forEach((client) => {
        if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
            const customUpdate = {
                type: 'update',
                event: unselectShapeEvents,
            };
            client.ws.send(JSON.stringify(customUpdate));
        }
    });
    /**
     * Entfernen des Benutzers aus der Liste der verbundenen Benutzer auf der Zeichenfläche.
     */
    drawingAreaRoomUsers[drawingAreaId] = drawingAreaRoomUsers[drawingAreaId].filter((user) => user.name !== `${req.user.username}#${req.user.id.substring(0, 5)}`);
    const customConnectedUsers = {
        type: 'connectedUsers',
        connectedUsers: drawingAreaRoomUsers[drawingAreaId],
    };
    /**
     * Versenden der verbundenen Benutzer an alle Clients zur Aktualisierung der Anzeige.
     */
    clients.forEach((client) => {
        if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
            client.ws.send(JSON.stringify(customConnectedUsers));
        }
    });
}
