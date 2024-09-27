import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticateJWT } from './middleware';
import {
  readUsersFromFile,
  secretKey,
  usersType,
  writeUsersToFile,
} from './helperUtils';

const authRouter = express.Router();

/**
 * Endpunkt zum Registrieren eines Benutzers.
 */
authRouter.post('/register', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  /**
   * Überprüfung, ob alle benötigten Felder vorhanden sind.
   */
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: 'E-Mail und Passwort werden benötigt!' });
  }

  const users: usersType[] = readUsersFromFile();

  /**
   * Überprüfung, ob der Benutzer bereits existiert.
   */
  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ message: 'Benutzer existiert bereits.' });
  }

  const userId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

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
  writeUsersToFile(users);

  res.status(201).json({
    message:
      'Benutzer erfolgreich registriert. Sie können sich nun anmelden, um fortzufahren.',
  });
});

/**
 * Endpunkt zum Einloggen eines Benutzers.
 */
authRouter.post('/login', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  /**
   * Überprüfung, ob alle benötigten Felder vorhanden sind.
   */
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: 'E-Mail und Passwort werden benötigt!' });
  }

  const users: usersType[] = readUsersFromFile();

  /**
   * Überprüfung, ob der Benutzer existiert und das Passwort korrekt ist.
   */
  const user = users.find(
    (user) => user.email === email && user.username === username
  );
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Falsche Einlogdaten!' });
  }

  /**
   * Erstellung des JWT-Tokens für den Benutzer.
   */
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      drawingAreas: user.drawingAreas,
    },
    secretKey,
    { expiresIn: '1h' }
  );

  /**
   * Setzen des JWT-Tokens als HTTP-Only-Cookie.
   * Vorteil dieses Cookies: Es kann nicht über JavaScript darauf zugegriffen werden und ist somit sicherer.
   */
  res.cookie('token', token, { httpOnly: true });

  res.status(200).json({ message: 'Login erfolgreich.', user });
});

/**
 * Endpunkt zum Ausloggen eines Benutzers.
 */
authRouter.post('/logout', (req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout erfolgreich.' });
});

/**
 * Endpunkt zum Aktualisieren des Passworts eines Benutzers.
 */
authRouter.put(
  '/updatePassword',
  authenticateJWT,
  async (req: Request, res: Response) => {
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

    const users: usersType[] = readUsersFromFile();

    /**
     * Überprüfung, ob der Benutzer existiert und das alte Passwort korrekt ist.
     */
    const user = users.find((user) => user.id === userId);
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(401).json({ message: 'Altes Passwort ist falsch!' });
    }

    /**
     * Aktualisierung des Passworts.
     */
    user.password = await bcrypt.hash(newPassword, 10);
    writeUsersToFile(users);

    res.status(200).json({ message: 'Passwort erfolgreich aktualisiert.' });
  }
);

/**
 * Endpunkt zum Aktualisieren des Benutzernamens eines Benutzers.
 */
authRouter.put(
  '/updateUsername',
  authenticateJWT,
  (req: Request, res: Response) => {
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

    const users: usersType[] = readUsersFromFile();

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
    writeUsersToFile(users);

    /**
     * Erstellung eines neuen aktuellen JWT-Tokens für den Benutzer.
     */
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        drawingAreas: user.drawingAreas,
      },
      secretKey,
      { expiresIn: '1h' }
    );

    /**
     *  Aktualisierung des JWT-Tokens im HTTP-Only-Cookie.
     */
    res.cookie('token', token, { httpOnly: true });

    res.status(200).json({ message: 'Benutzername erfolgreich aktualisiert.' });
  }
);

/**
 * Endpunkt zum Aktualisieren der E-Mail-Adresse eines Benutzers.
 */
authRouter.put(
  '/updateEmail',
  authenticateJWT,
  (req: Request, res: Response) => {
    const { newEmail } = req.body;
    const userId = req.user.id;

    /**
     * Überprüfung, ob alle benötigten Felder vorhanden sind.
     */
    if (!newEmail) {
      return res.status(400).json({ message: 'Neue E-Mail wird benötigt!' });
    }

    const users: usersType[] = readUsersFromFile();

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
    writeUsersToFile(users);

    /**
     * Erstellung eines neuen aktuellen JWT-Tokens für den Benutzer.
     */
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        drawingAreas: user.drawingAreas,
      },
      secretKey,
      { expiresIn: '1h' }
    );

    /**
     * Aktualisierung des JWT-Tokens im HTTP-Only-Cookie.
     */
    res.cookie('token', token, { httpOnly: true });

    res.status(200).json({ message: 'E-Mail erfolgreich aktualisiert.' });
  }
);

/**
 * Endpunkt zum Abrufen der Informationen aus dem HTTP-Only-Cookie-Token ohne Datenbankzugriff.
 */
authRouter.get('/checkAuth', authenticateJWT, (req: Request, res: Response) => {
  res.status(200).json({ user: req.user });
});

export default authRouter;
