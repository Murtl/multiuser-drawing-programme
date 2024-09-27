import { Point2D, Shape, ShapeType } from '../interfaces-types/typesShapes';

/**
 * Klasse einer Shape in Form einer Linie, die gezeichnet werden kann.
 */
export class Line implements Shape {
  public readonly type: ShapeType = 'Line';
  constructor(
    readonly id: string,
    readonly from: Point2D,
    readonly to: Point2D,
    readonly backgroundColor: string,
    readonly borderColor: string,
    readonly selectColor: string,
    readonly zIndex: number | undefined
  ) {}

  /**
   * Zeichnet die Linie auf den Canvas.
   * @param ctx - Der CanvasRenderingContext2D, auf dem gezeichnet wird.
   * @param isSelected - Ob nur die Linie gezeichnet werden soll oder nur die Auswahlpunkte.
   */
  draw(ctx: CanvasRenderingContext2D, isSelected: boolean) {
    if (isSelected) {
      ctx.fillStyle = this.selectColor;
      ctx.fillRect(this.from.x - 2, this.from.y - 2, 6, 6);
      ctx.fillRect(this.to.x - 2, this.to.y - 2, 6, 6);
    } else {
      ctx.strokeStyle = this.borderColor;
      ctx.beginPath();
      ctx.moveTo(this.from.x, this.from.y);
      ctx.lineTo(this.to.x, this.to.y);
      ctx.stroke();
    }
  }
}

/**
 * Klasse einer Shape in Form eines Kreises, der gezeichnet werden kann.
 */
export class Circle implements Shape {
  public readonly type: ShapeType = 'Circle';
  constructor(
    readonly id: string,
    readonly center: Point2D,
    readonly radius: number,
    readonly backgroundColor: string,
    readonly borderColor: string,
    readonly selectColor: string,
    readonly zIndex: number | undefined
  ) {}

  /**
   * Zeichnet den Kreis auf den Canvas.
   * @param ctx - Der CanvasRenderingContext2D, auf dem gezeichnet wird.
   * @param isSelected - Ob nur der Kreis gezeichnet werden soll oder nur die Auswahlpunkte.
   */
  draw(ctx: CanvasRenderingContext2D, isSelected: boolean) {
    if (isSelected) {
      ctx.fillStyle = this.selectColor;
      ctx.fillRect(this.center.x - 2, this.center.y - 2, 6, 6);
      ctx.fillRect(this.center.x + this.radius - 2, this.center.y - 2, 6, 6);
      ctx.fillRect(this.center.x - this.radius - 2, this.center.y - 2, 6, 6);
      ctx.fillRect(this.center.x - 2, this.center.y + this.radius - 2, 6, 6);
      ctx.fillRect(this.center.x - 2, this.center.y - this.radius - 2, 6, 6);
    } else {
      ctx.strokeStyle = this.borderColor;
      ctx.beginPath();
      ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = this.backgroundColor;
      ctx.fill();
    }
  }
}

/**
 * Klasse einer Shape in Form eines Rechtecks, das gezeichnet werden kann.
 */
export class Rectangle implements Shape {
  public readonly type: ShapeType = 'Rectangle';
  constructor(
    readonly id: string,
    readonly from: Point2D,
    readonly to: Point2D,
    readonly backgroundColor: string,
    readonly borderColor: string,
    readonly selectColor: string,
    readonly zIndex: number | undefined
  ) {}

  /**
   * Zeichnet das Rechteck auf den Canvas.
   * @param ctx - Der CanvasRenderingContext2D, auf dem gezeichnet wird.
   * @param isSelected - Ob nur das Rechteck gezeichnet werden soll oder nur die Auswahlpunkte.
   */
  draw(ctx: CanvasRenderingContext2D, isSelected: boolean) {
    if (isSelected) {
      ctx.fillStyle = this.selectColor;
      ctx.fillRect(this.from.x - 2, this.from.y - 2, 6, 6);
      ctx.fillRect(this.to.x - 2, this.to.y - 2, 6, 6);
      ctx.fillRect(this.from.x - 2, this.to.y - 2, 6, 6);
      ctx.fillRect(this.to.x - 2, this.from.y - 2, 6, 6);
    } else {
      ctx.strokeStyle = this.borderColor;
      ctx.beginPath();
      ctx.strokeRect(
        this.from.x,
        this.from.y,
        this.to.x - this.from.x,
        this.to.y - this.from.y
      );
      ctx.stroke();
      ctx.fillStyle = this.backgroundColor;
      ctx.fillRect(
        this.from.x,
        this.from.y,
        this.to.x - this.from.x,
        this.to.y - this.from.y
      );
    }
  }
}

/**
 * Klasse einer Shape in Form eines Dreiecks, das gezeichnet werden kann.
 */
export class Triangle implements Shape {
  public readonly type: ShapeType = 'Triangle';

  constructor(
    readonly id: string,
    readonly p1: Point2D,
    readonly p2: Point2D,
    readonly p3: Point2D,
    readonly backgroundColor: string,
    readonly borderColor: string,
    readonly selectColor: string,
    readonly zIndex: number | undefined
  ) {}

  /**
   * Zeichnet das Dreieck auf den Canvas.
   * @param ctx - Der CanvasRenderingContext2D, auf dem gezeichnet wird.
   * @param isSelected - Ob nur das Dreieck gezeichnet werden soll oder nur die Auswahlpunkte.
   */
  draw(ctx: CanvasRenderingContext2D, isSelected: boolean) {
    if (isSelected) {
      ctx.fillStyle = this.selectColor;
      ctx.fillRect(this.p1.x - 2, this.p1.y - 2, 6, 6);
      ctx.fillRect(this.p2.x - 2, this.p2.y - 2, 6, 6);
      ctx.fillRect(this.p3.x - 2, this.p3.y - 2, 6, 6);
    } else {
      ctx.strokeStyle = this.borderColor;
      ctx.beginPath();
      ctx.moveTo(this.p1.x, this.p1.y);
      ctx.lineTo(this.p2.x, this.p2.y);
      ctx.lineTo(this.p3.x, this.p3.y);
      ctx.lineTo(this.p1.x, this.p1.y);
      ctx.stroke();
      ctx.fillStyle = this.backgroundColor;
      ctx.fill();
    }
  }
}
