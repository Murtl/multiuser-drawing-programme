"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("./middleware");
const helperUtils_1 = require("./helperUtils");
const drawingAreaRouter = express_1.default.Router();
/**
 * Endpunkt zum Erstellen einer neuen Zeichenfläche.
 */
drawingAreaRouter.post('/createNewDrawingArea', middleware_1.authenticateJWT, (req, res) => {
    /**
     * Generierung einer neuen Zeichenflächen-ID.
     */
    const id = (0, uuid_1.v4)();
    const userId = req.user.id;
    const users = (0, helperUtils_1.readUsersFromFile)();
    /**
     * Überprüfung, ob der Benutzer existiert, der die Zeichenfläche erstellen möchte.
     */
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex !== -1) {
        users[userIndex].drawingAreas.push({
            id,
            permission: helperUtils_1.DrawingAreaPermissions.OWNER,
        });
    }
    else {
        return res.status(400).json({ message: 'User wurde nicht gefunden!' });
    }
    /**
     * Hinzufügen der Zeichenfläche zur Liste der Zeichenflächen des Benutzers.
     */
    (0, helperUtils_1.writeUsersToFile)(users);
    /**
     * Hinzufügen der neuen Zeichenfläche zur Liste der Zeichenflächen.
     */
    const drawingAreas = (0, helperUtils_1.readDrawingAreasFromFile)();
    drawingAreas.push({
        id,
        authorizedUsers: [
            {
                userId,
                permission: helperUtils_1.DrawingAreaPermissions.OWNER,
            },
        ],
        isModerated: false,
        eventsForDrawingArea: [],
    });
    (0, helperUtils_1.writeDrawingAreasToFile)(drawingAreas);
    /**
     * Erstellung eines neuen aktuellen JWT-Tokens für den Benutzer.
     */
    const token = jsonwebtoken_1.default.sign({
        id: userId,
        email: users[userIndex].email,
        username: users[userIndex].username,
        drawingAreas: users[userIndex].drawingAreas,
    }, helperUtils_1.secretKey, { expiresIn: '1h' });
    /**
     * Aktualisierung des JWT-Tokens im HTTP-Only-Cookie.
     */
    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({
        message: 'Zeichenfläche erfolgreich erstellt.',
        drawingAreaId: id,
    });
});
/**
 * Endpunkt zum Löschen einer Zeichenfläche.
 */
drawingAreaRouter.delete('/deleteDrawingArea', middleware_1.authenticateJWT, (req, res) => {
    const drawingAreaId = req.body.drawingAreaId;
    const userId = req.user.id;
    const users = (0, helperUtils_1.readUsersFromFile)();
    /**
     * Überprüfung, ob der Benutzer existiert, der die Zeichenfläche löschen möchte.
     */
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
        return res.status(400).json({ message: 'User wurde nicht gefunden!' });
    }
    const drawingAreas = (0, helperUtils_1.readDrawingAreasFromFile)();
    /**
     * Überprüfung, ob die Zeichenfläche existiert, die gelöscht werden soll.
     */
    const drawingAreaIndex = drawingAreas.findIndex((drawingArea) => drawingArea.id === drawingAreaId);
    if (drawingAreaIndex === -1) {
        return res
            .status(400)
            .json({ message: 'Zeichenfläche wurde nicht gefunden!' });
    }
    /**
     * Überprüfung, ob der Benutzer die Berechtigung hat, die Zeichenfläche zu löschen.
     */
    const authorizedUserInsideDrawingAreaIndex = drawingAreas[drawingAreaIndex].authorizedUsers.findIndex((authorizedUser) => authorizedUser.userId === userId &&
        authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.OWNER);
    if (authorizedUserInsideDrawingAreaIndex === -1) {
        return res.status(400).json({
            message: 'User ist nicht autorisiert, diese Zeichenfläche zu löschen!',
        });
    }
    /**
     * Löschen der Zeichenfläche aus der Liste der Zeichenflächen.
     */
    drawingAreas.splice(drawingAreaIndex, 1);
    (0, helperUtils_1.writeDrawingAreasToFile)(drawingAreas);
    /**
     * Löschen der Zeichenfläche aus der Liste der Zeichenflächen jedes Benutzers, der die Zeichenfläche in seiner Liste hat.
     */
    users.forEach((user) => {
        const drawingAreaIndex = user.drawingAreas.findIndex((drawingArea) => drawingArea.id === drawingAreaId);
        if (drawingAreaIndex !== -1) {
            user.drawingAreas.splice(drawingAreaIndex, 1);
        }
    });
    (0, helperUtils_1.writeUsersToFile)(users);
    /**
     * Erstellung eines neuen aktuellen JWT-Tokens für den Benutzer.
     */
    const token = jsonwebtoken_1.default.sign({
        id: userId,
        email: users[userIndex].email,
        username: users[userIndex].username,
        drawingAreas: users[userIndex].drawingAreas,
    }, helperUtils_1.secretKey, { expiresIn: '1h' });
    /**
     * Aktualisierung des JWT-Tokens im HTTP-Only-Cookie.
     */
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Zeichenfläche erfolgreich gelöscht.' });
});
/**
 * Endpunkt zur Abrufung eines aktualisierten JWT-Tokens mit den aktuellen Zeichenflächen eines Benutzers.
 */
drawingAreaRouter.get('/refreshDrawingAreas', middleware_1.authenticateJWT, (req, res) => {
    const userId = req.user.id;
    const email = req.user.email;
    const username = req.user.username;
    const users = (0, helperUtils_1.readUsersFromFile)();
    /**
     * Überprüfung, ob der Benutzer existiert.
     */
    const user = users.find((user) => user.id === userId);
    if (!user) {
        return res.status(400).json({ message: 'User wurde nicht gefunden!' });
    }
    /**
     * Erstellung eines neuen aktuellen JWT-Tokens für den Benutzer.
     */
    const token = jsonwebtoken_1.default.sign({
        id: userId,
        email: email,
        username: username,
        drawingAreas: user.drawingAreas,
    }, helperUtils_1.secretKey, { expiresIn: '1h' });
    /**
     * Aktualisierung des JWT-Tokens im HTTP-Only-Cookie.
     */
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({
        message: 'Zeichenflächen erfolgreich refreshed',
        drawingAreas: user.drawingAreas,
    });
});
/**
 * Endpunkt zum Hinzufügen eines Benutzers zu einer Zeichenfläche.
 */
drawingAreaRouter.post('/addUserToDrawingArea', middleware_1.authenticateJWT, (req, res) => {
    const drawingAreaId = req.body.drawingAreaId;
    const userIdToAdd = req.body.userIdToAdd;
    const permission = req.body.permission;
    const userId = req.user.id;
    const drawingAreas = (0, helperUtils_1.readDrawingAreasFromFile)();
    /**
     * Überprüfung, ob die Zeichenfläche existiert, zu der der Benutzer hinzugefügt werden soll.
     */
    const drawingAreaIndex = drawingAreas.findIndex((drawingArea) => drawingArea.id === drawingAreaId);
    if (drawingAreaIndex === -1) {
        return res
            .status(400)
            .json({ message: 'Zeichenfläche wurde nicht gefunden!' });
    }
    const users = (0, helperUtils_1.readUsersFromFile)();
    /**
     * Überprüfung, ob der Benutzer existiert, der hinzugefügt werden soll.
     */
    const userIndex = users.findIndex((user) => user.id === userIdToAdd);
    if (userIndex === -1) {
        return res.status(400).json({ message: 'User wurde nicht gefunden!' });
    }
    /**
     * Überprüfung, ob der Benutzer, der hinzugefügt werden soll, bereits auf der Zeichenfläche ist.
     */
    if (drawingAreas[drawingAreaIndex].authorizedUsers.find((authorizedUser) => authorizedUser.userId === userIdToAdd)) {
        return res.status(400).json({
            message: 'User ist bereits auf der Zeichenfläche!',
        });
    }
    /**
     * Überprüfung, ob der Benutzer, der den Aufruf tätig, die Berechtigung hat, den Benutzer hinzuzufügen.
     */
    if (!drawingAreas[drawingAreaIndex].authorizedUsers.find((authorizedUser) => authorizedUser.userId === userId &&
        (authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.OWNER ||
            authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.COOWNER ||
            authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.MODERATOR))) {
        return res.status(400).json({
            message: 'User hat nicht die Berechtigung, einen User hinzuzufügen!',
        });
    }
    /**
     * Überprüfung, dass nicht ein User als Owner hinzugefügt wird, da dies nur beim Erstellen der Zeichenfläche möglich ist.
     */
    if (permission === helperUtils_1.DrawingAreaPermissions.OWNER) {
        return res.status(400).json({
            message: 'User darf nicht als Owner hinzugefügt werden!',
        });
    }
    /**
     * Überprüfung, ob der Benutzer, der den Aufruf tätig, die Berechtigung hat, den Benutzer als CO-OWNER hinzuzufügen.
     */
    if (permission === helperUtils_1.DrawingAreaPermissions.COOWNER) {
        if (!drawingAreas[drawingAreaIndex].authorizedUsers.find((authorizedUser) => authorizedUser.userId === userId &&
            authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.OWNER)) {
            return res.status(400).json({
                message: 'User hat nicht die Berechtigung, einen Co-Owner hinzuzufügen!',
            });
        }
    }
    /**
     * Überprüfung, ob der Benutzer, der den Aufruf tätig, die Berechtigung hat, den Benutzer als MODERATOR hinzuzufügen.
     */
    if (permission === helperUtils_1.DrawingAreaPermissions.MODERATOR) {
        if (!drawingAreas[drawingAreaIndex].authorizedUsers.find((authorizedUser) => authorizedUser.userId === userId &&
            (authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.OWNER ||
                authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.COOWNER))) {
            return res.status(400).json({
                message: 'User hat nicht die Berechtigung, einen Moderator hinzuzufügen!',
            });
        }
    }
    /**
     * Hinzufügen des Benutzers zur Liste der autorisierten Benutzer der Zeichenfläche.
     */
    drawingAreas[drawingAreaIndex].authorizedUsers.push({
        userId: userIdToAdd,
        permission: permission,
    });
    (0, helperUtils_1.writeDrawingAreasToFile)(drawingAreas);
    /**
     * Hinzufügen der Zeichenfläche zur Liste der Zeichenflächen des hinzugefügten Benutzers.
     */
    users[userIndex].drawingAreas.push({
        id: drawingAreaId,
        permission,
    });
    (0, helperUtils_1.writeUsersToFile)(users);
    res.status(200).json({
        message: 'User erfolgreich hinzugefügt.',
    });
});
/**
 * Endpunkt zum Abrufen der Benutzer einer Zeichenfläche.
 */
drawingAreaRouter.post('/getUsersFromDrawingArea', middleware_1.authenticateJWT, (req, res) => {
    const drawingAreaId = req.body.drawingAreaId;
    const userId = req.user.id;
    const drawingAreas = (0, helperUtils_1.readDrawingAreasFromFile)();
    /**
     * Überprüfung, ob die Zeichenfläche existiert.
     */
    const drawingArea = drawingAreas.find((drawingArea) => drawingArea.id === drawingAreaId);
    if (!drawingArea) {
        return res
            .status(400)
            .json({ message: 'Zeichenfläche wurde nicht gefunden!' });
    }
    /**
     * Überprüfung, ob der Benutzer autorisiert ist, die Zeichenfläche zu sehen.
     */
    const userAuthorized = drawingArea.authorizedUsers.find((authorizedUser) => authorizedUser.userId === userId);
    if (!userAuthorized) {
        return res.status(400).json({
            message: 'User ist nicht autorisiert, diese Zeichenfläche zu sehen!',
        });
    }
    /**
     * Nur der Owner, Co-Owner und Moderator der Zeichenfläche dürfen die Benutzer sehen.
     */
    if (!drawingArea.authorizedUsers.find((authorizedUser) => authorizedUser.userId === userId &&
        (authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.OWNER ||
            authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.COOWNER ||
            authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.MODERATOR))) {
        return res.status(400).json({
            message: 'User hat nicht die Berechtigung, die Benutzer zu sehen!',
        });
    }
    /**
     * Überprüfung, ob der aufrufende Benutzer der Owner der Zeichenfläche ist.
     */
    if (drawingArea.authorizedUsers.find((authorizedUser) => authorizedUser.userId === userId &&
        authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.OWNER)) {
        return res.status(200).json({
            message: 'Zeichenfläche erfolgreich gefunden.',
            users: drawingArea.authorizedUsers.filter((authorizedUser) => authorizedUser.permission !== helperUtils_1.DrawingAreaPermissions.OWNER),
        });
    }
    /**
     * Überprüfung, ob der aufrufende Benutzer der Co-Owner der Zeichenfläche ist.
     */
    if (drawingArea.authorizedUsers.find((authorizedUser) => authorizedUser.userId === userId &&
        authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.COOWNER)) {
        return res.status(200).json({
            message: 'Zeichenfläche erfolgreich gefunden.',
            users: drawingArea.authorizedUsers.filter((authorizedUser) => authorizedUser.permission !== helperUtils_1.DrawingAreaPermissions.OWNER &&
                authorizedUser.permission !== helperUtils_1.DrawingAreaPermissions.COOWNER),
        });
    }
    /**
     * Überprüfung, ob der aufrufende Benutzer der Moderator der Zeichenfläche ist.
     */
    if (drawingArea.authorizedUsers.find((authorizedUser) => authorizedUser.userId === userId &&
        authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.MODERATOR)) {
        return res.status(200).json({
            message: 'Zeichenfläche erfolgreich gefunden.',
            users: drawingArea.authorizedUsers.filter((authorizedUser) => authorizedUser.permission !== helperUtils_1.DrawingAreaPermissions.OWNER &&
                authorizedUser.permission !== helperUtils_1.DrawingAreaPermissions.COOWNER &&
                authorizedUser.permission !== helperUtils_1.DrawingAreaPermissions.MODERATOR),
        });
    }
    res.status(400).json({
        message: 'User hat nicht die Berechtigung, die Benutzer zu sehen!',
    });
});
/**
 * Endpunkt zum Entfernen eines Benutzers von einer Zeichenfläche.
 */
drawingAreaRouter.delete('/removeUserFromDrawingArea', middleware_1.authenticateJWT, (req, res) => {
    const drawingAreaId = req.body.drawingAreaId;
    const userIdToRemove = req.body.userIdToRemove;
    const userId = req.user.id;
    const drawingAreas = (0, helperUtils_1.readDrawingAreasFromFile)();
    /**
     * Überprüfung, ob die Zeichenfläche existiert, von der der Benutzer entfernt werden soll.
     */
    const drawingAreaIndex = drawingAreas.findIndex((drawingArea) => drawingArea.id === drawingAreaId);
    if (drawingAreaIndex === -1) {
        return res
            .status(400)
            .json({ message: 'Zeichenfläche wurde nicht gefunden!' });
    }
    const users = (0, helperUtils_1.readUsersFromFile)();
    /**
     * Überprüfung, ob der Benutzer existiert, der entfernt werden soll.
     */
    const userIndex = users.findIndex((user) => user.id === userIdToRemove);
    if (userIndex === -1) {
        return res.status(400).json({ message: 'User wurde nicht gefunden!' });
    }
    /**
     * Überprüfung, ob der Benutzer, der den Aufruf tätig, die Berechtigung hat, den Benutzer zu entfernen.
     */
    if (!drawingAreas[drawingAreaIndex].authorizedUsers.find((authorizedUser) => authorizedUser.userId === userId &&
        (authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.OWNER ||
            authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.COOWNER ||
            authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.MODERATOR))) {
        return res.status(400).json({
            message: 'User hat nicht die Berechtigung, einen User zu entfernen!',
        });
    }
    /**
     * Überprüfung, ob der Benutzer, der entfernt werden soll, der Owner der Zeichenfläche ist.
     */
    const userToRemoveIndex = drawingAreas[drawingAreaIndex].authorizedUsers.findIndex((authorizedUser) => authorizedUser.userId === userIdToRemove &&
        authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.OWNER);
    if (userToRemoveIndex !== -1) {
        return res.status(400).json({
            message: 'Owner der Zeichenfläche kann nicht entfernt werden!',
        });
    }
    /**
     * Überprüfung, ob der Benutzer, der den Aufruf tätig, die Berechtigung hat, den Benutzer als CO-OWNER zu entfernen.
     */
    if (!drawingAreas[drawingAreaIndex].authorizedUsers.find((authorizedUser) => authorizedUser.userId === userId &&
        authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.OWNER)) {
        const userToRemoveIndex = drawingAreas[drawingAreaIndex].authorizedUsers.findIndex((authorizedUser) => authorizedUser.userId === userIdToRemove &&
            authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.COOWNER);
        if (userToRemoveIndex !== -1) {
            return res.status(400).json({
                message: 'User hat nicht die Berechtigung, einen Co-Owner zu entfernen!',
            });
        }
    }
    /**
     * Überprüfung, ob der Benutzer, der den Aufruf tätig, die Berechtigung hat, den Benutzer als MODERATOR zu entfernen.
     */
    if (!drawingAreas[drawingAreaIndex].authorizedUsers.find((authorizedUser) => authorizedUser.userId === userId &&
        (authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.OWNER ||
            authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.COOWNER))) {
        const userToRemoveIndex = drawingAreas[drawingAreaIndex].authorizedUsers.findIndex((authorizedUser) => authorizedUser.userId === userIdToRemove &&
            authorizedUser.permission === helperUtils_1.DrawingAreaPermissions.MODERATOR);
        if (userToRemoveIndex !== -1) {
            return res.status(400).json({
                message: 'User hat nicht die Berechtigung, einen Moderator zu entfernen!',
            });
        }
    }
    /**
     * Entfernen des Benutzers aus der Liste der autorisierten Benutzer der Zeichenfläche.
     */
    drawingAreas[drawingAreaIndex].authorizedUsers = drawingAreas[drawingAreaIndex].authorizedUsers.filter((authorizedUser) => authorizedUser.userId !== userIdToRemove);
    (0, helperUtils_1.writeDrawingAreasToFile)(drawingAreas);
    /**
     * Entfernen der Zeichenfläche aus der Liste der Zeichenflächen des entfernten Benutzers.
     */
    users[userIndex].drawingAreas = users[userIndex].drawingAreas.filter((drawingArea) => drawingArea.id !== drawingAreaId);
    (0, helperUtils_1.writeUsersToFile)(users);
    res.status(200).json({
        message: 'User erfolgreich entfernt.',
    });
});
/**
 * Endpunkt zum Abruf der Informationen einer Zeichenfläche.
 */
drawingAreaRouter.post('/getDrawingAreaInformation', middleware_1.authenticateJWT, (req, res) => {
    const drawingAreaId = req.body.drawingAreaId;
    const userId = req.user.id;
    const drawingAreas = (0, helperUtils_1.readDrawingAreasFromFile)();
    /**
     * Überprüfung, ob die Zeichenfläche existiert.
     */
    const drawingArea = drawingAreas.find((drawingArea) => drawingArea.id === drawingAreaId);
    if (!drawingArea) {
        return res
            .status(400)
            .json({ message: 'Zeichenfläche wurde nicht gefunden!' });
    }
    /**
     * Überprüfung, ob der Benutzer autorisiert ist, die Zeichenfläche zu sehen.
     */
    const userAuthorized = drawingArea.authorizedUsers.find((authorizedUser) => authorizedUser.userId === userId);
    if (!userAuthorized) {
        return res.status(400).json({
            message: 'User ist nicht autorisiert, diese Zeichenfläche zu sehen!',
        });
    }
    /**
     * Rückgabe der Informationen der Zeichenfläche.
     */
    res.status(200).json({
        message: 'Zeichenfläche erfolgreich gefunden.',
        isModerated: drawingArea.isModerated,
        eventsForDrawingArea: drawingArea.eventsForDrawingArea,
    });
});
exports.default = drawingAreaRouter;
