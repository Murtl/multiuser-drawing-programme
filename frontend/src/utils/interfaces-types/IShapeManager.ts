import { IShape } from './typesIShapes';

/**
 * Das IShapeManager Interface
 */
export interface IShapeManager {
  addIShape(iShape: IShape, postToServer?: boolean): Promise<this>;
  removeIShapeWithId(id: string, postToServer?: boolean): Promise<this>;
  selectIShape(iShape: IShape, postToServer?: boolean): Promise<this>;
  unselectIShape(id: string, postToServer?: boolean): Promise<this>;
  setBorderColor(iShape: IShape, color: string): Promise<this>;
  setBackgroundColor(iShape: IShape, color: string): Promise<this>;
  setZIndex(iShape: IShape, zIndex: number | 'start' | 'end'): Promise<this>;
  moveIShape(
    oldIShape: IShape,
    newIShape: IShape,
    postToServer?: boolean
  ): Promise<this>;
}
