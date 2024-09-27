### Allgemeine Informationen
- Name: Michael Mertl
- Studiengang: Master Informatik

### Hinweise zur Ausführung
- Nach dem Entpacken das Projektverzeichnis in der Konsole öffnen.
- `npm install` ausführen, um die Abhängigkeiten zu installieren.
- `npm run start` ausführen, um den Server zu starten (auf Port 3000). Ist dieser PORT bereits belegt, dann bitte in 
der `backend/src/server.ts` Zeile 10 und in der `frontend/src/views/drawingArea.ts` Zeile 93 einmal den PORT ändern und `npm run dev` ausführen.
- Es bestehen bereits Accounts, die genutzt werden können mit unterschiedlichen Zeichenflächen und Rechten (Achtung: Der Login ist Case-Sensitive!):
  - Benutzername: `Mertl`, E-Mail: `mertl@tha.de`, Passwort: `1234`.
  - Benutzername: `Sepp`, E-Mail: `sepp@tha.de`, Passwort: `1234`.
  - Für mehr Informationen darüber siehe die `users.json` und `drawingAreas.json` Datenbanken im `backend/dist` Ordner.

### Zusätzliche Informationen
- Anbei ist ein Bild der aufgebauten Architektur zu finden: `ArchitekturZeichenprogrammMertl.png`.
- Dort wird vereinfacht alles dargestellt, um einen Überblick über die Struktur zu bekommen.
- Für genauere Informationen, z.B. der genutzten middleware zur Überprüfung der Token, siehe die entsprechenden Dateien im Projekt.
- Außerdem wurde das Textfeld mit der Option zum Zeitreisen von Aufgabe 3 entfernt, da dies nicht mehr benötigt wurde und in Aufgabe 3.1 stand, 
  dass man dieses entfernen kann. Trotzdem bleibt die Projektstruktur gleich und es können jederzeit neue ShapeViews hinzugefügt werden,
  die bei dem eventFan registriert werden können, um die Events zu empfangen.

### Hinweise zur Umsetzung der Aufgaben 4, 5 und 6 in einem Projekt
- Frontend wird beim Aufruf der Server-Adresse `http://localhost:3000/` statisch an den Client ausgeliefert (Aufgabe 6.1).
- In der Anwendung selbst kann man verschiedene Seiten aufrufen, die über die Navigation erreichbar sind (Aufgabe 4.1 und 6.2)
-> Wichtig: Es handelt sich um eine Singe-Page-Webanwendung, daher wird die Seite nicht neu geladen, sondern nur der Inhalt der Seite geändert. 
  - '/login' - Login-Seite (wird übersprungen, wenn ein token bereits in einem http-only-cookie gespeichert ist).
  - '/register' - Registrierungs-Seite (wird übersprungen, wenn ein token bereits in einem http-only-cookie gespeichert ist).
  - '/' - Übersichtsseite mit allen Zeichenflächen des Users und der Möglichkeit, seine Profileinstellungen zu ändern.
  - '/drawing-area/:id' - DrawingArea-Seite, die durch eine ID identifiziert wird.
  - '/404' - 404-Seite, die angezeigt wird, wenn eine Seite nicht gefunden wurde.
- Ein User (sowie auch sein Client) wird durch eine `User-Id` eindeutig identifiziert (Aufgabe 4.2).
  - Außerdem hat der User einen Anzeigenamen, eine E-Mail-Adresse und ein Passwort, das gehasht in der Datenbank gespeichert wird.
    - Diese Informationen sind für den Login nötig und können auf der Übersichtsseite geändert werden.
  - Außerdem ist es nur möglich über die `User-Id` andere User auf eine Zeichenfläche einzuladen.
  - Auf der Zeichenfläche selbst wird der Anzeigename des Users in Kombination mit seiner gekürzten `User-Id` angezeigt.
  - Möchte man einen User von seiner Zeichenfläche entfernen, so kriegt man eine Übersicht aller User, die auf der Zeichenfläche sind und kann sie entfernen.
  - Zu keinem Zeitpunkt wird hier die E-Mail-Adresse oder das Passwort eines Users angezeigt, so bleiben diese Informationen geschützt.
  - Andere User sehen höchstens den Anzeigenamen und die gekürzte `User-Id` eines Users.
  - Nur die User mit den Rechten `O`, `CO` oder `M` können User einladen oder entfernen und haben deshalb zum Teil Kenntnis über die `User-Id` eines Users.
- Die folgenden Rechte wurden, wie angefordert, umgesetzt: `O`, `CO`, `M`, `V`, `W` und `R` (Aufgabe 4.3 und 5).
  - Gespeichert werden die Rechte, zusammen mit der `User-Id` des Users, unter `authorizedUsers` in der `drawingAreas.json` auf dem Server.
  - Außerdem werden die Zeichenflächen, für die ein User Rechte hat, in der `users.json` unter `drawingAreas` für einen User auf dem Server gespeichert.
  - Die Informationen aus der `users.json` für einen users werden dem token hinzugefügt, wenn dieser sich einloggt.
  - Diese Informationen werden entweder bei login direkt an den Client gegeben oder bei refresh der Seite aus dem token (am Server mit `/checkAuth` ohne Datenbankzugriff!) gelesen und zurückgegeben.
- Sobald man auf der Übersichtsseite eine Zeichenfläche auswählt, gelangt man auf die DrawingArea-Seite (Aufgabe 6.1).
  - Dort wird eine WebSocket-Verbindung aufgebaut, um die Zeichenfläche in Echtzeit zu synchronisieren mit anderen Usern, die auf der Zeichenfläche sind.
    - Es besteht ebenfalls die Möglichkeit diese Verbindung aufzubauen, wenn man die Seite manuell mit einem direkten Link aufruft (./drawing-area/:id).
    - Diese WebSocket-Verbindung wird beendet, wenn man die Seite irgendwie verlässt.
    - Hat man außerdem nicht die Rechte an der Zeichenfläche oder verliert diese, wird bei der nächsten Aktion ein Hinweis ausgegeben und die WebSocket-Verbindung beendet.
  - Auf der DrawingArea-Seite hat man, neben dem normalen Canvas und dem Zeichnen, verschiedene Funktionen, je nach eigenem Recht auf der Zeichenfläche:
    - `User einladen` - Ein User kann eingeladen werden mit einem ausgewählten Recht (nur für User mit den Rechten `O`, `CO` oder `M`). 
    Wichtig: Es können nur Rechte vergeben werden, die niedriger sind als die eigenen Rechte des einladenden Users.
    - `User entfernen` - Ein User kann entfernt werden (nur für User mit den Rechten `O`, `CO` oder `M`).
    Wichtig: Es können nur User entfernt werden, die niedrigere Rechte haben als der User, der entfernt.
    - `Toggle Moderieren` - Ein User kann den Moderations-Zustand der Zeichenfläche ändern (nur für User mit den Rechten `O`, `CO` oder `M`).
    Wichtig: Ist die Zeichenfläche moderiert, so können User mit dem Recht `W` nicht mehr zeichnen, sondern nur noch sehen (wie `R`).
    - `Zurück zur Übersicht` - Hiermit gelangt man zurück zur Übersichtsseite.
    - `Logout` - Hiermit wird der User ausgeloggt und das http-only-cookie-token gelöscht.
- Unter diesen Funktionen ist außerdem eine Übersicht über alle User, die im Moment auf der Zeichenfläche sind
  - Hierbei wird zusätzlich die Selektions-Farbe des Users angezeigt, die er im Moment benutzt (so kann man besser sehen, wer welche shape ausgewählt hat etc.).
- Zusätzliche Hinweise für das Multiuser-Zeichenprogramm:
  - Erstellt ein User eine neue Shape, erhält diese Shape eine eindeutige ID, welche sich aus der `User-Id`, einem `#` und einer neuen `uuid` zusammensetzt.
  - Hat ein User eine Shape ausgewählt, wird das für jeden User sichtbar und kein anderer kann diese auswählen!
  - Hat ein anderer User eine Änderung durchgeführt, wird das für alle anderen verbundenen User sofort sichtbar.
  - Trennt oder verliert ein User seine Verbindung, werden alle seine Selektionen entfernt, damit die Shapes für die noch verbundenen User wieder auswählbar sind.
  - Öffnet ein User in zwei Tabs die gleiche Zeichenfläche, kriegt er auf dem zweiten Tab die Meldung, dass er bereits auf der Zeichenfläche ist und wird 
    automatisch zurück zur Übersichtsseite geleitet.
  - Öffnet ein User in zwei Tabs unterschiedliche Zeichenflächen, kann er auf beiden ohne Probleme arbeiten.
  - Die Anzahl der Events, die an das WebSocket und somit an den Server zur Speicherung in der `drawingAreas.json` gesendet werden, wurde begrenzt:
    - Es werden nur `IShapeAdded`, `IShapeRemoved`, `IShapeSelected`, `IShapeUnselected` und `moderate` Events gesendet.
    - Außerdem werden nur `IShapeAdded` und `IShapeSelected` am Ende ganz gespeichert, da diese Events ausreichen.
    - Dies wurde erreicht mit einem Hilfsparameter im Frontend, der entscheidet, ob die Änderung final ist und an den Server gesendet werden soll oder nicht.
    - Somit haben alle User zu jedem Zeitpunkt die gleiche Zeichenfläche und alle Informationen, aber es wird nicht zu viel an den Server gesendet und gespeichert.

### Alte Hinweise zur Anwendung von Blatt 2 und 3, die noch relevant sind
- Ist das 'Selektions'-Tool ausgewählt, dann ist es möglich mit "click" eine Shape auszuwählen (über der, der Mauszeiger beim Klick ist).
- Eine Linie hat bei der Selektion eine Toleranz von 5 Pixeln, da diese keine Fläche hat.
- Das Contextmenü zum Löschen, Hintergrundfarbe und Randfarbe ändern und zum Ändern der Z-Order wird erst angezeigt, nachdem mindestens eine Shape selektiert wurde.
- Bei einer Linie hat die Hintergrundfarbe keine Wirkung, da eine Linie keine Fläche hat, hier greift nur die Randfarbe.
- Die Option "In den Vordergrund" im Contextmenu schiebt alle selektierten Shapes ganz nach vorne.
- Die Option "In den Hintergrund" im Contextmenu schiebt alle selektierten Shapes ganz nach hinten.
- Außerdem ist es möglich, während das Contextmenü offen ist, eine selektierte Shape zu bewegen, solange bis die Maus losgelassen wird und ein `click` ausgelöst wird.
  Dieses Verhalten ist mir bewusst und wurde mit Absicht so belassen, damit ich nicht an den `mouseup` und `mousedown` events der `SelectorFactory` herumspielen muss.


### Kurze Erklärung der verwendeten Technologien auf Grundlage der package.json
- `bcrypt` - Zum Hashen der Passwörter in der Datenbank und zum Überprüfen der Passwörter beim Login.
- `cookie-parser` - Zum Verarbeiten der Cookies auf dem Server, die für die Authentifizierung genutzt werden.
- `express` - Webframework für Node.js, um den Server zu erstellen und die REST-API zu ermöglichen.
- `express-ws` - Middleware für Express, um die WebSocket-Verbindung zu ermöglichen und zu verwalten.
- `jsonwebtoken` - Zum Erstellen und Überprüfen der Tokens für die Authentifizierung.
- `uuid` - Generiert eindeutige IDs für die Shapes und die User.
- `@types/bcrypt` - Typdefinitionen für bcrypt (nur für Entwicklung).
- `@types/cookie-parser` - Typdefinitionen für cookie-parser (nur für Entwicklung).
- `@types/express` - Typdefinitionen für express (nur für Entwicklung).
- `@types/express-ws` - Typdefinitionen für express-ws (nur für Entwicklung).
- `@types/jsonwebtoken` - Typdefinitionen für jsonwebtoken (nur für Entwicklung).
- `@types/uuid` - Typdefinitionen für uuid (nur für Entwicklung).
- `copy-webpack-plugin` - Kopiert die statischen Dateien in den dist-Ordner für das Frontend (nur für Entwicklung).
- `html-webpack-plugin` - Erstellt die HTML-Datei und fügt die Skripte hinzu für das Frontend (nur für Entwicklung).
- `prettier` - Codeformatierung (nur für Entwicklung).
- `ts-loader` - Lädt die TypeScript-Dateien und kompiliert sie zu JavaScript (nur für Entwicklung).
- `typescript` - Programmiersprache, die in JavaScript kompiliert wird (nur für Entwicklung).
- `webpack` - Bündelt die Dateien und erstellt die dist-Ordner für das Frontend (nur für Entwicklung).
- `webpack-cli` - CLI für Webpack für das Frontend (nur für Entwicklung).