"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDrawingAreasToFile = exports.readDrawingAreasFromFile = exports.writeUsersToFile = exports.readUsersFromFile = exports.DrawingAreaPermissions = exports.secretKey = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const usersFilePath = path_1.default.join(__dirname, 'users.json');
const drawingAreasFilePath = path_1.default.join(__dirname, 'drawingAreas.json');
exports.secretKey = 'mertl_secret_key';
/**
 * Enum für die verschiedenen Rechte, die ein Benutzer auf einer Zeichenfläche haben kann.
 */
var DrawingAreaPermissions;
(function (DrawingAreaPermissions) {
    DrawingAreaPermissions["OWNER"] = "O";
    DrawingAreaPermissions["COOWNER"] = "CO";
    DrawingAreaPermissions["MODERATOR"] = "M";
    DrawingAreaPermissions["VIP"] = "V";
    DrawingAreaPermissions["WRITER"] = "W";
    DrawingAreaPermissions["READER"] = "R";
})(DrawingAreaPermissions = exports.DrawingAreaPermissions || (exports.DrawingAreaPermissions = {}));
var IShapeEventType;
(function (IShapeEventType) {
    IShapeEventType["IShapeAdded"] = "IShapeAdded";
    IShapeEventType["IShapeRemoved"] = "IShapeRemoved";
    IShapeEventType["IShapeSelected"] = "IShapeSelected";
    IShapeEventType["IShapeUnselected"] = "IShapeUnselected";
})(IShapeEventType || (IShapeEventType = {}));
class Point2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
/**
 * Hilfsfunktion, um die Benutzerdatenbank zu lesen.
 */
function readUsersFromFile() {
    if (!fs_1.default.existsSync(usersFilePath)) {
        return [];
    }
    const data = fs_1.default.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
}
exports.readUsersFromFile = readUsersFromFile;
/**
 * Hilfsfunktion, um die Benutzerdatenbank zu schreiben.
 * @param users - die zu schreibenden Benutzer
 */
function writeUsersToFile(users) {
    fs_1.default.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}
exports.writeUsersToFile = writeUsersToFile;
/**
 * Hilfsfunktion, um die DrawingAreas-Datenbank zu lesen.
 */
function readDrawingAreasFromFile() {
    if (!fs_1.default.existsSync(drawingAreasFilePath)) {
        return [];
    }
    const data = fs_1.default.readFileSync(drawingAreasFilePath, 'utf-8');
    return JSON.parse(data);
}
exports.readDrawingAreasFromFile = readDrawingAreasFromFile;
/**
 * Hilfsfunktion, um die DrawingAreas-Datenbank zu schreiben.
 * @param drawingAreas - die zu schreibenden DrawingAreas
 */
function writeDrawingAreasToFile(drawingAreas) {
    fs_1.default.writeFileSync(drawingAreasFilePath, JSON.stringify(drawingAreas, null, 2));
}
exports.writeDrawingAreasToFile = writeDrawingAreasToFile;
