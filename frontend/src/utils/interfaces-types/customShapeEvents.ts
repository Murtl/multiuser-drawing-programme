import { IShape } from './typesIShapes';

/**
 * Die verschiedenen Typen von Events, die auftreten können
 */
export enum IShapeEventType {
  'IShapeAdded' = 'IShapeAdded',
  'IShapeRemoved' = 'IShapeRemoved',
  'IShapeSelected' = 'IShapeSelected',
  'IShapeUnselected' = 'IShapeUnselected',
}

export interface IShapeEvent {
  readonly type: IShapeEventType;
}

export class IShapeAdded implements IShapeEvent {
  readonly type: IShapeEventType = IShapeEventType.IShapeAdded;

  constructor(readonly iShape: IShape) {}
}

export class IShapeRemoved implements IShapeEvent {
  readonly type: IShapeEventType = IShapeEventType.IShapeRemoved;

  constructor(readonly id: string) {}
}

export class IShapeSelected implements IShapeEvent {
  readonly type: IShapeEventType = IShapeEventType.IShapeSelected;

  constructor(
    readonly iShape: IShape,
    readonly userId: string
  ) {}
}

export class IShapeUnselected implements IShapeEvent {
  readonly type: IShapeEventType = IShapeEventType.IShapeUnselected;

  constructor(
    readonly id: string,
    readonly userId: string
  ) {}
}
