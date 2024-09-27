/**
 * Typ für die Rechte, die ein Benutzer auf einer Zeichenfläche haben kann.
 */
export type drawingAreaPermissionsType = 'O' | 'CO' | 'M' | 'V' | 'W' | 'R';

/**
 * Rechte, die ein Benutzer auf einer Zeichenfläche haben kann ausgeschrieben.
 */
export const drawingAreaPermissions: Record<
  drawingAreaPermissionsType,
  string
> = {
  O: 'Owner', // kann Rechte verteilen bis COOWNER, Zeichenfläche löschen und in moderierten Zustand setzen
  CO: 'Coowner', // kann Rechte verteilen bis MODERATOR und Zeichenfläche in moderiert setzen
  M: 'Moderator', // kann Rechte verteilen bis VIP und Zeichenfläche in moderiert setzen
  V: 'VIP', // kann Zeichenfläche bearbeiten, selbst wenn im moderierten Zustand
  W: 'Writer', // kann Zeichenfläche bearbeiten, wenn nicht im moderierten Zustand
  R: 'Reader', // kann Zeichenfläche lesen
};
