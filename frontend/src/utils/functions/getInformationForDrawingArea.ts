import {
  IShapeAdded,
  IShapeSelected,
} from '../interfaces-types/customShapeEvents';

/**
 * Holt die Informationen für eine Zeichenfläche.
 * @param drawingAreaId - ID der Zeichenfläche.
 */
export async function getInformationForDrawingArea(
  drawingAreaId: string
): Promise<{
  success: boolean;
  message: string;
  isModerated?: boolean;
  eventsForDrawingArea?: (IShapeAdded | IShapeSelected)[];
}> {
  try {
    const response = await fetch('/api/drawingArea/getDrawingAreaInformation', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        drawingAreaId,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: `Fehler: ${errorData.message}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      message: data.message,
      isModerated: data.isModerated,
      eventsForDrawingArea: data.eventsForDrawingArea,
    };
  } catch (e) {
    return {
      success: false,
      message: `${e}`,
    };
  }
}
