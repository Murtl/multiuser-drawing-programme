import { DrawingAreaPreview } from '../utils/classes/DrawingAreaPreview';
import { drawingAreaPermissionsType } from '../utils/interfaces-types/typesPermissions';

/**
 * Eigener Store für die Vorschau-Elemente der Zeichenflächen, die auf der Übersichtsseite gerendert werden.
 */
export class DrawingAreaPreviewElementsStore {
  private static instance: DrawingAreaPreviewElementsStore;
  private drawingAreaPreviewElements: DrawingAreaPreview[] = [];
  private identifier: number = 0;

  /**
   * Anwendung des Singleton-Patterns, um nur eine Instanz des Stores zu erzeugen.
   */
  static getInstance(): DrawingAreaPreviewElementsStore {
    if (!DrawingAreaPreviewElementsStore.instance) {
      DrawingAreaPreviewElementsStore.instance =
        new DrawingAreaPreviewElementsStore();
    }
    return DrawingAreaPreviewElementsStore.instance;
  }

  /**
   * Erstellung der Vorschau-Elemente für die Zeichenflächen auf Basis der Informationen, die aus dem Cookie stammen.
   * @param drawingAreas - Informationen über die Zeichenflächen, die in Vorschauelemente umgewandelt werden sollen
   */
  createDrawingAreaPreviewElements(
    drawingAreas: {
      id: string;
      permission: drawingAreaPermissionsType;
    }[]
  ): void {
    this.drawingAreaPreviewElements = [];
    this.identifier = 0;
    drawingAreas.forEach(
      (drawingArea: { id: string; permission: drawingAreaPermissionsType }) => {
        this.drawingAreaPreviewElements.push(
          new DrawingAreaPreview(
            this.identifier++,
            drawingArea.permission,
            drawingArea.id
          )
        );
      }
    );
  }

  /**
   * Setzen der Vorschau-Elemente für die Zeichenflächen.
   * @param drawingAreaPreviewElements - Vorschau-Elemente der Zeichenflächen
   */
  setDrawingAreaPreviewElements(
    drawingAreaPreviewElements: DrawingAreaPreview[]
  ): void {
    this.drawingAreaPreviewElements = drawingAreaPreviewElements;
  }

  /**
   * Rückgabe der Vorschau-Elemente für die Zeichenflächen.
   */
  getDrawingAreaPreviewElements(): DrawingAreaPreview[] {
    return this.drawingAreaPreviewElements;
  }

  /**
   * Methode zum Hinzufügen eines neuen Vorschau-Elements einer Zeichenfläche auf dem Server.
   */
  async addDrawingAreaPreviewElements(): Promise<DrawingAreaPreview> {
    try {
      const response = await fetch('/api/drawingArea/createNewDrawingArea', {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Zeichenfläche konnte nicht erstellt werden: ${errorData.message}`
        );
      }

      const data = await response.json();
      const drawingAreaPreview = new DrawingAreaPreview(
        this.identifier++,
        'O',
        data.drawingAreaId
      );
      this.drawingAreaPreviewElements.push(drawingAreaPreview);
      return drawingAreaPreview;
    } catch (e) {
      throw new Error(`${e}`);
    }
  }

  /**
   * Methode zum Entfernen eines Vorschau-Elements einer Zeichenfläche auf dem Server.
   * @param drawingAreaPreview - Vorschau-Element der Zeichenfläche, die entfernt werden soll
   */
  async removeDrawingAreaPreviewElement(
    drawingAreaPreview: DrawingAreaPreview
  ) {
    try {
      const response = await fetch('/api/drawingArea/deleteDrawingArea', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          drawingAreaId: drawingAreaPreview.getDrawingAreaId(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Zeichenfläche konnte nicht gelöscht werden: ${errorData.message}`
        );
      }

      this.drawingAreaPreviewElements = this.drawingAreaPreviewElements.filter(
        (dap) => dap !== drawingAreaPreview
      );
    } catch (e) {
      throw new Error(`${e}`);
    }
  }
}
