import fs from 'fs';
import path from 'path';

const usersFilePath = path.join(__dirname, 'users.json');
const drawingAreasFilePath = path.join(__dirname, 'drawingAreas.json');
export const secretKey = 'mertl_secret_key';

/**
 * Enum für die verschiedenen Rechte, die ein Benutzer auf einer Zeichenfläche haben kann.
 */
export enum DrawingAreaPermissions {
  OWNER = 'O', // kann Rechte verteilen bis COOWNER, Zeichenfläche löschen und in moderierten Zustand setzen
  COOWNER = 'CO', // kann Rechte verteilen bis MODERATOR und Zeichenfläche in moderiert setzen
  MODERATOR = 'M', // kann Rechte verteilen bis VIP und Zeichenfläche in moderiert setzen
  VIP = 'V', // kann Zeichenfläche bearbeiten, selbst wenn im moderierten Zustand
  WRITER = 'W', // kann Zeichenfläche bearbeiten, wenn nicht im moderierten Zustand
  READER = 'R', // kann Zeichenfläche lesen
}

/**
 * Typ für die Benutzerdaten.
 */
export type usersType = {
  id: string;
  username: string;
  email: string;
  password: string;
  drawingAreas: {
    id: string;
    permission: string;
  }[];
};

/**
 * Typ für die Benutzerdaten im JWT-Token.
 */
export type userTokenPayloadType = {
  id: string;
  email: string;
  username: string;
  drawingAreas: {
    id: string;
    permission: string;
  }[];
};

/**
 * Typ für die Zeichenflächen-Daten.
 */
export type drawingAreaType = {
  id: string;
  authorizedUsers: {
    userId: string;
    permission: DrawingAreaPermissions;
  }[];
  isModerated: boolean;
  eventsForDrawingArea: eventsForDrawingAreaType[];
};

/**
 * Typ für die WebSocket-Events.
 */
export type customWebSocketEventType =
  | customModerateEventType
  | eventsForDrawingAreaType;

type customModerateEventType = {
  type: 'moderate';
  moderated: boolean;
};

export type eventsForDrawingAreaType =
  | IShapeAdded
  | IShapeRemoved
  | IShapeSelected
  | IShapeUnselected;

enum IShapeEventType {
  'IShapeAdded' = 'IShapeAdded',
  'IShapeRemoved' = 'IShapeRemoved',
  'IShapeSelected' = 'IShapeSelected',
  'IShapeUnselected' = 'IShapeUnselected',
}

interface IShapeEvent {
  readonly type: IShapeEventType;
}

interface IShapeAdded extends IShapeEvent {
  readonly type: IShapeEventType.IShapeAdded;
  readonly iShape: IShape;
}

interface IShapeRemoved extends IShapeEvent {
  readonly type: IShapeEventType.IShapeRemoved;
  readonly id: string;
}

export interface IShapeSelected extends IShapeEvent {
  readonly type: IShapeEventType.IShapeSelected;
  readonly iShape: IShape;
  readonly userId: string;
}

export interface IShapeUnselected extends IShapeEvent {
  readonly type: IShapeEventType.IShapeUnselected;
  readonly id: string;
  readonly userId: string;
}

type IShape = ILine | IRectangle | ICircle | ITriangle;

interface AbstractIShape {
  readonly id: string;
  borderColor: string;
  backgroundColor: string;
  selectColor: string;
  zIndex?: number;
}

interface ILine extends AbstractIShape {
  readonly type: 'Line';
  readonly from: Point2D;
  readonly to: Point2D;
}

interface IRectangle extends AbstractIShape {
  readonly type: 'Rectangle';
  readonly from: Point2D;
  readonly to: Point2D;
}

interface ICircle extends AbstractIShape {
  readonly type: 'Circle';
  readonly center: Point2D;
  readonly radius: number;
}

interface ITriangle extends AbstractIShape {
  readonly type: 'Triangle';
  readonly p1: Point2D;
  readonly p2: Point2D;
  readonly p3: Point2D;
}

class Point2D {
  constructor(
    readonly x: number,
    readonly y: number
  ) {}
}

/**
 * Hilfsfunktion, um die Benutzerdatenbank zu lesen.
 */
export function readUsersFromFile(): usersType[] {
  if (!fs.existsSync(usersFilePath)) {
    return [];
  }
  const data = fs.readFileSync(usersFilePath, 'utf-8');
  return JSON.parse(data);
}

/**
 * Hilfsfunktion, um die Benutzerdatenbank zu schreiben.
 * @param users - die zu schreibenden Benutzer
 */
export function writeUsersToFile(users: usersType[]): void {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

/**
 * Hilfsfunktion, um die DrawingAreas-Datenbank zu lesen.
 */
export function readDrawingAreasFromFile(): drawingAreaType[] {
  if (!fs.existsSync(drawingAreasFilePath)) {
    return [];
  }
  const data = fs.readFileSync(drawingAreasFilePath, 'utf-8');
  return JSON.parse(data);
}

/**
 * Hilfsfunktion, um die DrawingAreas-Datenbank zu schreiben.
 * @param drawingAreas - die zu schreibenden DrawingAreas
 */
export function writeDrawingAreasToFile(drawingAreas: drawingAreaType[]): void {
  fs.writeFileSync(drawingAreasFilePath, JSON.stringify(drawingAreas, null, 2));
}
