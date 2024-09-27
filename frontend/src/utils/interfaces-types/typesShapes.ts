import { IShapeEvent } from './customShapeEvents.js';

/**
 * Klasse für einen 2D-Punkt
 */
export class Point2D {
  constructor(
    readonly x: number,
    readonly y: number
  ) {}
}

/**
 * Typ für die verschiedenen Shapes
 */
export type ShapeType = 'Line' | 'Circle' | 'Rectangle' | 'Triangle';

/**
 * Ein Shape, das gezeichnet werden kann
 */
export interface Shape {
  readonly id: string;
  readonly type: ShapeType;
  backgroundColor: string;
  borderColor: string;
  selectColor: string;
  zIndex: number | undefined;
  draw(ctx: CanvasRenderingContext2D, isSelected: boolean): void;
}

/**
 * Interface für eine Darstellungsklasse der Shapes
 */
export interface ShapeView {
  applyEvents(events: IShapeEvent[]): this;
}

/**
 * Interface für eine Factory-Klasse.
 */
export interface ShapeFactory {
  label: string;
  handleMouseDown(x: number, y: number): void;
  handleMouseUp(x: number, y: number): void;
  handleMouseMove(x: number, y: number): void;
  handleContextMenu?(x: number, y: number): void;
  handleMouseClick?(x: number, y: number): void;
}
