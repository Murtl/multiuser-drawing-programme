"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helperUtils_1 = require("./helperUtils");
/**
 * Middleware, die das JWT-Token überprüft.
 * @param req der Request
 * @param res die Response
 * @param next die nächste Funktion
 */
const authenticateJWT = (req, res, next) => {
    const cookies = req.cookies;
    if (cookies) {
        const token = cookies.token;
        jsonwebtoken_1.default.verify(token, helperUtils_1.secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.authenticateJWT = authenticateJWT;
