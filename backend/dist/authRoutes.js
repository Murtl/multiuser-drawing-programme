"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("./middleware");
const helperUtils_1 = require("./helperUtils");
const authRouter = express_1.default.Router();
/**
 * Endpunkt zum Registrieren eines Benutzers.
 */
authRouter.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    /**
     * Überprüfung, ob alle benötigten Felder vorhanden sind.
     */
    if (!username || !email || !password) {
        return res
            .status(400)
            .json({ message: 'E-Mail und Passwort werden benötigt!' });
    }
    const users = (0, helperUtils_1.readUsersFromFile)();
    /**
     * Überprüfung, ob der Benutzer bereits existiert.
     */
    if (users.find((user) => user.email === email)) {
        return res.status(400).json({ message: 'Benutzer existiert bereits.' });
    }
    const userId = (0, uuid_1.v4)();
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    /**
     * Hinzufügen des Benutzers zur Liste der Benutzer.
     */
    users.push({
        id: userId,
        username,
        email,
        password: hashedPassword,
        drawingAreas: [],
    });
    (0, helperUtils_1.writeUsersToFile)(users);
    res.status(201).json({
        message: 'Benutzer erfolgreich registriert. Sie können sich nun anmelden, um fortzufahren.',
    });
}));
/**
 * Endpunkt zum Einloggen eines Benutzers.
 */
authRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    /**
     * Überprüfung, ob alle benötigten Felder vorhanden sind.
     */
    if (!username || !email || !password) {
        return res
            .status(400)
            .json({ message: 'E-Mail und Passwort werden benötigt!' });
    }
    const users = (0, helperUtils_1.readUsersFromFile)();
    /**
     * Überprüfung, ob der Benutzer existiert und das Passwort korrekt ist.
     */
    const user = users.find((user) => user.email === email && user.username === username);
    if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
        return res.status(401).json({ message: 'Falsche Einlogdaten!' });
    }
    /**
     * Erstellung des JWT-Tokens für den Benutzer.
     */
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        username: user.username,
        drawingAreas: user.drawingAreas,
    }, helperUtils_1.secretKey, { expiresIn: '1h' });
    /**
     * Setzen des JWT-Tokens als HTTP-Only-Cookie.
     * Vorteil dieses Cookies: Es kann nicht über JavaScript darauf zugegriffen werden und ist somit sicherer.
     */
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login erfolgreich.', user });
}));
/**
 * Endpunkt zum Ausloggen eines Benutzers.
 */
authRouter.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout erfolgreich.' });
});
/**
 * Endpunkt zum Aktualisieren des Passworts eines Benutzers.
 */
authRouter.put('/updatePassword', middleware_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;
    /**
     * Überprüfung, ob alle benötigten Felder vorhanden sind.
     */
    if (!oldPassword || !newPassword) {
        return res
            .status(400)
            .json({ message: 'Altes und neues Passwort werden benötigt!' });
    }
    const users = (0, helperUtils_1.readUsersFromFile)();
    /**
     * Überprüfung, ob der Benutzer existiert und das alte Passwort korrekt ist.
     */
    const user = users.find((user) => user.id === userId);
    if (!user || !(yield bcrypt_1.default.compare(oldPassword, user.password))) {
        return res.status(401).json({ message: 'Altes Passwort ist falsch!' });
    }
    /**
     * Aktualisierung des Passworts.
     */
    user.password = yield bcrypt_1.default.hash(newPassword, 10);
    (0, helperUtils_1.writeUsersToFile)(users);
    res.status(200).json({ message: 'Passwort erfolgreich aktualisiert.' });
}));
/**
 * Endpunkt zum Aktualisieren des Benutzernamens eines Benutzers.
 */
authRouter.put('/updateUsername', middleware_1.authenticateJWT, (req, res) => {
    const { newUsername } = req.body;
    const userId = req.user.id;
    /**
     * Überprüfung, ob alle benötigten Felder vorhanden sind.
     */
    if (!newUsername) {
        return res
            .status(400)
            .json({ message: 'Neuer Benutzername wird benötigt!' });
    }
    const users = (0, helperUtils_1.readUsersFromFile)();
    /**
     * Überprüfung, ob der Benutzer existiert.
     */
    const user = users.find((user) => user.id === userId);
    if (!user) {
        return res.status(404).json({ message: 'Benutzer nicht gefunden!' });
    }
    /**
     * Speichern des neuen Benutzernamens.
     */
    user.username = newUsername;
    (0, helperUtils_1.writeUsersToFile)(users);
    /**
     * Erstellung eines neuen aktuellen JWT-Tokens für den Benutzer.
     */
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        username: user.username,
        drawingAreas: user.drawingAreas,
    }, helperUtils_1.secretKey, { expiresIn: '1h' });
    /**
     *  Aktualisierung des JWT-Tokens im HTTP-Only-Cookie.
     */
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Benutzername erfolgreich aktualisiert.' });
});
/**
 * Endpunkt zum Aktualisieren der E-Mail-Adresse eines Benutzers.
 */
authRouter.put('/updateEmail', middleware_1.authenticateJWT, (req, res) => {
    const { newEmail } = req.body;
    const userId = req.user.id;
    /**
     * Überprüfung, ob alle benötigten Felder vorhanden sind.
     */
    if (!newEmail) {
        return res.status(400).json({ message: 'Neue E-Mail wird benötigt!' });
    }
    const users = (0, helperUtils_1.readUsersFromFile)();
    /**
     * Überprüfung, ob der Benutzer existiert.
     */
    const user = users.find((user) => user.id === userId);
    if (!user) {
        return res.status(404).json({ message: 'Benutzer nicht gefunden!' });
    }
    /**
     * Überprüfung, ob die E-Mail-Adresse bereits verwendet wird.
     */
    if (users.find((user) => user.email === newEmail)) {
        return res
            .status(400)
            .json({ message: 'Diese E-Mail wird bereits verwendet!' });
    }
    /**
     * Speichern der neuen E-Mail-Adresse.
     */
    user.email = newEmail;
    (0, helperUtils_1.writeUsersToFile)(users);
    /**
     * Erstellung eines neuen aktuellen JWT-Tokens für den Benutzer.
     */
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        username: user.username,
        drawingAreas: user.drawingAreas,
    }, helperUtils_1.secretKey, { expiresIn: '1h' });
    /**
     * Aktualisierung des JWT-Tokens im HTTP-Only-Cookie.
     */
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'E-Mail erfolgreich aktualisiert.' });
});
/**
 * Endpunkt zum Abrufen der Informationen aus dem HTTP-Only-Cookie-Token ohne Datenbankzugriff.
 */
authRouter.get('/checkAuth', middleware_1.authenticateJWT, (req, res) => {
    res.status(200).json({ user: req.user });
});
exports.default = authRouter;
