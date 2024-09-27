import { Circle, Line, Rectangle, Triangle } from '../classes/ShapeClasses';
import { Point2D } from './typesShapes';

export type IShape = ILine | IRectangle | ICircle | ITriangle;

/**
 * Ein abstraktes Interface für Shapes
 */
export interface AbstractIShape {
  readonly id: string;
  borderColor: string;
  backgroundColor: string;
  selectColor: string;
  zIndex?: number;
}

export interface ILine extends AbstractIShape {
  readonly type: 'Line';
  readonly from: Point2D;
  readonly to: Point2D;
}

export interface IRectangle extends AbstractIShape {
  readonly type: 'Rectangle';
  readonly from: Point2D;
  readonly to: Point2D;
}

export interface ICircle extends AbstractIShape {
  readonly type: 'Circle';
  readonly center: Point2D;
  readonly radius: number;
}

export interface ITriangle extends AbstractIShape {
  readonly type: 'Triangle';
  readonly p1: Point2D;
  readonly p2: Point2D;
  readonly p3: Point2D;
}
