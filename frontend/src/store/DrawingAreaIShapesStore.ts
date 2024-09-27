import { IShape } from '../utils/interfaces-types/typesIShapes';

/**
 * Typ für die Speicherung der IShapes zusammen mit der Benutzer-ID, die das Event ausgelöst hat.
 * So wird die Zuordnung der IShapes zu den Benutzern ermöglicht und die Selektion von Shapes für jeden Benutzer getrennt.
 */
type IShapeWithUserID = {
  iShape: IShape;
  eventUserId: string;
};

/**
 * Eigener Store für die Speicherung der IShapes.
 * Hiermit wird eine zentrale Stelle für die Verwaltung der IShapes geschaffen.
 */
export class DrawingAreaIShapesStore {
  private static instance: DrawingAreaIShapesStore;
  private iShapes: IShape[] = [];
  private selectedIShapes: IShapeWithUserID[] = [];

  /**
   * Anwendung des Singleton-Patterns, um nur eine Instanz des Stores zu erzeugen.
   */
  static getInstance(): DrawingAreaIShapesStore {
    if (!DrawingAreaIShapesStore.instance) {
      DrawingAreaIShapesStore.instance = new DrawingAreaIShapesStore();
    }
    return DrawingAreaIShapesStore.instance;
  }

  setIShapes(iShapes: IShape[]): void {
    this.iShapes = iShapes;
  }

  getIShapes(): IShape[] {
    return this.iShapes;
  }

  addIShape(iShape: IShape): void {
    this.iShapes.push(iShape);
  }

  addIShapeAtIndex(iShape: IShape, index: number): void {
    this.iShapes.splice(index, 0, iShape);
  }

  removeIShape(id: string): void {
    this.iShapes = this.iShapes.filter((s) => s.id !== id);
  }

  setSelectedIShapes(iShapes: IShapeWithUserID[]): void {
    this.selectedIShapes = iShapes;
  }

  getSelectedIShapes(userId: string): IShape[] {
    if (userId === 'all') {
      return this.selectedIShapes.map((s) => s.iShape);
    }
    return this.selectedIShapes
      .filter((s) => s.eventUserId === userId)
      .map((s) => s.iShape);
  }

  addSelectedIShape(iShape: IShape, eventUserId: string): void {
    this.selectedIShapes.push({ iShape, eventUserId });
  }

  removeSelectedIShape(id: string): void {
    this.selectedIShapes = this.selectedIShapes.filter(
      (s) => s.iShape.id !== id
    );
  }
}
