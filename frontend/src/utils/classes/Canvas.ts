import { ShapeView } from '../interfaces-types/typesShapes';
import { ToolArea } from './ToolArea';
import {
  IShapeAdded,
  IShapeEvent,
  IShapeEventType,
  IShapeRemoved,
  IShapeSelected,
  IShapeUnselected,
} from '../interfaces-types/customShapeEvents';
import { IShape } from '../interfaces-types/typesIShapes';
import { iShapeToShape } from '../functions/shapeConversionFunctions';
import { DrawingAreaIShapesStore } from '../../store/DrawingAreaIShapesStore';

/**
 * Klasse für die Zeichenfläche, die die Shapes zeichnet und Events auf die Shapes anwendet.
 */
export class Canvas implements ShapeView {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private iShapesStore = DrawingAreaIShapesStore.getInstance();

  constructor(
    canvasDomElement: HTMLCanvasElement,
    toolarea: ToolArea,
    readonly userId: string
  ) {
    const { width, height } = canvasDomElement.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.ctx = canvasDomElement.getContext('2d') as CanvasRenderingContext2D;
    canvasDomElement.addEventListener(
      'mousemove',
      createMouseHandler('handleMouseMove')
    );
    canvasDomElement.addEventListener(
      'mousedown',
      createMouseHandler('handleMouseDown')
    );
    canvasDomElement.addEventListener(
      'mouseup',
      createMouseHandler('handleMouseUp')
    );
    canvasDomElement.addEventListener(
      'contextmenu',
      createMouseHandler('handleContextMenu')
    );
    canvasDomElement.addEventListener(
      'click',
      createMouseHandler('handleMouseClick')
    );

    function createMouseHandler(methodName: string) {
      return function (e: {
        pageX: number;
        pageY: number;
        button: number;
        preventDefault: () => void;
        x: any;
        y: any;
      }) {
        if ('object' === typeof e) {
          const x = e.pageX - canvasDomElement.offsetLeft,
            y = e.pageY - canvasDomElement.offsetTop,
            ss = toolarea.getSelectedShape();
          // Wenn die linke Maustaste gedrückt wird und ein Tool ausgewählt ist, wird eine Aktion ausgeführt
          if ((e.button === 0 && ss) || (e.button === 2 && ss)) {
            e.preventDefault();
            // @ts-ignore
            const m = ss[methodName];
            if (m !== undefined) {
              // wenn die rechte Maustaste gedrückt wird, wird das Kontextmenü geöffnet mit der exakten Mausposition
              if (e.button === 2 && methodName === 'handleContextMenu') {
                m.call(ss, e.x, e.y);
              } else {
                if (e.button === 2) {
                  return;
                }
                m.call(ss, x, y);
              }
            }
          }
        }
      };
    }
  }

  /**
   * Wendet die Events auf die Zeichenfläche an.
   * @param events - Die Events, die angewendet werden sollen
   */
  applyEvents(events: IShapeEvent[]): this {
    events.forEach((e) => {
      if (e.type === IShapeEventType.IShapeAdded) {
        const eAdd = e as IShapeAdded;
        this.addIShape(eAdd.iShape);
      } else if (e.type === IShapeEventType.IShapeRemoved) {
        const eRemoved = e as IShapeRemoved;
        this.removeIShapeWithId(eRemoved.id);
      } else if (e.type === IShapeEventType.IShapeSelected) {
        const eSelect = e as IShapeSelected;
        this.selectIShape(eSelect.iShape, eSelect.userId);
      } else if (e.type === IShapeEventType.IShapeUnselected) {
        const eUnselectShape = e as IShapeUnselected;
        this.unselectIShape(eUnselectShape.id);
      }
    });
    /**
     * Nachdem die Events angewendet wurden, wird das Canvas neu gezeichnet.
     */
    return this.draw();
  }

  private draw(): this {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'lightgrey';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.stroke();

    this.ctx.fillStyle = 'black';
    const iShapes = this.iShapesStore.getIShapes();

    /**
     * Sortiert die Shapes nach ihrem Z-Index, um die Reihenfolge zu bestimmen, in der sie gezeichnet werden.
     */
    iShapes.sort((a, b) => a.zIndex! - b.zIndex!);

    /**
     * Zeichnet alle Shapes
     */
    iShapes.forEach((s) => iShapeToShape(s).draw(this.ctx, false));

    /**
     * Zeichnet alle selektierten Shapes.
     * Besonders ist hier, dass die Selektion über die Shapes gezeichnet wird.
     * Somit ist diese immer sichtbar und wird zu keinem Zeitpunkt verdeckt.
     */
    const selectedShapes = this.iShapesStore.getSelectedIShapes('all');
    selectedShapes.forEach((s) => iShapeToShape(s).draw(this.ctx, true));
    return this;
  }

  /**
   * Fügt eine IShape dem Store hinzu.
   * @param iShape - Die Shape, die hinzugefügt werden soll
   */
  private addIShape(iShape: IShape): this {
    const index = this.iShapesStore
      .getIShapes()
      .findIndex((s) => s.id === iShape.id);
    if (index === -1) {
      this.iShapesStore.addIShape(iShape);
    }
    return this;
  }

  /**
   * Entfernt eine IShape mit einer bestimmten ID aus dem Store.
   * @param id - Die ID der Shape, die entfernt werden soll
   * */
  private removeIShapeWithId(id: string): this {
    this.iShapesStore.removeIShape(id);
    this.iShapesStore.removeSelectedIShape(id);
    return this;
  }

  /**
   * Fügt eine selektierte IShape dem Store hinzu.
   * @param iShape - Die Shape, die selektiert werden soll
   * @param eventUserId - Die ID des Users, der die Shape selektiert hat
   */
  private selectIShape(iShape: IShape, eventUserId: string): this {
    const index = this.iShapesStore
      .getSelectedIShapes('all')
      .findIndex((s) => s.id === iShape.id);
    if (index === -1) {
      this.iShapesStore.addSelectedIShape(iShape, eventUserId);
    }
    return this;
  }

  /**
   * Entfernt eine selektierte IShape aus dem Store.
   * @param id - Die ID der Shape, die deselektiert werden soll
   */
  private unselectIShape(id: string): this {
    this.iShapesStore.removeSelectedIShape(id);
    return this;
  }
}
