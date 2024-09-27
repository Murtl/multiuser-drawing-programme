import { drawingAreaPermissionsType } from '../interfaces-types/typesPermissions';

/**
 * Fügt einen Benutzer zu einer Zeichenfläche hinzu.
 * @param drawingAreaId - ID der Zeichenfläche
 * @param permission - Berechtigung des Benutzers, der hinzugefügt werden soll
 * @param userIdToAdd - ID des Benutzers, der hinzugefügt werden soll
 */
export async function addUserToDrawingArea(
  drawingAreaId: string,
  permission: drawingAreaPermissionsType,
  userIdToAdd: string
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/drawingArea/addUserToDrawingArea', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        drawingAreaId,
        permission,
        userIdToAdd,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `User konnte nicht hinzugefügt werden: ${errorData.message}`
      );
    }

    const data = await response.json();
    return { success: true, message: data.message };
  } catch (e) {
    return {
      success: false,
      message: `${e}`,
    };
  }
}

/**
 * Holt die Benutzer für eine Zeichenfläche.
 * @param drawingAreaId - ID der Zeichenfläche
 */
export async function getUsersForDrawingArea(drawingAreaId: string): Promise<{
  success: boolean;
  message: string;
  users?: {
    userId: string;
    permission: drawingAreaPermissionsType;
  }[];
}> {
  try {
    const response = await fetch('/api/drawingArea/getUsersFromDrawingArea', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        drawingAreaId,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `User konnte nicht gefunden werden: ${errorData.message}`
      );
    }

    const data = await response.json();
    return { success: true, message: data.message, users: data.users };
  } catch (e) {
    return {
      success: false,
      message: `${e}`,
    };
  }
}

/**
 * Entfernt einen Benutzer von einer Zeichenfläche.
 * @param drawingAreaId - ID der Zeichenfläche
 * @param userIdToRemove - ID des Benutzers, der entfernt werden soll
 */
export async function removeUserFromDrawingArea(
  drawingAreaId: string,
  userIdToRemove: string
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/drawingArea/removeUserFromDrawingArea', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        drawingAreaId,
        userIdToRemove,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `User konnte nicht entfernt werden: ${errorData.message}`
      );
    }
    const data = await response.json();
    return { success: true, message: data.message };
  } catch (e) {
    return {
      success: false,
      message: `${e}`,
    };
  }
}
