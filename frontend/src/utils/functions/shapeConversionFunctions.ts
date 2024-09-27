import { Circle, Line, Rectangle, Triangle } from '../classes/ShapeClasses';
import { IShape } from '../interfaces-types/typesIShapes';
import { Shape } from '../interfaces-types/typesShapes';

/**
 * Konvertiert ein IShape in ein Shape
 * @param iShape Die IShape, die konvertiert werden soll
 */
export function iShapeToShape(iShape: IShape): Shape {
  switch (iShape.type) {
    case 'Line':
      return new Line(
        iShape.id,
        iShape.from,
        iShape.to,
        iShape.backgroundColor,
        iShape.borderColor,
        iShape.selectColor,
        iShape.zIndex
      );
    case 'Rectangle':
      return new Rectangle(
        iShape.id,
        iShape.from,
        iShape.to,
        iShape.backgroundColor,
        iShape.borderColor,
        iShape.selectColor,
        iShape.zIndex
      );
    case 'Circle':
      return new Circle(
        iShape.id,
        iShape.center,
        iShape.radius,
        iShape.backgroundColor,
        iShape.borderColor,
        iShape.selectColor,
        iShape.zIndex
      );
    case 'Triangle':
      return new Triangle(
        iShape.id,
        iShape.p1,
        iShape.p2,
        iShape.p3,
        iShape.backgroundColor,
        iShape.borderColor,
        iShape.selectColor,
        iShape.zIndex
      );
  }
}

/**
 * Konvertiert ein Shape in ein IShape
 * @param shape Die Shape, die konvertiert werden soll
 */
export function shapeToIShape(shape: Shape): IShape {
  switch (shape.type) {
    case 'Line':
      return {
        id: shape.id,
        type: 'Line',
        borderColor: shape.borderColor,
        backgroundColor: shape.backgroundColor,
        selectColor: shape.selectColor,
        zIndex: shape.zIndex,
        from: (shape as Line).from,
        to: (shape as Line).to,
      };
    case 'Rectangle':
      return {
        id: shape.id,
        type: 'Rectangle',
        borderColor: shape.borderColor,
        backgroundColor: shape.backgroundColor,
        selectColor: shape.selectColor,
        zIndex: shape.zIndex,
        from: (shape as Rectangle).from,
        to: (shape as Rectangle).to,
      };
    case 'Circle':
      return {
        id: shape.id,
        type: 'Circle',
        borderColor: shape.borderColor,
        backgroundColor: shape.backgroundColor,
        selectColor: shape.selectColor,
        zIndex: shape.zIndex,
        center: (shape as Circle).center,
        radius: (shape as Circle).radius,
      };
    case 'Triangle':
      return {
        id: shape.id,
        type: 'Triangle',
        borderColor: shape.borderColor,
        backgroundColor: shape.backgroundColor,
        selectColor: shape.selectColor,
        zIndex: shape.zIndex,
        p1: (shape as Triangle).p1,
        p2: (shape as Triangle).p2,
        p3: (shape as Triangle).p3,
      };
  }
}
