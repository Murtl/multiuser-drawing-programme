import { IShapeManager } from '../interfaces-types/IShapeManager';
import { EventFan } from './EventFan';
import { IShape } from '../interfaces-types/typesIShapes';
import {
  IShapeAdded,
  IShapeEvent,
  IShapeRemoved,
  IShapeSelected,
  IShapeUnselected,
} from '../interfaces-types/customShapeEvents';
import { DrawingAreaIShapesStore } from '../../store/DrawingAreaIShapesStore';
import { SelectColorFactory } from './SelectColorFactory';

/**
 * Ein CustomShapeManager, der die IShapes verwaltet.
 */
export class CustomIShapeManager implements IShapeManager {
  private iShapeStore = DrawingAreaIShapesStore.getInstance();

  /**
   * Konstruktor
   * @param eventFan - Der EventFan
   * @param ws - Der WebSocket für die Kommunikation mit dem Backend
   * @param userId - Die ID des Benutzers
   */
  constructor(
    private readonly eventFan: EventFan,
    private ws: WebSocket,
    private readonly userId: string
  ) {}

  /**
   * Sendet ein neues ShapeEvent an den WebSocket.
   * @param shapeEvent - Das ShapeEvent, das gesendet werden soll.
   * Die Antwort des Servers wird in der 'drawingArea.ts' verarbeitet und an den EventFan weitergeleitet.
   */
  private postNewShapeEvent(shapeEvent: IShapeEvent): void {
    this.ws.send(JSON.stringify(shapeEvent));
  }

  /**
   * Erstellt ein neues IShapeAdded-Event und sendet es an den WebSocket oder fügt es direkt dem EventFan hinzu.
   * @param iShape - Die IShape, die hinzugefügt werden soll.
   * @param postToServer - Soll das IShapeEvent direkt an den WebSocket gesendet werden?
   */
  async addIShape(iShape: IShape, postToServer?: boolean): Promise<this> {
    const iShapes = this.iShapeStore.getIShapes();
    /**
     * Wenn es keine Shapes gibt, dann ist der zIndex 0
     * Ansonsten ist der zIndex die letzte Shape + 1
     */
    if (iShapes.length === 0) {
      iShape.zIndex = 0;
    } else if (iShape.zIndex === undefined) {
      iShape.zIndex = iShapes[iShapes.length - 1].zIndex! + 1;
    }
    const shapeEvent = new IShapeAdded(iShape);
    if (postToServer) {
      this.postNewShapeEvent(shapeEvent);
    } else {
      this.eventFan.applyEvents([shapeEvent]);
    }
    return this;
  }

  /**
   * Bewegt eine IShape und wirft ein IShapeRemoved und ein IShapeAdded Event, welche direkt dem EventFan hinzugefügt oder an den WebSocket gesendet werden.
   * @param oldIShape - Die alte IShape
   * @param newIShape - Die neue IShape
   * @param postToServer - Sollen die IShapeEvents direkt an den WebSocket gesendet werden?
   */
  async moveIShape(
    oldIShape: IShape,
    newIShape: IShape,
    postToServer?: boolean
  ): Promise<this> {
    const indexSelected = this.iShapeStore
      .getSelectedIShapes(this.userId)
      .findIndex((s) => s.id === oldIShape.id);
    if (indexSelected !== -1) {
      const iShapeUnselectedEvent = new IShapeUnselected(
        oldIShape.id,
        this.userId
      );
      const iShapeRemovedEvent = new IShapeRemoved(oldIShape.id);
      const iShapeAddedEvent = new IShapeAdded(newIShape);
      const iShapeSelectedEvent = new IShapeSelected(newIShape, this.userId);
      if (postToServer) {
        this.postNewShapeEvent(iShapeUnselectedEvent);
        this.postNewShapeEvent(iShapeRemovedEvent);
        this.postNewShapeEvent(iShapeAddedEvent);
        this.postNewShapeEvent(iShapeSelectedEvent);
      } else {
        this.eventFan.applyEvents([
          iShapeUnselectedEvent,
          iShapeRemovedEvent,
          iShapeAddedEvent,
          iShapeSelectedEvent,
        ]);
      }
    }
    return this;
  }

  /**
   * Erstellt ein neues IShapeRemoved-Event und sendet es an den WebSocket oder fügt es direkt dem EventFan hinzu.
   * @param id - Die ID der IShape, die entfernt werden soll
   * @param postToServer - Soll das IShapeEvent direkt an den WebSocket gesendet werden?
   */
  async removeIShapeWithId(id: string, postToServer?: boolean): Promise<this> {
    const index = this.iShapeStore.getIShapes().findIndex((s) => s.id === id);
    if (index !== -1) {
      const indexSelected = this.iShapeStore
        .getSelectedIShapes(this.userId)
        .findIndex((s) => s.id === id);
      if (indexSelected !== -1) {
        const shapeEvent = new IShapeUnselected(id, this.userId);
        if (postToServer) {
          this.postNewShapeEvent(shapeEvent);
        } else {
          this.eventFan.applyEvents([shapeEvent]);
        }
      }
      const shapeEvent = new IShapeRemoved(id);
      this.eventFan.applyEvents([shapeEvent]);
      if (postToServer) {
        this.postNewShapeEvent(shapeEvent);
      } else {
        this.eventFan.applyEvents([shapeEvent]);
      }
    }
    return this;
  }

  /**
   * Erstellt ein neues IShapeSelected-Event und sendet es an den WebSocket oder fügt es direkt dem EventFan hinzu.
   * @param iShape - Die IShape, die selektiert werden soll
   * @param postToServer - Soll das IShapeEvent direkt an den WebSocket gesendet werden?
   */
  async selectIShape(iShape: IShape, postToServer?: boolean): Promise<this> {
    const shapeEvent = new IShapeSelected(
      { ...iShape, selectColor: SelectColorFactory.getSelectColor() },
      this.userId
    );
    if (postToServer) {
      this.postNewShapeEvent(shapeEvent);
    } else {
      this.eventFan.applyEvents([shapeEvent]);
    }
    return this;
  }

  /**
   * Erstellt ein neues IShapeUnselected-Event und sendet es an den WebSocket oder fügt es direkt dem EventFan hinzu.
   * @param id - Die ID der IShape, die deselektiert werden soll
   * @param postToServer - Soll das IShapeEvent direkt an den WebSocket gesendet werden?
   */
  async unselectIShape(id: string, postToServer?: boolean): Promise<this> {
    const index = this.iShapeStore
      .getSelectedIShapes(this.userId)
      .findIndex((s) => s.id === id);
    if (index !== -1) {
      const shapeEvent = new IShapeUnselected(id, this.userId);
      if (postToServer) {
        this.postNewShapeEvent(shapeEvent);
      } else {
        this.eventFan.applyEvents([shapeEvent]);
      }
    }
    return this;
  }

  /**
   * Erstellt ein neues IShapeRemoved, IShapeAdded, IShapeUnselected und IShapeSelected Event und sendet es an den WebSocket oder fügt es direkt dem EventFan hinzu.
   * @param iShape - Die IShape, deren Hintergrundfarbe geändert werden soll
   * @param color - Die neue Hintergrundfarbe
   */
  async setBackgroundColor(iShape: IShape, color: string): Promise<this> {
    const indexSelected = this.iShapeStore
      .getSelectedIShapes(this.userId)
      .findIndex((s) => s.id === iShape.id);
    if (indexSelected !== -1) {
      const oldIShape = this.iShapeStore.getSelectedIShapes(this.userId)[
        indexSelected
      ];
      const newIShape = {
        ...oldIShape,
        backgroundColor: color,
      };
      const iShapeUnselectedEvent = new IShapeUnselected(
        oldIShape.id,
        this.userId
      );
      const iShapeRemovedEvent = new IShapeRemoved(oldIShape.id);
      const iShapeAddedEvent = new IShapeAdded(newIShape);
      const iShapeSelectedEvent = new IShapeSelected(newIShape, this.userId);
      this.postNewShapeEvent(iShapeUnselectedEvent);
      this.postNewShapeEvent(iShapeRemovedEvent);
      this.postNewShapeEvent(iShapeAddedEvent);
      this.postNewShapeEvent(iShapeSelectedEvent);
    }
    return this;
  }

  /**
   * Erstellt ein neues IShapeRemoved, IShapeAdded, IShapeUnselected und IShapeSelected Event und sendet es an den WebSocket oder fügt es direkt dem EventFan hinzu.
   * @param iShape - Die IShape, deren Rahmenfarbe geändert werden soll
   * @param color - Die neue Rahmenfarbe
   */
  async setBorderColor(iShape: IShape, color: string): Promise<this> {
    const indexSelected = this.iShapeStore
      .getSelectedIShapes(this.userId)
      .findIndex((s) => s.id === iShape.id);
    if (indexSelected !== -1) {
      const oldIShape = this.iShapeStore.getSelectedIShapes(this.userId)[
        indexSelected
      ];
      const newIShape = {
        ...oldIShape,
        borderColor: color,
      };

      const iShapeUnselectedEvent = new IShapeUnselected(
        oldIShape.id,
        this.userId
      );
      const iShapeRemovedEvent = new IShapeRemoved(oldIShape.id);
      const iShapeAddedEvent = new IShapeAdded(newIShape);
      const iShapeSelectedEvent = new IShapeSelected(newIShape, this.userId);
      this.postNewShapeEvent(iShapeUnselectedEvent);
      this.postNewShapeEvent(iShapeRemovedEvent);
      this.postNewShapeEvent(iShapeAddedEvent);
      this.postNewShapeEvent(iShapeSelectedEvent);
    }
    return this;
  }

  /**
   * Erstellt ein neues IShapeRemoved, IShapeAdded, IShapeUnselected und IShapeSelected Event und sendet es an den WebSocket oder fügt es direkt dem EventFan hinzu.
   * @param iShape - Die IShape, deren zIndex geändert werden soll
   * @param zIndex - Der neue zIndex
   */
  async setZIndex(
    iShape: IShape,
    zIndex: number | 'start' | 'end'
  ): Promise<this> {
    const iShapes = this.iShapeStore.getIShapes();
    const indexSelected = this.iShapeStore
      .getSelectedIShapes(this.userId)
      .findIndex((s) => s.id === iShape.id);
    if (indexSelected !== -1) {
      const oldIShape = this.iShapeStore.getSelectedIShapes(this.userId)[
        indexSelected
      ];
      let newIShape: IShape;
      if (zIndex === 'start') {
        newIShape = {
          ...oldIShape,
          zIndex: iShapes[0].zIndex! - 1,
        };
      } else if (zIndex === 'end') {
        newIShape = {
          ...oldIShape,
          zIndex: iShapes[iShapes.length - 1].zIndex! + 1,
        };
      } else {
        newIShape = {
          ...oldIShape,
          zIndex: zIndex,
        };
      }
      const iShapeUnselectedEvent = new IShapeUnselected(
        oldIShape.id,
        this.userId
      );
      const iShapeRemovedEvent = new IShapeRemoved(oldIShape.id);
      const iShapeAddedEvent = new IShapeAdded(newIShape);
      const iShapeSelectedEvent = new IShapeSelected(newIShape, this.userId);
      this.postNewShapeEvent(iShapeUnselectedEvent);
      this.postNewShapeEvent(iShapeRemovedEvent);
      this.postNewShapeEvent(iShapeAddedEvent);
      this.postNewShapeEvent(iShapeSelectedEvent);
    }
    return this;
  }
}
