import { Point2D, Shape, ShapeFactory } from '../interfaces-types/typesShapes';
import { IShapeManager } from '../interfaces-types/IShapeManager';
import { Circle, Line, Rectangle, Triangle } from './ShapeClasses';
import { IDFactory } from './IdFactory';
import {
  iShapeToShape,
  shapeToIShape,
} from '../functions/shapeConversionFunctions';
import { PopupMenu } from './PopupMenu';
import { DrawingAreaIShapesStore } from '../../store/DrawingAreaIShapesStore';
import { SelectColorFactory } from './SelectColorFactory';

/**
 * Eine abstrakte Factory-Klasse, die die Erstellung für eine Linie, ein Kreis und ein Rechteck ermöglicht.
 */
abstract class AbstractFactory<T extends Shape> {
  private from?: Point2D;
  private tmpTo?: Point2D;
  private tmpShape?: T; //Polymorphie durch optionale Parameter erfüllt

  protected constructor(readonly shapeManager: IShapeManager) {}

  /**
   * Eine abstrakte Methode, die ein Shape erstellt.
   * @param from - Der Startpunkt
   * @param to - Der Endpunkt
   */
  abstract createShape(from: Point2D, to: Point2D): T;

  /**
   * Diese Methode wird aufgerufen, wenn der Benutzer die Maus drückt.
   * @param x - Die x-Koordinate des Mauszeigers
   * @param y - Die y-Koordinate des Mauszeigers
   */
  handleMouseDown(x: number, y: number) {
    this.from = new Point2D(x, y);
  }

  /**
   * Diese Methode wird aufgerufen, wenn der Benutzer die Maus loslässt.
   * @param x - Die x-Koordinate des Mauszeigers
   * @param y - Die y-Koordinate des Mauszeigers
   */
  async handleMouseUp(x: number, y: number) {
    /**
     * Hier wird das temporäre Shape entfernt, wenn es existiert.
     */
    if (this.tmpShape) {
      await this.shapeManager.removeIShapeWithId(this.tmpShape.id);
    }
    await this.shapeManager.addIShape(
      shapeToIShape(this.createShape(this.from as Point2D, new Point2D(x, y))),
      true
    );
    this.from = undefined;
  }

  /**
   * Diese Methode wird aufgerufen, wenn der Benutzer die Maus bewegt.
   * @param x - Die x-Koordinate des Mauszeigers
   * @param y - Die y-Koordinate des Mauszeigers
   */
  async handleMouseMove(x: number, y: number) {
    /**
     * Hier wird nur ein temporärer Kreis gezeichnet, wenn der Startpunkt definiert ist.
     */
    if (!this.from) {
      return;
    }
    if (!this.tmpTo || this.tmpTo.x !== x || this.tmpTo.y !== y) {
      this.tmpTo = new Point2D(x, y);
      if (this.tmpShape) {
        /**
         * Hier wird die temporäre Linie entfernt, wenn es existiert.
         */
        await this.shapeManager.removeIShapeWithId(this.tmpShape.id);
      }
      /**
       * Hier wird ein temporäres Shape gezeichnet und hinzugefügt.
       */
      this.tmpShape = this.createShape(this.from, new Point2D(x, y));
      await this.shapeManager.addIShape(shapeToIShape(this.tmpShape));
    }
  }
}

/**
 * Eine Factory-Klasse, die Linien erstellt.
 */
export class LineFactory extends AbstractFactory<Line> implements ShapeFactory {
  public label: string = 'Linie';

  constructor(shapeManager: IShapeManager) {
    super(shapeManager);
  }

  /**
   * Diese Methode erstellt eine Linie.
   * @param from - Der Startpunkt
   * @param to - Der Endpunkt
   */
  createShape(from: Point2D, to: Point2D): Line {
    return new Line(
      IDFactory.getNewId(),
      from,
      to,
      'transparent',
      '#000000',
      SelectColorFactory.getSelectColor(),
      undefined
    );
  }
}

/**
 * Eine Factory-Klasse, die Kreise erstellt.
 */
export class CircleFactory
  extends AbstractFactory<Circle>
  implements ShapeFactory
{
  public label: string = 'Kreis';

  constructor(shapeManager: IShapeManager) {
    super(shapeManager);
  }

  /**
   * Diese Methode erstellt einen Kreis.
   * @param from - Der Startpunkt
   * @param to - Der Endpunkt
   */
  createShape(from: Point2D, to: Point2D): Circle {
    return new Circle(
      IDFactory.getNewId(),
      from,
      CircleFactory.computeRadius(from, to.x, to.y),
      'transparent',
      '#000000',
      SelectColorFactory.getSelectColor(),
      undefined
    );
  }

  /**
   * Diese Methode berechnet den Radius eines Kreises.
   * @param from - Der Startpunkt
   * @param x - Die x-Koordinate des Endpunkts
   * @param y - Die y-Koordinate des Endpunkts
   */
  private static computeRadius(from: Point2D, x: number, y: number): number {
    const xDiff = from.x - x,
      yDiff = from.y - y;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  }
}

/**
 * Eine Factory-Klasse, die Rechtecke erstellt.
 */
export class RectangleFactory
  extends AbstractFactory<Rectangle>
  implements ShapeFactory
{
  public label: string = 'Rechteck';

  constructor(shapeManager: IShapeManager) {
    super(shapeManager);
  }

  /**
   * Diese Methode erstellt ein Rechteck.
   * @param from - Der Startpunkt
   * @param to - Der Endpunkt
   */
  createShape(from: Point2D, to: Point2D): Rectangle {
    return new Rectangle(
      IDFactory.getNewId(),
      from,
      to,
      'transparent',
      '#000000',
      SelectColorFactory.getSelectColor(),
      undefined
    );
  }
}

/**
 * Eine Factory-Klasse, die Dreiecke erstellt und nicht die abstrakte Klasse AbstractFactory nutzt.
 */
export class TriangleFactory implements ShapeFactory {
  public label: string = 'Dreieck';

  private from?: Point2D;
  private tmpTo?: Point2D;
  private tmpLine?: Line;
  private thirdPoint?: Point2D;
  private tmpShape?: Triangle;

  constructor(readonly shapeManager: IShapeManager) {}

  /**
   * Diese Methode wird aufgerufen, wenn der Benutzer die Maus drückt.
   * Hier wird die Shape auch endgültig gezeichnet und auf dem Server gespeichert.
   * @param x - Die x-Koordinate des Mauszeigers
   * @param y - Die y-Koordinate des Mauszeigers
   */
  async handleMouseDown(x: number, y: number) {
    if (this.tmpShape) {
      await this.shapeManager.removeIShapeWithId(this.tmpShape.id);
      await this.shapeManager.addIShape(
        shapeToIShape(
          new Triangle(
            IDFactory.getNewId(),
            this.from as Point2D,
            this.tmpTo as Point2D,
            new Point2D(x, y),
            'transparent',
            '#000000',
            SelectColorFactory.getSelectColor(),
            undefined
          )
        ),
        true
      );
      this.from = undefined;
      this.tmpTo = undefined;
      this.tmpLine = undefined;
      this.thirdPoint = undefined;
      this.tmpShape = undefined;
    } else {
      this.from = new Point2D(x, y);
    }
  }

  /**
   * Diese Methode wird aufgerufen, wenn der Benutzer die Maus loslässt.
   * @param x - Die x-Koordinate des Mauszeigers
   * @param y - Die y-Koordinate des Mauszeigers
   */
  async handleMouseUp(x: number, y: number) {
    /**
     * Hier wird die temporäre Linie entfernt, wenn diese existiert.
     */
    if (this.tmpLine) {
      await this.shapeManager.removeIShapeWithId(this.tmpLine.id);
      this.tmpLine = undefined;
      this.tmpTo = new Point2D(x, y);
      this.thirdPoint = new Point2D(x, y);
      this.tmpShape = new Triangle(
        IDFactory.getNewId(),
        this.from as Point2D as Point2D,
        this.tmpTo,
        this.thirdPoint,
        'transparent',
        '#000000',
        SelectColorFactory.getSelectColor(),
        undefined
      );
      await this.shapeManager.addIShape(shapeToIShape(this.tmpShape));
    }
  }

  /**
   * Diese Methode wird aufgerufen, wenn der Benutzer die Maus bewegt.
   * @param x - Die x-Koordinate des Mauszeigers
   * @param y - Die y-Koordinate des Mauszeigers
   */
  async handleMouseMove(x: number, y: number) {
    /**
     * Hier wird nur ein temporärer Kreis gezeichnet, wenn der Startpunkt definiert ist.
     */
    if (!this.from) {
      return;
    }

    if (this.tmpShape) {
      /**
       * Hier wird der dritte Point des Dreiecks gesetzt, wenn dieses existiert.
       */
      if (
        !this.thirdPoint ||
        this.thirdPoint.x !== x ||
        this.thirdPoint.y !== y
      ) {
        this.thirdPoint = new Point2D(x, y);
        if (this.tmpShape) {
          /**
           * Hier wird die temporäre Linie entfernt, wenn diese existiert.
           */
          await this.shapeManager.removeIShapeWithId(this.tmpShape.id);
        }
        /**
         * Hier wird ein temporäres Dreieck gezeichnet und hinzugefügt.
         */
        this.tmpShape = new Triangle(
          IDFactory.getNewId(),
          this.from,
          this.tmpTo as Point2D,
          this.thirdPoint,
          'transparent',
          '#000000',
          SelectColorFactory.getSelectColor(),
          undefined
        );
        await this.shapeManager.addIShape(shapeToIShape(this.tmpShape));
      }
    } else {
      /**
       * Hier wird nur eine temporäre Linie gezeichnet, wenn der Endpunkt definiert ist.
       */
      if (!this.tmpTo || this.tmpTo.x !== x || this.tmpTo.y !== y) {
        this.tmpTo = new Point2D(x, y);
        if (this.tmpLine) {
          /**
           * Hier wird die temporäre Linie entfernt, wenn diese existiert.
           */
          await this.shapeManager.removeIShapeWithId(this.tmpLine.id);
        }
        /**
         * Hier wird eine temporäre Linie gezeichnet und hinzugefügt.
         */
        this.tmpLine = new Line(
          IDFactory.getNewId(),
          this.from,
          this.tmpTo,
          'transparent',
          '#000000',
          SelectColorFactory.getSelectColor(),
          undefined
        );
        await this.shapeManager.addIShape(shapeToIShape(this.tmpLine));
      }
    }
  }
}

/**
 * Diese Klasse ist für die Selektion von Shapes zuständig.
 */
export class SelectorFactory implements ShapeFactory {
  public label: string = 'Selektion';
  private isAltPressed: boolean = false;
  private isStrPressed: boolean = false;
  private isMousePressed: boolean = false;
  private iShapeStore = DrawingAreaIShapesStore.getInstance();

  private lastIndexOfIteratedShape: number = 0;
  private cordsMousePressed?: Point2D;
  private lastMovedShape: {
    oldShape: Shape | undefined;
    newShape: Shape | undefined;
  } = {
    oldShape: undefined,
    newShape: undefined,
  };

  constructor(
    readonly shapeManager: IShapeManager,
    readonly userId: string
  ) {
    /**
     * Diese Methode wird aufgerufen, wenn eine Taste gedrückt wird auf dem document body.
     */
    document.body.addEventListener('keydown', (e) => {
      this.isAltPressed = e.altKey;
      this.isStrPressed = e.ctrlKey;
    });

    /**
     * Diese Methode wird aufgerufen, wenn eine Taste losgelassen wird auf dem document body.
     */
    document.body.addEventListener('keyup', (e) => {
      this.isAltPressed = e.altKey;
      this.isStrPressed = e.ctrlKey;
    });
  }

  handleMouseDown(x: number, y: number) {
    this.isMousePressed = true;
    this.cordsMousePressed = new Point2D(x, y);
    this.lastMovedShape.oldShape = undefined;
    this.lastMovedShape.newShape = undefined;
  }

  async handleMouseUp(x: number, y: number) {
    this.isMousePressed = false;
    /**
     * Hier wird das letzte move Event wiederholt, um auf dem Server zu speichern, falls eine Shape bewegt wurde.
     */
    if (this.lastMovedShape.oldShape && this.lastMovedShape.newShape) {
      await this.shapeManager.moveIShape(
        shapeToIShape(this.lastMovedShape.oldShape),
        shapeToIShape(this.lastMovedShape.newShape),
        true
      );
    }
  }

  /**
   * Diese Methode wird aufgerufen, wenn der Benutzer die Maus bewegt und setzt Drag and Drop um.
   * @param x - Die x-Koordinate des Mauszeigers
   * @param y - Die y-Koordinate des Mauszeigers
   */
  handleMouseMove(x: number, y: number) {
    if (
      this.isMousePressed &&
      this.iShapeStore.getSelectedIShapes(this.userId).length !== 0
    ) {
      this.iShapeStore
        .getSelectedIShapes(this.userId)
        .map(iShapeToShape)
        .forEach(async (shape) => {
          if (this.isMouseOverShape(shape, x, y)) {
            let newShape: Shape | undefined;
            const diffX = x - (this.cordsMousePressed as Point2D).x;
            const diffY = y - (this.cordsMousePressed as Point2D).y;
            if (shape instanceof Line) {
              newShape = new Line(
                shape.id,
                new Point2D(shape.from.x + diffX, shape.from.y + diffY),
                new Point2D(shape.to.x + diffX, shape.to.y + diffY),
                shape.backgroundColor,
                shape.borderColor,
                shape.selectColor,
                shape.zIndex
              );
            }
            if (shape instanceof Circle) {
              newShape = new Circle(
                shape.id,
                new Point2D(shape.center.x + diffX, shape.center.y + diffY),
                shape.radius,
                shape.backgroundColor,
                shape.borderColor,
                shape.selectColor,
                shape.zIndex
              );
            }
            if (shape instanceof Rectangle) {
              newShape = new Rectangle(
                shape.id,
                new Point2D(shape.from.x + diffX, shape.from.y + diffY),
                new Point2D(shape.to.x + diffX, shape.to.y + diffY),
                shape.backgroundColor,
                shape.borderColor,
                shape.selectColor,
                shape.zIndex
              );
            }
            if (shape instanceof Triangle) {
              newShape = new Triangle(
                shape.id,
                new Point2D(shape.p1.x + diffX, shape.p1.y + diffY),
                new Point2D(shape.p2.x + diffX, shape.p2.y + diffY),
                new Point2D(shape.p3.x + diffX, shape.p3.y + diffY),
                shape.backgroundColor,
                shape.borderColor,
                shape.selectColor,
                shape.zIndex
              );
            }
            if (newShape !== undefined) {
              await this.shapeManager.moveIShape(
                shapeToIShape(shape),
                shapeToIShape(newShape)
              );
              /**
               * Das alte Shape und neue Shape werden gespeichert, damit das letzte Event wiederholt werden kann, um in den EventStream zu schreiben.
               * Sonst würde jedes Event in dem EventStream stehen und das führt zu einer unübersichtlichen Darstellung.
               */
              this.lastMovedShape.oldShape = shape;
              this.lastMovedShape.newShape = newShape;
              this.cordsMousePressed = new Point2D(x, y);
            }
          }
        });
    }
  }

  /**
   * Diese Methode wird aufgerufen, wenn der Benutzer auf das Canvas rechts klickt.
   * @param x - Die x-Koordinate des Mauszeigers
   * @param y - Die y-Koordinate des Mauszeigers
   */
  handleContextMenu(x: number, y: number) {
    if (this.iShapeStore.getSelectedIShapes(this.userId).length !== 0) {
      const popupMenu = new PopupMenu();
      const popupMenuItem = popupMenu.createMenuItem(
        'Löschen',
        (menu?: PopupMenu) => {
          this.iShapeStore
            .getSelectedIShapes(this.userId)
            .forEach(async (shape) => {
              await this.shapeManager.removeIShapeWithId(shape.id, true);
            });
          menu?.hide();
        }
      );
      popupMenu.addMenuItem(popupMenuItem);
      const popUpSeparator = popupMenu.createSeparator();
      popupMenu.addMenuItem(popUpSeparator);
      const radioOptionBackground = popupMenu.createRadioOption(
        'Hintergrundfarbe:',
        {
          transparent: 'transparent',
          '#FF0000': 'rot',
          '#00FF00': 'grün',
          '#FFFF00': 'gelb',
          '#0000FF': 'blau',
          '#000000': 'schwarz',
        },
        this.iShapeStore.getSelectedIShapes(this.userId).length === 1
          ? this.iShapeStore.getSelectedIShapes(this.userId)[0].backgroundColor
          : undefined,
        (color) => {
          this.iShapeStore
            .getSelectedIShapes(this.userId)
            .forEach(async (iShape) => {
              await this.shapeManager.setBackgroundColor(iShape, color);
            });
        }
      );
      popupMenu.addMenuItem(radioOptionBackground);
      const popUpSeparator2 = popupMenu.createSeparator();
      popupMenu.addMenuItem(popUpSeparator2);
      const radioOptionBorder = popupMenu.createRadioOption(
        'Rahmenfarbe:',
        {
          '#FF0000': 'rot',
          '#00FF00': 'grün',
          '#FFFF00': 'gelb',
          '#0000FF': 'blau',
          '#000000': 'schwarz',
        },
        this.iShapeStore.getSelectedIShapes(this.userId).length === 1
          ? this.iShapeStore.getSelectedIShapes(this.userId)[0].borderColor
          : undefined,
        (color) => {
          this.iShapeStore
            .getSelectedIShapes(this.userId)
            .forEach(async (iShape) => {
              await this.shapeManager.setBorderColor(iShape, color);
            });
        }
      );
      popupMenu.addMenuItem(radioOptionBorder);
      const popUpSeparator3 = popupMenu.createSeparator();
      popupMenu.addMenuItem(popUpSeparator3);
      const popupMenuItemForeGround = popupMenu.createMenuItem(
        'in den Vordergrund (ganz vor)',
        () => {
          this.iShapeStore
            .getSelectedIShapes(this.userId)
            .forEach(async (iShape) => {
              await this.shapeManager.setZIndex(iShape, 'end');
            });
        }
      );
      popupMenu.addMenuItem(popupMenuItemForeGround);
      const popUpSeparator4 = popupMenu.createSeparator();
      popupMenu.addMenuItem(popUpSeparator4);
      const popupMenuItemBackGround = popupMenu.createMenuItem(
        'in den Hintergrund (ganz hinter)',
        () => {
          this.iShapeStore
            .getSelectedIShapes(this.userId)
            .forEach(async (iShape) => {
              await this.shapeManager.setZIndex(iShape, 'start');
            });
        }
      );
      popupMenu.addMenuItem(popupMenuItemBackGround);
      popupMenu.show(x, y);
    }
  }

  /**
   * Diese Methode wird aufgerufen, wenn der Benutzer auf das Canvas klickt.
   * @param x - Die x-Koordinate des Mauszeigers
   * @param y - Die y-Koordinate des Mauszeigers
   */
  async handleMouseClick(x: number, y: number) {
    if (!this.isStrPressed) {
      this.resetShapesSelection();
    }
    if (!this.isAltPressed) {
      this.lastIndexOfIteratedShape = 0;
    }
    const shapes = this.iShapeStore.getIShapes().map(iShapeToShape);
    for (let i = shapes.length - 1; i >= 0; i--) {
      const index = (this.lastIndexOfIteratedShape + i) % shapes.length;
      const shape = shapes[index];
      if (this.isMouseOverShape(shape, x, y)) {
        if (this.isAltPressed && this.isShapeSelected(shape)) {
          if (!this.isStrPressed) {
            await this.shapeManager.unselectIShape(shape.id, true);
          }
        } else {
          await this.shapeManager.selectIShape(shapeToIShape(shape), true);
          this.lastIndexOfIteratedShape = index;
          break;
        }
      }
    }
  }

  /**
   * Diese Methode setzt die Selektion zurück.
   */
  private resetShapesSelection() {
    if (this.iShapeStore.getSelectedIShapes(this.userId).length === 0) {
      return;
    }
    this.iShapeStore.getSelectedIShapes(this.userId).forEach(async (shape) => {
      await this.shapeManager.unselectIShape(shape.id, true);
    });
  }

  /**
   * Diese Methode prüft, ob eine Shape selektiert ist.
   * @param shape - Die Shape die geprüft werden soll
   */
  private isShapeSelected(shape: Shape): boolean {
    const index = this.iShapeStore
      .getSelectedIShapes(this.userId)
      .indexOf(shapeToIShape(shape));
    return index !== -1;
  }

  /**
   * Diese Methode prüft, ob der Mauszeiger über einer Shape ist.
   * @param shape Die Shape
   * @param x - Die x-Koordinate des Mauszeigers
   * @param y - Die y-Koordinate des Mauszeigers
   * @returns true, wenn der Mauszeiger über der Shape ist, sonst false
   */
  private isMouseOverShape(shape: Shape, x: number, y: number) {
    if (shape instanceof Line) {
      return this.isMouseOverLine(shape, x, y);
    }
    if (shape instanceof Circle) {
      return this.isMouseOverCircle(shape, x, y);
    }
    if (shape instanceof Rectangle) {
      return this.isMouseOverRectangle(shape, x, y);
    }
    if (shape instanceof Triangle) {
      return this.isMouseOverTriangle(shape, x, y);
    }
    return false;
  }

  /**
   * Diese Methode prüft, ob der Mauszeiger über einer Linie ist.
   * @param shape - Die Linie
   * @param x - Die x-Koordinate des Mauszeigers
   * @param y - Die y-Koordinate des Mauszeigers
   * @returns true, wenn der Mauszeiger über der Linie ist mit einer Toleranz von 5 Pixeln, sonst false
   * Coauthored by ChatGPT
   */
  private isMouseOverLine(shape: Line, x: number, y: number) {
    if (
      ((x > shape.from.x - 5 && x < shape.to.x + 5) ||
        (x < shape.from.x + 5 && x > shape.to.x - 5)) &&
      ((y > shape.from.y - 5 && y < shape.to.y + 5) ||
        (y < shape.from.y + 5 && y > shape.to.y - 5))
    ) {
      const dx = shape.to.x - shape.from.x;
      const dy = shape.to.y - shape.from.y;
      const dxPoint = x - shape.from.x;
      const dyPoint = y - shape.from.y;
      const scalar = (dxPoint * dx + dyPoint * dy) / (dx * dx + dy * dy);
      const xProjection = shape.from.x + scalar * dx;
      const yProjection = shape.from.y + scalar * dy;
      const distance = Math.sqrt(
        (x - xProjection) * (x - xProjection) +
          (y - yProjection) * (y - yProjection)
      );
      return distance < 5;
    }
    return false;
  }

  /**
   * Diese Methode prüft, ob der Mauszeiger über einem Kreis ist.
   * @param shape - Der Kreis
   * @param x - Die x-Koordinate des Mauszeigers
   * @param y - Die y-Koordinate des Mauszeigers
   * @returns true, wenn der Mauszeiger über dem Kreis ist, sonst false
   */
  private isMouseOverCircle(shape: Circle, x: number, y: number) {
    const dx = shape.center.x - x;
    const dy = shape.center.y - y;
    return Math.sqrt(dx * dx + dy * dy) < shape.radius;
  }

  /**
   * Diese Methode prüft, ob der Mauszeiger über einem Rechteck ist.
   * @param shape - Das Rechteck
   * @param x - Die x-Koordinate des Mauszeigers
   * @param y - Die y-Koordinate des Mauszeigers
   * @returns true, wenn der Mauszeiger über dem Rechteck ist, sonst false
   */
  private isMouseOverRectangle(shape: Rectangle, x: number, y: number) {
    return (
      ((x > shape.from.x && x < shape.to.x) ||
        (x < shape.from.x && x > shape.to.x)) &&
      ((y > shape.from.y && y < shape.to.y) ||
        (y < shape.from.y + 5 && y > shape.to.y))
    );
  }

  /**
   * Diese Methode prüft, ob der Mauszeiger über einem Dreieck ist.
   * @param shape - Das Dreieck
   * @param x - Die x-Koordinate des Mauszeigers
   * @param y - Die y-Koordinate des Mauszeigers
   * @returns true, wenn der Mauszeiger über dem Dreieck ist, sonst false
   * Coauthored by ChatGPT
   */
  private isMouseOverTriangle(shape: Triangle, x: number, y: number) {
    const b1 =
      this.calculateSign(x, y, shape.p1.x, shape.p1.y, shape.p2.x, shape.p2.y) <
      0.0;
    const b2 =
      this.calculateSign(x, y, shape.p2.x, shape.p2.y, shape.p3.x, shape.p3.y) <
      0.0;
    const b3 =
      this.calculateSign(x, y, shape.p3.x, shape.p3.y, shape.p1.x, shape.p1.y) <
      0.0;
    return b1 === b2 && b2 === b3;
  }

  /**
   * Diese Methode berechnet das Vorzeichen eines Dreiecks.
   * @param x - Die x-Koordinate des Mauszeigers
   * @param y - Die y-Koordinate des Mauszeigers
   * @param x2 - Die x-Koordinate des zweiten Punktes des Dreiecks
   * @param y2 - Die y-Koordinate des zweiten Punktes des Dreiecks
   * @param x3 - Die x-Koordinate des dritten Punktes des Dreiecks
   * @param y3 - Die y-Koordinate des dritten Punktes des Dreiecks
   * @returns Das Vorzeichen des Dreiecks
   * Coauthored by ChatGPT
   */
  private calculateSign(
    x: number,
    y: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number
  ) {
    return (x - x3) * (y2 - y3) - (x2 - x3) * (y - y3);
  }
}
