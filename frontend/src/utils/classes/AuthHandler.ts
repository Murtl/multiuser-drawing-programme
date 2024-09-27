import { IDFactory } from './IdFactory';
import { DrawingAreaPreviewElementsStore } from '../../store/DrawingAreaPreviewElementsStore';

/**
 * Klasse, die die Authentifizierung des Benutzers steuert und alle damit verbundenen Elemente.
 */
export class AuthHandler {
  private email: string = '';
  private username: string = '';
  private userId: string = '';
  private drawingAreaPreviewElementsStore =
    DrawingAreaPreviewElementsStore.getInstance();

  /**
   * Methode zum Initialisieren des AuthHandlers.
   * Überprüft, ob ein Benutzer eingeloggt ist und holt die Benutzerinformationen.
   */
  async init() {
    await this.checkAuth();
  }

  /**
   * Methode zum Überprüfen, ob ein Cookie vorhanden ist und der Benutzer automatisch eingeloggt werden kann.
   */
  async checkAuth(): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch('/api/auth/checkAuth', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        return { success: false, message: 'Error' };
      }

      const data = await response.json();
      this.email = data.user.email;
      this.username = data.user.username;
      this.userId = data.user.id;
      this.drawingAreaPreviewElementsStore.createDrawingAreaPreviewElements(
        data.user.drawingAreas
      );
      IDFactory.setPrefix(this.userId);
      /**
       * Ausgabe der dekodierten Informationen des Users zur Erfüllung der Aufgabe 4.3.
       */
      console.log(data.user);
      return { success: true, message: 'Success' };
    } catch (e) {
      return { success: false, message: `${e}` };
    }
  }

  /**
   * Methode zum Einloggen eines Benutzers.
   * @param username - Benutzername
   * @param email - E-Mail-Adresse
   * @param password - Passwort
   */
  async login(
    username: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          message: `Login fehlgeschlagen wegen: ${errorData.message}`,
        };
      }

      const data = await response.json();
      this.email = data.user.email;
      this.username = data.user.username;
      this.userId = data.user.id;
      this.drawingAreaPreviewElementsStore.createDrawingAreaPreviewElements(
        data.user.drawingAreas
      );
      IDFactory.setPrefix(this.userId);
      /**
       * Ausgabe der dekodierten Informationen des Users zur Erfüllung der Aufgabe 4.3.
       */
      console.log(data.user);
      return { success: true, message: data.message };
    } catch (error) {
      return {
        success: false,
        message: `Login fehlgeschlagen wegen: ${error}`,
      };
    }
  }

  /**
   * Methode zum Registrieren eines Benutzers.
   * @param username - Benutzername
   * @param email - E-Mail-Adresse
   * @param password - Passwort
   */
  async register(
    username: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          message: `Registrierung fehlgeschlagen wegen: ${errorData.message}`,
        };
      }

      const data = await response.json();
      return { success: true, message: data.message };
    } catch (error) {
      return {
        success: false,
        message: `Registrierung fehlgeschlagen wegen: ${error}`,
      };
    }
  }

  /**
   * Methode zum Ausloggen eines Benutzers.
   */
  async logout(): Promise<{ success: boolean; message: string }> {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      this.username = '';
      this.userId = '';
      this.email = '';
      this.drawingAreaPreviewElementsStore.setDrawingAreaPreviewElements([]);
      return { success: true, message: 'Logout erfolgreich.' };
    } catch (e) {
      return { success: false, message: `${e}` };
    }
  }

  /**
   * Methode, die überprüft, ob ein Benutzer eingeloggt ist.
   */
  isLoggedIn(): boolean {
    return this.email !== '' && this.userId !== '' && this.username !== '';
  }

  /**
   * Methode zum Abrufen der E-Mail-Adresse des Benutzers.
   */
  getEMail(): string {
    return this.email;
  }

  /**
   * Methode zum Abrufen der Benutzer-ID.
   */
  getUserId(): string {
    return this.userId;
  }

  /**
   * Methode zum Abrufen des Benutzernamens.
   */
  getUsername(): string {
    return this.username;
  }

  /**
   * Methode zum Aktualisieren des Passworts eines Benutzers.
   * @param oldPassword - Altes Passwort
   * @param newPassword - Neues Passwort
   */
  async updatePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch('/api/auth/updatePassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          message: `Passwortaktualisierung fehlgeschlagen wegen: ${errorData.message}`,
        };
      }

      const data = await response.json();
      return { success: true, message: data.message };
    } catch (error) {
      return {
        success: false,
        message: `Passwortaktualisierung fehlgeschlagen wegen: ${error}`,
      };
    }
  }

  /**
   * Methode zum Aktualisieren des Benutzernamens.
   * @param newUsername - Neuer Benutzername
   */
  async updateUsername(
    newUsername: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch('/api/auth/updateUsername', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newUsername: newUsername }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          message: `Benutzernamen-Aktualisierung fehlgeschlagen wegen: ${errorData.message}`,
        };
      }

      const data = await response.json();
      this.username = newUsername;
      return { success: true, message: data.message };
    } catch (error) {
      return {
        success: false,
        message: `Benutzernamen-Aktualisierung fehlgeschlagen wegen: ${error}`,
      };
    }
  }

  /**
   * Methode zum Aktualisieren der E-Mail-Adresse.
   * @param newEmail - Neue E-Mail-Adresse
   */
  async updateEmail(
    newEmail: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch('/api/auth/updateEmail', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newEmail }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          message: `E-Mail-Aktualisierung fehlgeschlagen wegen: ${errorData.message}`,
        };
      }

      const data = await response.json();
      this.email = newEmail;
      return { success: true, message: data.message };
    } catch (error) {
      return {
        success: false,
        message: `E-Mail-Aktualisierung fehlgeschlagen wegen: ${error}`,
      };
    }
  }

  /**
   * Methode zum Aktualisieren der Vorschau-Elemente der Zeichenbereiche.
   * Wird man z.B. zu einer Zeichenfläche hinzugefügt oder entfernt, kriegt das die Übersichtsseite nicht direkt mit.
   * Mit dieser Methode kann man seine aktuellen Zeichenflächen aktualisieren.
   * Hier wäre auch ein automatisierter Prozess denkbar, der die Zeichenflächen regelmäßig aktualisiert.
   * Für diesen Fall habe ich einfach einen Button gebaut, der die Zeichenfläche jederzeit aktualisieren kann.
   */
  async refreshDrawingAreas(): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch('/api/drawingArea/refreshDrawingAreas', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          message: `Aktualisierung der Zeichenbereiche fehlgeschlagen wegen: ${errorData.message}`,
        };
      }

      const data = await response.json();
      this.drawingAreaPreviewElementsStore.createDrawingAreaPreviewElements(
        data.drawingAreas
      );
      return { success: true, message: data.message };
    } catch (e) {
      return {
        success: false,
        message: `${e}`,
      };
    }
  }
}
