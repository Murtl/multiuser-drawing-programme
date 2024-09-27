/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/src/router/router.ts":
/*!***************************************!*\
  !*** ./frontend/src/router/router.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Router: () => (/* binding */ Router)
/* harmony export */ });
/* harmony import */ var _views_home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/home */ "./frontend/src/views/home.ts");
/* harmony import */ var _views_login__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../views/login */ "./frontend/src/views/login.ts");
/* harmony import */ var _views_register__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../views/register */ "./frontend/src/views/register.ts");
/* harmony import */ var _views_notFound__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../views/notFound */ "./frontend/src/views/notFound.ts");
/* harmony import */ var _views_drawingArea__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../views/drawingArea */ "./frontend/src/views/drawingArea.ts");
/* harmony import */ var _store_DrawingAreaPreviewElementsStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../store/DrawingAreaPreviewElementsStore */ "./frontend/src/store/DrawingAreaPreviewElementsStore.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






/**
 * Router Klasse, die die Navigation zwischen den verschiedenen Seiten der Anwendung steuert.
 */
var Router = /** @class */ (function () {
    function Router(appElement, authHandler) {
        var _this = this;
        this.drawingAreaPreviewElementsStore = _store_DrawingAreaPreviewElementsStore__WEBPACK_IMPORTED_MODULE_5__.DrawingAreaPreviewElementsStore.getInstance();
        /**
         * Flag, das angibt, ob die Navigation durch den Router oder durch den Benutzer erfolgt.
         */
        this.isProgrammaticNavigation = false;
        this.appElement = appElement;
        this.authHandler = authHandler;
        window.addEventListener('hashchange', function (e) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.stopImmediatePropagation();
                        if (!!this.isProgrammaticNavigation) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.renderPage()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    }
    Router.prototype.registerWebsocket = function (ws) {
        this.ws = ws;
    };
    Router.prototype.closeWebsocket = function () {
        var _a;
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.close();
    };
    Router.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.renderPage()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Router.prototype.navigateTo = function (hash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isProgrammaticNavigation = true;
                        window.location.hash = hash;
                        return [4 /*yield*/, this.renderPage()];
                    case 1:
                        _a.sent();
                        this.isProgrammaticNavigation = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    Router.prototype.renderPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hash, _a, id_1, drawingArea_1, _b, _c, _d, _e, _f, _g, _h;
            var _this = this;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        this.closeWebsocket();
                        hash = window.location.hash || '#/login';
                        if (!hash.startsWith('#/drawing-area/')) return [3 /*break*/, 7];
                        if (!!this.authHandler.isLoggedIn()) return [3 /*break*/, 2];
                        _a = this.appElement;
                        return [4 /*yield*/, _views_login__WEBPACK_IMPORTED_MODULE_1__.LoginPage.render()];
                    case 1:
                        _a.innerHTML = _j.sent();
                        _views_login__WEBPACK_IMPORTED_MODULE_1__.LoginPage.initialize(this, this.authHandler);
                        return [3 /*break*/, 6];
                    case 2:
                        id_1 = hash.split('/')[2];
                        this.drawingAreaPreviewElementsStore
                            .getDrawingAreaPreviewElements()
                            .forEach(function (element) {
                            if (element.getDrawingAreaId() === id_1) {
                                drawingArea_1 = new _views_drawingArea__WEBPACK_IMPORTED_MODULE_4__.DrawingArea(id_1, element.getPermission(), _this.authHandler);
                            }
                        });
                        if (!drawingArea_1) return [3 /*break*/, 5];
                        _b = this.appElement;
                        return [4 /*yield*/, drawingArea_1.render()];
                    case 3:
                        _b.innerHTML = _j.sent();
                        return [4 /*yield*/, drawingArea_1.initialize(this)];
                    case 4:
                        _j.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        this.appElement.innerHTML = _views_notFound__WEBPACK_IMPORTED_MODULE_3__.NotFoundPage.render();
                        _views_notFound__WEBPACK_IMPORTED_MODULE_3__.NotFoundPage.initialize(this, this.authHandler);
                        _j.label = 6;
                    case 6: return [3 /*break*/, 23];
                    case 7:
                        _c = hash;
                        switch (_c) {
                            case '#/login': return [3 /*break*/, 8];
                            case '#/register': return [3 /*break*/, 13];
                            case '#/': return [3 /*break*/, 17];
                        }
                        return [3 /*break*/, 22];
                    case 8:
                        if (!this.authHandler.isLoggedIn()) return [3 /*break*/, 10];
                        _d = this.appElement;
                        return [4 /*yield*/, _views_home__WEBPACK_IMPORTED_MODULE_0__.HomePage.render()];
                    case 9:
                        _d.innerHTML = _j.sent();
                        _views_home__WEBPACK_IMPORTED_MODULE_0__.HomePage.initialize(this, this.authHandler);
                        return [3 /*break*/, 12];
                    case 10:
                        _e = this.appElement;
                        return [4 /*yield*/, _views_login__WEBPACK_IMPORTED_MODULE_1__.LoginPage.render()];
                    case 11:
                        _e.innerHTML = _j.sent();
                        _views_login__WEBPACK_IMPORTED_MODULE_1__.LoginPage.initialize(this, this.authHandler);
                        _j.label = 12;
                    case 12: return [3 /*break*/, 23];
                    case 13:
                        if (!this.authHandler.isLoggedIn()) return [3 /*break*/, 15];
                        _f = this.appElement;
                        return [4 /*yield*/, _views_home__WEBPACK_IMPORTED_MODULE_0__.HomePage.render()];
                    case 14:
                        _f.innerHTML = _j.sent();
                        _views_home__WEBPACK_IMPORTED_MODULE_0__.HomePage.initialize(this, this.authHandler);
                        return [3 /*break*/, 16];
                    case 15:
                        this.appElement.innerHTML = _views_register__WEBPACK_IMPORTED_MODULE_2__.RegisterPage.render();
                        _views_register__WEBPACK_IMPORTED_MODULE_2__.RegisterPage.initialize(this, this.authHandler);
                        _j.label = 16;
                    case 16: return [3 /*break*/, 23];
                    case 17:
                        if (!!this.authHandler.isLoggedIn()) return [3 /*break*/, 19];
                        _g = this.appElement;
                        return [4 /*yield*/, _views_login__WEBPACK_IMPORTED_MODULE_1__.LoginPage.render()];
                    case 18:
                        _g.innerHTML = _j.sent();
                        _views_login__WEBPACK_IMPORTED_MODULE_1__.LoginPage.initialize(this, this.authHandler);
                        return [3 /*break*/, 21];
                    case 19:
                        _h = this.appElement;
                        return [4 /*yield*/, _views_home__WEBPACK_IMPORTED_MODULE_0__.HomePage.render()];
                    case 20:
                        _h.innerHTML = _j.sent();
                        _views_home__WEBPACK_IMPORTED_MODULE_0__.HomePage.initialize(this, this.authHandler);
                        _j.label = 21;
                    case 21: return [3 /*break*/, 23];
                    case 22:
                        this.appElement.innerHTML = _views_notFound__WEBPACK_IMPORTED_MODULE_3__.NotFoundPage.render();
                        _views_notFound__WEBPACK_IMPORTED_MODULE_3__.NotFoundPage.initialize(this, this.authHandler);
                        return [3 /*break*/, 23];
                    case 23: return [2 /*return*/];
                }
            });
        });
    };
    return Router;
}());



/***/ }),

/***/ "./frontend/src/store/DrawingAreaIShapesStore.ts":
/*!*******************************************************!*\
  !*** ./frontend/src/store/DrawingAreaIShapesStore.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DrawingAreaIShapesStore: () => (/* binding */ DrawingAreaIShapesStore)
/* harmony export */ });
/**
 * Eigener Store für die Speicherung der IShapes.
 * Hiermit wird eine zentrale Stelle für die Verwaltung der IShapes geschaffen.
 */
var DrawingAreaIShapesStore = /** @class */ (function () {
    function DrawingAreaIShapesStore() {
        this.iShapes = [];
        this.selectedIShapes = [];
    }
    /**
     * Anwendung des Singleton-Patterns, um nur eine Instanz des Stores zu erzeugen.
     */
    DrawingAreaIShapesStore.getInstance = function () {
        if (!DrawingAreaIShapesStore.instance) {
            DrawingAreaIShapesStore.instance = new DrawingAreaIShapesStore();
        }
        return DrawingAreaIShapesStore.instance;
    };
    DrawingAreaIShapesStore.prototype.setIShapes = function (iShapes) {
        this.iShapes = iShapes;
    };
    DrawingAreaIShapesStore.prototype.getIShapes = function () {
        return this.iShapes;
    };
    DrawingAreaIShapesStore.prototype.addIShape = function (iShape) {
        this.iShapes.push(iShape);
    };
    DrawingAreaIShapesStore.prototype.addIShapeAtIndex = function (iShape, index) {
        this.iShapes.splice(index, 0, iShape);
    };
    DrawingAreaIShapesStore.prototype.removeIShape = function (id) {
        this.iShapes = this.iShapes.filter(function (s) { return s.id !== id; });
    };
    DrawingAreaIShapesStore.prototype.setSelectedIShapes = function (iShapes) {
        this.selectedIShapes = iShapes;
    };
    DrawingAreaIShapesStore.prototype.getSelectedIShapes = function (userId) {
        if (userId === 'all') {
            return this.selectedIShapes.map(function (s) { return s.iShape; });
        }
        return this.selectedIShapes
            .filter(function (s) { return s.eventUserId === userId; })
            .map(function (s) { return s.iShape; });
    };
    DrawingAreaIShapesStore.prototype.addSelectedIShape = function (iShape, eventUserId) {
        this.selectedIShapes.push({ iShape: iShape, eventUserId: eventUserId });
    };
    DrawingAreaIShapesStore.prototype.removeSelectedIShape = function (id) {
        this.selectedIShapes = this.selectedIShapes.filter(function (s) { return s.iShape.id !== id; });
    };
    return DrawingAreaIShapesStore;
}());



/***/ }),

/***/ "./frontend/src/store/DrawingAreaPreviewElementsStore.ts":
/*!***************************************************************!*\
  !*** ./frontend/src/store/DrawingAreaPreviewElementsStore.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DrawingAreaPreviewElementsStore: () => (/* binding */ DrawingAreaPreviewElementsStore)
/* harmony export */ });
/* harmony import */ var _utils_classes_DrawingAreaPreview__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/classes/DrawingAreaPreview */ "./frontend/src/utils/classes/DrawingAreaPreview.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

/**
 * Eigener Store für die Vorschau-Elemente der Zeichenflächen, die auf der Übersichtsseite gerendert werden.
 */
var DrawingAreaPreviewElementsStore = /** @class */ (function () {
    function DrawingAreaPreviewElementsStore() {
        this.drawingAreaPreviewElements = [];
        this.identifier = 0;
    }
    /**
     * Anwendung des Singleton-Patterns, um nur eine Instanz des Stores zu erzeugen.
     */
    DrawingAreaPreviewElementsStore.getInstance = function () {
        if (!DrawingAreaPreviewElementsStore.instance) {
            DrawingAreaPreviewElementsStore.instance =
                new DrawingAreaPreviewElementsStore();
        }
        return DrawingAreaPreviewElementsStore.instance;
    };
    /**
     * Erstellung der Vorschau-Elemente für die Zeichenflächen auf Basis der Informationen, die aus dem Cookie stammen.
     * @param drawingAreas - Informationen über die Zeichenflächen, die in Vorschauelemente umgewandelt werden sollen
     */
    DrawingAreaPreviewElementsStore.prototype.createDrawingAreaPreviewElements = function (drawingAreas) {
        var _this = this;
        this.drawingAreaPreviewElements = [];
        this.identifier = 0;
        drawingAreas.forEach(function (drawingArea) {
            _this.drawingAreaPreviewElements.push(new _utils_classes_DrawingAreaPreview__WEBPACK_IMPORTED_MODULE_0__.DrawingAreaPreview(_this.identifier++, drawingArea.permission, drawingArea.id));
        });
    };
    /**
     * Setzen der Vorschau-Elemente für die Zeichenflächen.
     * @param drawingAreaPreviewElements - Vorschau-Elemente der Zeichenflächen
     */
    DrawingAreaPreviewElementsStore.prototype.setDrawingAreaPreviewElements = function (drawingAreaPreviewElements) {
        this.drawingAreaPreviewElements = drawingAreaPreviewElements;
    };
    /**
     * Rückgabe der Vorschau-Elemente für die Zeichenflächen.
     */
    DrawingAreaPreviewElementsStore.prototype.getDrawingAreaPreviewElements = function () {
        return this.drawingAreaPreviewElements;
    };
    /**
     * Methode zum Hinzufügen eines neuen Vorschau-Elements einer Zeichenfläche auf dem Server.
     */
    DrawingAreaPreviewElementsStore.prototype.addDrawingAreaPreviewElements = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, errorData, data, drawingAreaPreview, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, fetch('/api/drawingArea/createNewDrawingArea', {
                                method: 'POST',
                                credentials: 'include',
                            })];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        errorData = _a.sent();
                        throw new Error("Zeichenfl\u00E4che konnte nicht erstellt werden: ".concat(errorData.message));
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        data = _a.sent();
                        drawingAreaPreview = new _utils_classes_DrawingAreaPreview__WEBPACK_IMPORTED_MODULE_0__.DrawingAreaPreview(this.identifier++, 'O', data.drawingAreaId);
                        this.drawingAreaPreviewElements.push(drawingAreaPreview);
                        return [2 /*return*/, drawingAreaPreview];
                    case 5:
                        e_1 = _a.sent();
                        throw new Error("".concat(e_1));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Methode zum Entfernen eines Vorschau-Elements einer Zeichenfläche auf dem Server.
     * @param drawingAreaPreview - Vorschau-Element der Zeichenfläche, die entfernt werden soll
     */
    DrawingAreaPreviewElementsStore.prototype.removeDrawingAreaPreviewElement = function (drawingAreaPreview) {
        return __awaiter(this, void 0, void 0, function () {
            var response, errorData, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, fetch('/api/drawingArea/deleteDrawingArea', {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                credentials: 'include',
                                body: JSON.stringify({
                                    drawingAreaId: drawingAreaPreview.getDrawingAreaId(),
                                }),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        errorData = _a.sent();
                        throw new Error("Zeichenfl\u00E4che konnte nicht gel\u00F6scht werden: ".concat(errorData.message));
                    case 3:
                        this.drawingAreaPreviewElements = this.drawingAreaPreviewElements.filter(function (dap) { return dap !== drawingAreaPreview; });
                        return [3 /*break*/, 5];
                    case 4:
                        e_2 = _a.sent();
                        throw new Error("".concat(e_2));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return DrawingAreaPreviewElementsStore;
}());



/***/ }),

/***/ "./frontend/src/utils/classes/AuthHandler.ts":
/*!***************************************************!*\
  !*** ./frontend/src/utils/classes/AuthHandler.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthHandler: () => (/* binding */ AuthHandler)
/* harmony export */ });
/* harmony import */ var _IdFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IdFactory */ "./frontend/src/utils/classes/IdFactory.ts");
/* harmony import */ var _store_DrawingAreaPreviewElementsStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store/DrawingAreaPreviewElementsStore */ "./frontend/src/store/DrawingAreaPreviewElementsStore.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


/**
 * Klasse, die die Authentifizierung des Benutzers steuert und alle damit verbundenen Elemente.
 */
var AuthHandler = /** @class */ (function () {
    function AuthHandler() {
        this.email = '';
        this.username = '';
        this.userId = '';
        this.drawingAreaPreviewElementsStore = _store_DrawingAreaPreviewElementsStore__WEBPACK_IMPORTED_MODULE_1__.DrawingAreaPreviewElementsStore.getInstance();
    }
    /**
     * Methode zum Initialisieren des AuthHandlers.
     * Überprüft, ob ein Benutzer eingeloggt ist und holt die Benutzerinformationen.
     */
    AuthHandler.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkAuth()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Methode zum Überprüfen, ob ein Cookie vorhanden ist und der Benutzer automatisch eingeloggt werden kann.
     */
    AuthHandler.prototype.checkAuth = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch('/api/auth/checkAuth', {
                                method: 'GET',
                                credentials: 'include',
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            return [2 /*return*/, { success: false, message: 'Error' }];
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        this.email = data.user.email;
                        this.username = data.user.username;
                        this.userId = data.user.id;
                        this.drawingAreaPreviewElementsStore.createDrawingAreaPreviewElements(data.user.drawingAreas);
                        _IdFactory__WEBPACK_IMPORTED_MODULE_0__.IDFactory.setPrefix(this.userId);
                        /**
                         * Ausgabe der dekodierten Informationen des Users zur Erfüllung der Aufgabe 4.3.
                         */
                        console.log(data.user);
                        return [2 /*return*/, { success: true, message: 'Success' }];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, { success: false, message: "".concat(e_1) }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Methode zum Einloggen eines Benutzers.
     * @param username - Benutzername
     * @param email - E-Mail-Adresse
     * @param password - Passwort
     */
    AuthHandler.prototype.login = function (username, email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var response, errorData, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, fetch('/api/auth/login', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ username: username, email: email, password: password }),
                                credentials: 'include',
                            })];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        errorData = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                message: "Login fehlgeschlagen wegen: ".concat(errorData.message),
                            }];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        data = _a.sent();
                        this.email = data.user.email;
                        this.username = data.user.username;
                        this.userId = data.user.id;
                        this.drawingAreaPreviewElementsStore.createDrawingAreaPreviewElements(data.user.drawingAreas);
                        _IdFactory__WEBPACK_IMPORTED_MODULE_0__.IDFactory.setPrefix(this.userId);
                        /**
                         * Ausgabe der dekodierten Informationen des Users zur Erfüllung der Aufgabe 4.3.
                         */
                        console.log(data.user);
                        return [2 /*return*/, { success: true, message: data.message }];
                    case 5:
                        error_1 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                message: "Login fehlgeschlagen wegen: ".concat(error_1),
                            }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Methode zum Registrieren eines Benutzers.
     * @param username - Benutzername
     * @param email - E-Mail-Adresse
     * @param password - Passwort
     */
    AuthHandler.prototype.register = function (username, email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var response, errorData, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, fetch('/api/auth/register', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ username: username, email: email, password: password }),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        errorData = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                message: "Registrierung fehlgeschlagen wegen: ".concat(errorData.message),
                            }];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        data = _a.sent();
                        return [2 /*return*/, { success: true, message: data.message }];
                    case 5:
                        error_2 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                message: "Registrierung fehlgeschlagen wegen: ".concat(error_2),
                            }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Methode zum Ausloggen eines Benutzers.
     */
    AuthHandler.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetch('/api/auth/logout', {
                                method: 'POST',
                                credentials: 'include',
                            })];
                    case 1:
                        _a.sent();
                        this.username = '';
                        this.userId = '';
                        this.email = '';
                        this.drawingAreaPreviewElementsStore.setDrawingAreaPreviewElements([]);
                        return [2 /*return*/, { success: true, message: 'Logout erfolgreich.' }];
                    case 2:
                        e_2 = _a.sent();
                        return [2 /*return*/, { success: false, message: "".concat(e_2) }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Methode, die überprüft, ob ein Benutzer eingeloggt ist.
     */
    AuthHandler.prototype.isLoggedIn = function () {
        return this.email !== '' && this.userId !== '' && this.username !== '';
    };
    /**
     * Methode zum Abrufen der E-Mail-Adresse des Benutzers.
     */
    AuthHandler.prototype.getEMail = function () {
        return this.email;
    };
    /**
     * Methode zum Abrufen der Benutzer-ID.
     */
    AuthHandler.prototype.getUserId = function () {
        return this.userId;
    };
    /**
     * Methode zum Abrufen des Benutzernamens.
     */
    AuthHandler.prototype.getUsername = function () {
        return this.username;
    };
    /**
     * Methode zum Aktualisieren des Passworts eines Benutzers.
     * @param oldPassword - Altes Passwort
     * @param newPassword - Neues Passwort
     */
    AuthHandler.prototype.updatePassword = function (oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var response, errorData, data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, fetch('/api/auth/updatePassword', {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword }),
                                credentials: 'include',
                            })];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        errorData = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                message: "Passwortaktualisierung fehlgeschlagen wegen: ".concat(errorData.message),
                            }];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        data = _a.sent();
                        return [2 /*return*/, { success: true, message: data.message }];
                    case 5:
                        error_3 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                message: "Passwortaktualisierung fehlgeschlagen wegen: ".concat(error_3),
                            }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Methode zum Aktualisieren des Benutzernamens.
     * @param newUsername - Neuer Benutzername
     */
    AuthHandler.prototype.updateUsername = function (newUsername) {
        return __awaiter(this, void 0, void 0, function () {
            var response, errorData, data, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, fetch('/api/auth/updateUsername', {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ newUsername: newUsername }),
                                credentials: 'include',
                            })];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        errorData = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                message: "Benutzernamen-Aktualisierung fehlgeschlagen wegen: ".concat(errorData.message),
                            }];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        data = _a.sent();
                        this.username = newUsername;
                        return [2 /*return*/, { success: true, message: data.message }];
                    case 5:
                        error_4 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                message: "Benutzernamen-Aktualisierung fehlgeschlagen wegen: ".concat(error_4),
                            }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Methode zum Aktualisieren der E-Mail-Adresse.
     * @param newEmail - Neue E-Mail-Adresse
     */
    AuthHandler.prototype.updateEmail = function (newEmail) {
        return __awaiter(this, void 0, void 0, function () {
            var response, errorData, data, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, fetch('/api/auth/updateEmail', {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ newEmail: newEmail }),
                                credentials: 'include',
                            })];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        errorData = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                message: "E-Mail-Aktualisierung fehlgeschlagen wegen: ".concat(errorData.message),
                            }];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        data = _a.sent();
                        this.email = newEmail;
                        return [2 /*return*/, { success: true, message: data.message }];
                    case 5:
                        error_5 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                message: "E-Mail-Aktualisierung fehlgeschlagen wegen: ".concat(error_5),
                            }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Methode zum Aktualisieren der Vorschau-Elemente der Zeichenbereiche.
     * Wird man z.B. zu einer Zeichenfläche hinzugefügt oder entfernt, kriegt das die Übersichtsseite nicht direkt mit.
     * Mit dieser Methode kann man seine aktuellen Zeichenflächen aktualisieren.
     * Hier wäre auch ein automatisierter Prozess denkbar, der die Zeichenflächen regelmäßig aktualisiert.
     * Für diesen Fall habe ich einfach einen Button gebaut, der die Zeichenfläche jederzeit aktualisieren kann.
     */
    AuthHandler.prototype.refreshDrawingAreas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, errorData, data, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, fetch('/api/drawingArea/refreshDrawingAreas', {
                                method: 'GET',
                                credentials: 'include',
                            })];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        errorData = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                message: "Aktualisierung der Zeichenbereiche fehlgeschlagen wegen: ".concat(errorData.message),
                            }];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        data = _a.sent();
                        this.drawingAreaPreviewElementsStore.createDrawingAreaPreviewElements(data.drawingAreas);
                        return [2 /*return*/, { success: true, message: data.message }];
                    case 5:
                        e_3 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                message: "".concat(e_3),
                            }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return AuthHandler;
}());



/***/ }),

/***/ "./frontend/src/utils/classes/Canvas.ts":
/*!**********************************************!*\
  !*** ./frontend/src/utils/classes/Canvas.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Canvas: () => (/* binding */ Canvas)
/* harmony export */ });
/* harmony import */ var _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../interfaces-types/customShapeEvents */ "./frontend/src/utils/interfaces-types/customShapeEvents.ts");
/* harmony import */ var _functions_shapeConversionFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../functions/shapeConversionFunctions */ "./frontend/src/utils/functions/shapeConversionFunctions.ts");
/* harmony import */ var _store_DrawingAreaIShapesStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/DrawingAreaIShapesStore */ "./frontend/src/store/DrawingAreaIShapesStore.ts");



/**
 * Klasse für die Zeichenfläche, die die Shapes zeichnet und Events auf die Shapes anwendet.
 */
var Canvas = /** @class */ (function () {
    function Canvas(canvasDomElement, toolarea, userId) {
        this.userId = userId;
        this.iShapesStore = _store_DrawingAreaIShapesStore__WEBPACK_IMPORTED_MODULE_2__.DrawingAreaIShapesStore.getInstance();
        var _a = canvasDomElement.getBoundingClientRect(), width = _a.width, height = _a.height;
        this.width = width;
        this.height = height;
        this.ctx = canvasDomElement.getContext('2d');
        canvasDomElement.addEventListener('mousemove', createMouseHandler('handleMouseMove'));
        canvasDomElement.addEventListener('mousedown', createMouseHandler('handleMouseDown'));
        canvasDomElement.addEventListener('mouseup', createMouseHandler('handleMouseUp'));
        canvasDomElement.addEventListener('contextmenu', createMouseHandler('handleContextMenu'));
        canvasDomElement.addEventListener('click', createMouseHandler('handleMouseClick'));
        function createMouseHandler(methodName) {
            return function (e) {
                if ('object' === typeof e) {
                    var x = e.pageX - canvasDomElement.offsetLeft, y = e.pageY - canvasDomElement.offsetTop, ss = toolarea.getSelectedShape();
                    // Wenn die linke Maustaste gedrückt wird und ein Tool ausgewählt ist, wird eine Aktion ausgeführt
                    if ((e.button === 0 && ss) || (e.button === 2 && ss)) {
                        e.preventDefault();
                        // @ts-ignore
                        var m = ss[methodName];
                        if (m !== undefined) {
                            // wenn die rechte Maustaste gedrückt wird, wird das Kontextmenü geöffnet mit der exakten Mausposition
                            if (e.button === 2 && methodName === 'handleContextMenu') {
                                m.call(ss, e.x, e.y);
                            }
                            else {
                                if (e.button === 2) {
                                    return;
                                }
                                m.call(ss, x, y);
                            }
                        }
                    }
                }
            };
        }
    }
    /**
     * Wendet die Events auf die Zeichenfläche an.
     * @param events - Die Events, die angewendet werden sollen
     */
    Canvas.prototype.applyEvents = function (events) {
        var _this = this;
        events.forEach(function (e) {
            if (e.type === _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeEventType.IShapeAdded) {
                var eAdd = e;
                _this.addIShape(eAdd.iShape);
            }
            else if (e.type === _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeEventType.IShapeRemoved) {
                var eRemoved = e;
                _this.removeIShapeWithId(eRemoved.id);
            }
            else if (e.type === _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeEventType.IShapeSelected) {
                var eSelect = e;
                _this.selectIShape(eSelect.iShape, eSelect.userId);
            }
            else if (e.type === _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeEventType.IShapeUnselected) {
                var eUnselectShape = e;
                _this.unselectIShape(eUnselectShape.id);
            }
        });
        /**
         * Nachdem die Events angewendet wurden, wird das Canvas neu gezeichnet.
         */
        return this.draw();
    };
    Canvas.prototype.draw = function () {
        var _this = this;
        this.ctx.beginPath();
        this.ctx.fillStyle = 'lightgrey';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.stroke();
        this.ctx.fillStyle = 'black';
        var iShapes = this.iShapesStore.getIShapes();
        /**
         * Sortiert die Shapes nach ihrem Z-Index, um die Reihenfolge zu bestimmen, in der sie gezeichnet werden.
         */
        iShapes.sort(function (a, b) { return a.zIndex - b.zIndex; });
        /**
         * Zeichnet alle Shapes
         */
        iShapes.forEach(function (s) { return (0,_functions_shapeConversionFunctions__WEBPACK_IMPORTED_MODULE_1__.iShapeToShape)(s).draw(_this.ctx, false); });
        /**
         * Zeichnet alle selektierten Shapes.
         * Besonders ist hier, dass die Selektion über die Shapes gezeichnet wird.
         * Somit ist diese immer sichtbar und wird zu keinem Zeitpunkt verdeckt.
         */
        var selectedShapes = this.iShapesStore.getSelectedIShapes('all');
        selectedShapes.forEach(function (s) { return (0,_functions_shapeConversionFunctions__WEBPACK_IMPORTED_MODULE_1__.iShapeToShape)(s).draw(_this.ctx, true); });
        return this;
    };
    /**
     * Fügt eine IShape dem Store hinzu.
     * @param iShape - Die Shape, die hinzugefügt werden soll
     */
    Canvas.prototype.addIShape = function (iShape) {
        var index = this.iShapesStore
            .getIShapes()
            .findIndex(function (s) { return s.id === iShape.id; });
        if (index === -1) {
            this.iShapesStore.addIShape(iShape);
        }
        return this;
    };
    /**
     * Entfernt eine IShape mit einer bestimmten ID aus dem Store.
     * @param id - Die ID der Shape, die entfernt werden soll
     * */
    Canvas.prototype.removeIShapeWithId = function (id) {
        this.iShapesStore.removeIShape(id);
        this.iShapesStore.removeSelectedIShape(id);
        return this;
    };
    /**
     * Fügt eine selektierte IShape dem Store hinzu.
     * @param iShape - Die Shape, die selektiert werden soll
     * @param eventUserId - Die ID des Users, der die Shape selektiert hat
     */
    Canvas.prototype.selectIShape = function (iShape, eventUserId) {
        var index = this.iShapesStore
            .getSelectedIShapes('all')
            .findIndex(function (s) { return s.id === iShape.id; });
        if (index === -1) {
            this.iShapesStore.addSelectedIShape(iShape, eventUserId);
        }
        return this;
    };
    /**
     * Entfernt eine selektierte IShape aus dem Store.
     * @param id - Die ID der Shape, die deselektiert werden soll
     */
    Canvas.prototype.unselectIShape = function (id) {
        this.iShapesStore.removeSelectedIShape(id);
        return this;
    };
    return Canvas;
}());



/***/ }),

/***/ "./frontend/src/utils/classes/CustomIShapeManager.ts":
/*!***********************************************************!*\
  !*** ./frontend/src/utils/classes/CustomIShapeManager.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomIShapeManager: () => (/* binding */ CustomIShapeManager)
/* harmony export */ });
/* harmony import */ var _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../interfaces-types/customShapeEvents */ "./frontend/src/utils/interfaces-types/customShapeEvents.ts");
/* harmony import */ var _store_DrawingAreaIShapesStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store/DrawingAreaIShapesStore */ "./frontend/src/store/DrawingAreaIShapesStore.ts");
/* harmony import */ var _SelectColorFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SelectColorFactory */ "./frontend/src/utils/classes/SelectColorFactory.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



/**
 * Ein CustomShapeManager, der die IShapes verwaltet.
 */
var CustomIShapeManager = /** @class */ (function () {
    /**
     * Konstruktor
     * @param eventFan - Der EventFan
     * @param ws - Der WebSocket für die Kommunikation mit dem Backend
     * @param userId - Die ID des Benutzers
     */
    function CustomIShapeManager(eventFan, ws, userId) {
        this.eventFan = eventFan;
        this.ws = ws;
        this.userId = userId;
        this.iShapeStore = _store_DrawingAreaIShapesStore__WEBPACK_IMPORTED_MODULE_1__.DrawingAreaIShapesStore.getInstance();
    }
    /**
     * Sendet ein neues ShapeEvent an den WebSocket.
     * @param shapeEvent - Das ShapeEvent, das gesendet werden soll.
     * Die Antwort des Servers wird in der 'drawingArea.ts' verarbeitet und an den EventFan weitergeleitet.
     */
    CustomIShapeManager.prototype.postNewShapeEvent = function (shapeEvent) {
        this.ws.send(JSON.stringify(shapeEvent));
    };
    /**
     * Erstellt ein neues IShapeAdded-Event und sendet es an den WebSocket oder fügt es direkt dem EventFan hinzu.
     * @param iShape - Die IShape, die hinzugefügt werden soll.
     * @param postToServer - Soll das IShapeEvent direkt an den WebSocket gesendet werden?
     */
    CustomIShapeManager.prototype.addIShape = function (iShape, postToServer) {
        return __awaiter(this, void 0, void 0, function () {
            var iShapes, shapeEvent;
            return __generator(this, function (_a) {
                iShapes = this.iShapeStore.getIShapes();
                /**
                 * Wenn es keine Shapes gibt, dann ist der zIndex 0
                 * Ansonsten ist der zIndex die letzte Shape + 1
                 */
                if (iShapes.length === 0) {
                    iShape.zIndex = 0;
                }
                else if (iShape.zIndex === undefined) {
                    iShape.zIndex = iShapes[iShapes.length - 1].zIndex + 1;
                }
                shapeEvent = new _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeAdded(iShape);
                if (postToServer) {
                    this.postNewShapeEvent(shapeEvent);
                }
                else {
                    this.eventFan.applyEvents([shapeEvent]);
                }
                return [2 /*return*/, this];
            });
        });
    };
    /**
     * Bewegt eine IShape und wirft ein IShapeRemoved und ein IShapeAdded Event, welche direkt dem EventFan hinzugefügt oder an den WebSocket gesendet werden.
     * @param oldIShape - Die alte IShape
     * @param newIShape - Die neue IShape
     * @param postToServer - Sollen die IShapeEvents direkt an den WebSocket gesendet werden?
     */
    CustomIShapeManager.prototype.moveIShape = function (oldIShape, newIShape, postToServer) {
        return __awaiter(this, void 0, void 0, function () {
            var indexSelected, iShapeUnselectedEvent, iShapeRemovedEvent, iShapeAddedEvent, iShapeSelectedEvent;
            return __generator(this, function (_a) {
                indexSelected = this.iShapeStore
                    .getSelectedIShapes(this.userId)
                    .findIndex(function (s) { return s.id === oldIShape.id; });
                if (indexSelected !== -1) {
                    iShapeUnselectedEvent = new _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeUnselected(oldIShape.id, this.userId);
                    iShapeRemovedEvent = new _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeRemoved(oldIShape.id);
                    iShapeAddedEvent = new _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeAdded(newIShape);
                    iShapeSelectedEvent = new _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeSelected(newIShape, this.userId);
                    if (postToServer) {
                        this.postNewShapeEvent(iShapeUnselectedEvent);
                        this.postNewShapeEvent(iShapeRemovedEvent);
                        this.postNewShapeEvent(iShapeAddedEvent);
                        this.postNewShapeEvent(iShapeSelectedEvent);
                    }
                    else {
                        this.eventFan.applyEvents([
                            iShapeUnselectedEvent,
                            iShapeRemovedEvent,
                            iShapeAddedEvent,
                            iShapeSelectedEvent,
                        ]);
                    }
                }
                return [2 /*return*/, this];
            });
        });
    };
    /**
     * Erstellt ein neues IShapeRemoved-Event und sendet es an den WebSocket oder fügt es direkt dem EventFan hinzu.
     * @param id - Die ID der IShape, die entfernt werden soll
     * @param postToServer - Soll das IShapeEvent direkt an den WebSocket gesendet werden?
     */
    CustomIShapeManager.prototype.removeIShapeWithId = function (id, postToServer) {
        return __awaiter(this, void 0, void 0, function () {
            var index, indexSelected, shapeEvent_1, shapeEvent;
            return __generator(this, function (_a) {
                index = this.iShapeStore.getIShapes().findIndex(function (s) { return s.id === id; });
                if (index !== -1) {
                    indexSelected = this.iShapeStore
                        .getSelectedIShapes(this.userId)
                        .findIndex(function (s) { return s.id === id; });
                    if (indexSelected !== -1) {
                        shapeEvent_1 = new _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeUnselected(id, this.userId);
                        if (postToServer) {
                            this.postNewShapeEvent(shapeEvent_1);
                        }
                        else {
                            this.eventFan.applyEvents([shapeEvent_1]);
                        }
                    }
                    shapeEvent = new _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeRemoved(id);
                    this.eventFan.applyEvents([shapeEvent]);
                    if (postToServer) {
                        this.postNewShapeEvent(shapeEvent);
                    }
                    else {
                        this.eventFan.applyEvents([shapeEvent]);
                    }
                }
                return [2 /*return*/, this];
            });
        });
    };
    /**
     * Erstellt ein neues IShapeSelected-Event und sendet es an den WebSocket oder fügt es direkt dem EventFan hinzu.
     * @param iShape - Die IShape, die selektiert werden soll
     * @param postToServer - Soll das IShapeEvent direkt an den WebSocket gesendet werden?
     */
    CustomIShapeManager.prototype.selectIShape = function (iShape, postToServer) {
        return __awaiter(this, void 0, void 0, function () {
            var shapeEvent;
            return __generator(this, function (_a) {
                shapeEvent = new _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeSelected(__assign(__assign({}, iShape), { selectColor: _SelectColorFactory__WEBPACK_IMPORTED_MODULE_2__.SelectColorFactory.getSelectColor() }), this.userId);
                if (postToServer) {
                    this.postNewShapeEvent(shapeEvent);
                }
                else {
                    this.eventFan.applyEvents([shapeEvent]);
                }
                return [2 /*return*/, this];
            });
        });
    };
    /**
     * Erstellt ein neues IShapeUnselected-Event und sendet es an den WebSocket oder fügt es direkt dem EventFan hinzu.
     * @param id - Die ID der IShape, die deselektiert werden soll
     * @param postToServer - Soll das IShapeEvent direkt an den WebSocket gesendet werden?
     */
    CustomIShapeManager.prototype.unselectIShape = function (id, postToServer) {
        return __awaiter(this, void 0, void 0, function () {
            var index, shapeEvent;
            return __generator(this, function (_a) {
                index = this.iShapeStore
                    .getSelectedIShapes(this.userId)
                    .findIndex(function (s) { return s.id === id; });
                if (index !== -1) {
                    shapeEvent = new _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeUnselected(id, this.userId);
                    if (postToServer) {
                        this.postNewShapeEvent(shapeEvent);
                    }
                    else {
                        this.eventFan.applyEvents([shapeEvent]);
                    }
                }
                return [2 /*return*/, this];
            });
        });
    };
    /**
     * Erstellt ein neues IShapeRemoved, IShapeAdded, IShapeUnselected und IShapeSelected Event und sendet es an den WebSocket oder fügt es direkt dem EventFan hinzu.
     * @param iShape - Die IShape, deren Hintergrundfarbe geändert werden soll
     * @param color - Die neue Hintergrundfarbe
     */
    CustomIShapeManager.prototype.setBackgroundColor = function (iShape, color) {
        return __awaiter(this, void 0, void 0, function () {
            var indexSelected, oldIShape, newIShape, iShapeUnselectedEvent, iShapeRemovedEvent, iShapeAddedEvent, iShapeSelectedEvent;
            return __generator(this, function (_a) {
                indexSelected = this.iShapeStore
                    .getSelectedIShapes(this.userId)
                    .findIndex(function (s) { return s.id === iShape.id; });
                if (indexSelected !== -1) {
                    oldIShape = this.iShapeStore.getSelectedIShapes(this.userId)[indexSelected];
                    newIShape = __assign(__assign({}, oldIShape), { backgroundColor: color });
                    iShapeUnselectedEvent = new _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeUnselected(oldIShape.id, this.userId);
                    iShapeRemovedEvent = new _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeRemoved(oldIShape.id);
                    iShapeAddedEvent = new _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeAdded(newIShape);
                    iShapeSelectedEvent = new _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeSelected(newIShape, this.userId);
                    this.postNewShapeEvent(iShapeUnselectedEvent);
                    this.postNewShapeEvent(iShapeRemovedEvent);
                    this.postNewShapeEvent(iShapeAddedEvent);
                    this.postNewShapeEvent(iShapeSelectedEvent);
                }
                return [2 /*return*/, this];
            });
        });
    };
    /**
     * Erstellt ein neues IShapeRemoved, IShapeAdded, IShapeUnselected und IShapeSelected Event und sendet es an den WebSocket oder fügt es direkt dem EventFan hinzu.
     * @param iShape - Die IShape, deren Rahmenfarbe geändert werden soll
     * @param color - Die neue Rahmenfarbe
     */
    CustomIShapeManager.prototype.setBorderColor = function (iShape, color) {
        return __awaiter(this, void 0, void 0, function () {
            var indexSelected, oldIShape, newIShape, iShapeUnselectedEvent, iShapeRemovedEvent, iShapeAddedEvent, iShapeSelectedEvent;
            return __generator(this, function (_a) {
                indexSelected = this.iShapeStore
                    .getSelectedIShapes(this.userId)
                    .findIndex(function (s) { return s.id === iShape.id; });
                if (indexSelected !== -1) {
                    oldIShape = this.iShapeStore.getSelectedIShapes(this.userId)[indexSelected];
                    newIShape = __assign(__assign({}, oldIShape), { borderColor: color });
                    iShapeUnselectedEvent = new _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeUnselected(oldIShape.id, this.userId);
                    iShapeRemovedEvent = new _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeRemoved(oldIShape.id);
                    iShapeAddedEvent = new _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeAdded(newIShape);
                    iShapeSelectedEvent = new _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeSelected(newIShape, this.userId);
                    this.postNewShapeEvent(iShapeUnselectedEvent);
                    this.postNewShapeEvent(iShapeRemovedEvent);
                    this.postNewShapeEvent(iShapeAddedEvent);
                    this.postNewShapeEvent(iShapeSelectedEvent);
                }
                return [2 /*return*/, this];
            });
        });
    };
    /**
     * Erstellt ein neues IShapeRemoved, IShapeAdded, IShapeUnselected und IShapeSelected Event und sendet es an den WebSocket oder fügt es direkt dem EventFan hinzu.
     * @param iShape - Die IShape, deren zIndex geändert werden soll
     * @param zIndex - Der neue zIndex
     */
    CustomIShapeManager.prototype.setZIndex = function (iShape, zIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var iShapes, indexSelected, oldIShape, newIShape, iShapeUnselectedEvent, iShapeRemovedEvent, iShapeAddedEvent, iShapeSelectedEvent;
            return __generator(this, function (_a) {
                iShapes = this.iShapeStore.getIShapes();
                indexSelected = this.iShapeStore
                    .getSelectedIShapes(this.userId)
                    .findIndex(function (s) { return s.id === iShape.id; });
                if (indexSelected !== -1) {
                    oldIShape = this.iShapeStore.getSelectedIShapes(this.userId)[indexSelected];
                    newIShape = void 0;
                    if (zIndex === 'start') {
                        newIShape = __assign(__assign({}, oldIShape), { zIndex: iShapes[0].zIndex - 1 });
                    }
                    else if (zIndex === 'end') {
                        newIShape = __assign(__assign({}, oldIShape), { zIndex: iShapes[iShapes.length - 1].zIndex + 1 });
                    }
                    else {
                        newIShape = __assign(__assign({}, oldIShape), { zIndex: zIndex });
                    }
                    iShapeUnselectedEvent = new _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeUnselected(oldIShape.id, this.userId);
                    iShapeRemovedEvent = new _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeRemoved(oldIShape.id);
                    iShapeAddedEvent = new _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeAdded(newIShape);
                    iShapeSelectedEvent = new _interfaces_types_customShapeEvents__WEBPACK_IMPORTED_MODULE_0__.IShapeSelected(newIShape, this.userId);
                    this.postNewShapeEvent(iShapeUnselectedEvent);
                    this.postNewShapeEvent(iShapeRemovedEvent);
                    this.postNewShapeEvent(iShapeAddedEvent);
                    this.postNewShapeEvent(iShapeSelectedEvent);
                }
                return [2 /*return*/, this];
            });
        });
    };
    return CustomIShapeManager;
}());



/***/ }),

/***/ "./frontend/src/utils/classes/DrawingAreaPreview.ts":
/*!**********************************************************!*\
  !*** ./frontend/src/utils/classes/DrawingAreaPreview.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DrawingAreaPreview: () => (/* binding */ DrawingAreaPreview)
/* harmony export */ });
/* harmony import */ var _interfaces_types_typesPermissions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../interfaces-types/typesPermissions */ "./frontend/src/utils/interfaces-types/typesPermissions.ts");
/* harmony import */ var _functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../functions/showCustomMessageModal */ "./frontend/src/utils/functions/showCustomMessageModal.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


/**
 * Klasse für die Vorschau-Elemente der Zeichenflächen, die auf der Übersichtsseite gerendert werden.
 */
var DrawingAreaPreview = /** @class */ (function () {
    function DrawingAreaPreview(identifier, permission, drawingAreaId) {
        this.identifier = identifier;
        this.permission = permission;
        this.drawingAreaId = drawingAreaId;
    }
    /**
     * Gibt die ID der Zeichenfläche zurück.
     */
    DrawingAreaPreview.prototype.getDrawingAreaId = function () {
        return this.drawingAreaId;
    };
    /**
     * Gibt die Rechte des Benutzers auf der Zeichenfläche zurück.
     */
    DrawingAreaPreview.prototype.getPermission = function () {
        return this.permission;
    };
    /**
     * Rendert das Vorschau-Element der Zeichenfläche.
     */
    DrawingAreaPreview.prototype.render = function () {
        var subContainer = document.createElement('div');
        subContainer.classList.add('sub-container-preview-drawing-area-element');
        var createButton = document.createElement('button');
        createButton.classList.add('custom-button');
        createButton.id = "open-draw-area-button-".concat(this.identifier);
        createButton.innerText = 'Öffnen';
        subContainer.innerHTML = "\n            <span>Deine Rechte auf dieser Zeichenfl\u00E4che (ID: ".concat(this.drawingAreaId, "): </span>\n            <span>").concat(_interfaces_types_typesPermissions__WEBPACK_IMPORTED_MODULE_0__.drawingAreaPermissions[this.permission], "</span>\n        ");
        subContainer.appendChild(createButton);
        if (this.permission === 'O') {
            var deleteButton = document.createElement('button');
            deleteButton.classList.add('custom-button');
            deleteButton.innerText = 'Löschen';
            deleteButton.id = "delete-draw-area-button-".concat(this.identifier);
            subContainer.appendChild(deleteButton);
        }
        return "\n            <img src=\"../../assets/drawingAreaPreview.png\" alt=\"drawingAreaPreview\" class=\"drawing-area-preview-img\"/>\n            ".concat(subContainer.outerHTML, "\n        ");
    };
    /**
     * Initialisiert das Vorschau-Element der Zeichenfläche.
     * @param router - Router-Instanz
     * @param authHandler - AuthHandler-Instanz
     * @param parentElement - Eltern-Element, in dem das Vorschau-Element gerendert wird
     * @param drawingAreaPreviewElementsStore - DrawingAreaPreviewElementsStore-Instanz
     */
    DrawingAreaPreview.prototype.initialize = function (router, authHandler, parentElement, drawingAreaPreviewElementsStore) {
        var _this = this;
        var newDrawingAreaPreviewElement = document.createElement('section');
        newDrawingAreaPreviewElement.classList.add('container-preview-drawing-area-element');
        newDrawingAreaPreviewElement.innerHTML = this.render();
        parentElement.appendChild(newDrawingAreaPreviewElement);
        var openDrawAreaButton = document.getElementById("open-draw-area-button-".concat(this.identifier));
        if (openDrawAreaButton) {
            openDrawAreaButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, router.navigateTo("#/drawing-area/".concat(this.drawingAreaId))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        if (this.permission === 'O') {
            var deleteDrawAreaButton = document.getElementById("delete-draw-area-button-".concat(this.identifier));
            if (deleteDrawAreaButton) {
                deleteDrawAreaButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                    var e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, drawingAreaPreviewElementsStore.removeDrawingAreaPreviewElement(this)];
                            case 1:
                                _a.sent();
                                newDrawingAreaPreviewElement.remove();
                                (0,_functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_1__.showCustomMessageModal)('Erfolg', 'Zeichenfläche wurde erfolgreich gelöscht!');
                                return [3 /*break*/, 3];
                            case 2:
                                e_1 = _a.sent();
                                (0,_functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_1__.showCustomMessageModal)('Fehler', "".concat(e_1));
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            }
        }
    };
    return DrawingAreaPreview;
}());



/***/ }),

/***/ "./frontend/src/utils/classes/EventFan.ts":
/*!************************************************!*\
  !*** ./frontend/src/utils/classes/EventFan.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventFan: () => (/* binding */ EventFan)
/* harmony export */ });
/**
 * Ein EventFan, der Events an verschiedene ShapeViews (listener) weiterleitet
 */
var EventFan = /** @class */ (function () {
    function EventFan() {
        this.listeners = [];
    }
    /**
     * Registriert einen neuen Listener
     * @param newListener - Der neue Listener
     */
    EventFan.prototype.register = function (newListener) {
        this.listeners.push(newListener);
    };
    /**
     * Entfernt einen Listener
     * @param listener - Der zu entfernende Listener
     */
    EventFan.prototype.unregister = function (listener) {
        this.listeners = this.listeners.filter(function (l) { return l !== listener; });
    };
    /**
     * Wendet die Events auf alle Listener an
     * @param events - Die Events, die angewendet werden sollen
     */
    EventFan.prototype.applyEvents = function (events) {
        this.listeners.forEach(function (listener) { return listener.applyEvents(events); });
        return this;
    };
    return EventFan;
}());



/***/ }),

/***/ "./frontend/src/utils/classes/IdFactory.ts":
/*!*************************************************!*\
  !*** ./frontend/src/utils/classes/IdFactory.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IDFactory: () => (/* binding */ IDFactory)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");

/**
 * Klasse zur Erzeugung von eindeutigen IDs
 */
var IDFactory = /** @class */ (function () {
    function IDFactory() {
    }
    /**
     * Erzeugt eine neue eindeutige ID
     */
    IDFactory.getNewId = function () {
        return "".concat(IDFactory.prefix, "#").concat((0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])());
    };
    /**
     * Setzt den Präfix für die IDs
     * @param prefix - Präfix für die IDs
     */
    IDFactory.setPrefix = function (prefix) {
        this.prefix = prefix;
    };
    return IDFactory;
}());



/***/ }),

/***/ "./frontend/src/utils/classes/PopupMenu.ts":
/*!*************************************************!*\
  !*** ./frontend/src/utils/classes/PopupMenu.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PopupMenu: () => (/* binding */ PopupMenu)
/* harmony export */ });
/**
 * Klasse für ein Popup-Menü
 */
var PopupMenu = /** @class */ (function () {
    function PopupMenu() {
        this.menuItems = [];
        this.menuElement = document.createElement('ul');
        /**
         * Event-Listener, um clicks, die innerhalb des Menüs stattfinden, nicht weiter zu propagieren
         */
        this.menuElement.addEventListener('click', function (event) {
            event.stopPropagation();
        });
        this.menuElement.classList.add('popup-menu');
        /**
         * Event-Listener, um das Popup-Menü zu verstecken, wenn der Benutzer außerhalb des Menüs ein Kontextmenü öffnet
         */
        document.addEventListener('contextmenu', this.closePopupMenuHandler.bind(this), true);
        /**
         * Event-Listener, um das Popup-Menü zu verstecken, wenn der Benutzer außerhalb des Menüs klickt
         */
        document.addEventListener('click', this.closePopupMenuHandler.bind(this), true);
    }
    /**
     * Zeigt das Popup-Menü an der angegebenen Position
     * @param x - x-Koordinate
     * @param y - y-Koordinate
     */
    PopupMenu.prototype.show = function (x, y) {
        this.styleMenuElement(x, y);
        for (var _i = 0, _a = this.menuItems; _i < _a.length; _i++) {
            var menuItem = _a[_i];
            this.menuElement.appendChild(menuItem.render());
        }
        document.body.appendChild(this.menuElement);
    };
    /**
     * Erstellt ein Menüelement mit dem angegebenen Text und Klick-Handler
     * @param itemText - text des Menüelements
     * @param onClick - Klick-Handler
     */
    PopupMenu.prototype.createMenuItem = function (itemText, onClick) {
        var _this = this;
        var menuItem = document.createElement('li');
        menuItem.textContent = itemText;
        menuItem.addEventListener('click', function () {
            onClick(_this);
        });
        return {
            render: function () { return menuItem; },
        };
    };
    /**
     * Erstellt einen Trenner für das Popup-Menü in Form eines li-Elements
     */
    PopupMenu.prototype.createSeparator = function () {
        var separator = document.createElement('hr');
        return {
            render: function () { return separator; },
        };
    };
    /**
     * Erstellt ein Menüelement mit Radio-Buttons
     * @param itemText - text des Menüelements
     * @param options - Optionen für die Radio-Buttons
     * @param currentOption - aktuelle Option
     * @param onChange - Änderungs-Handler
     */
    PopupMenu.prototype.createRadioOption = function (itemText, options, currentOption, onChange) {
        var _this = this;
        var menuItem = document.createElement('li');
        var label = document.createElement('label');
        label.textContent = itemText;
        menuItem.appendChild(label);
        var _loop_1 = function (option) {
            var radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = itemText;
            radio.value = option;
            radio.checked = option === currentOption;
            radio.addEventListener('change', function () {
                currentOption = option;
                if (onChange) {
                    onChange(option, _this);
                }
            });
            var radioLabel = document.createElement('label');
            radioLabel.textContent = options[option];
            menuItem.appendChild(radio);
            menuItem.appendChild(radioLabel);
        };
        for (var option in options) {
            _loop_1(option);
        }
        return {
            render: function () { return menuItem; },
        };
    };
    /**
     * Fügt ein Menüelement zum Popup-Menü hinzu
     * @param menuItem - neues Menüelement, das hinzugefügt werden soll
     */
    PopupMenu.prototype.addMenuItem = function (menuItem) {
        if (this.menuItems.indexOf(menuItem) === -1) {
            this.menuItems.push(menuItem);
        }
    };
    /**
     * Fügt mehrere Menüelemente zum Popup-Menü hinzu
     * @param menuItems - neue Menüelemente, die hinzugefügt werden sollen
     */
    PopupMenu.prototype.addMenuItems = function () {
        var menuItems = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            menuItems[_i] = arguments[_i];
        }
        for (var _a = 0, menuItems_1 = menuItems; _a < menuItems_1.length; _a++) {
            var menuItem = menuItems_1[_a];
            this.addMenuItem(menuItem);
        }
    };
    /**
     * Fügt ein Menüelement an einer bestimmten Position im Popup-Menü hinzu
     * @param menuItem - Menüelement, das hinzugefügt werden soll
     * @param index - Position, an der das Menüelement hinzugefügt werden soll
     * Achtung: Auch die "Separator" werden als Menüelemente gezählt
     */
    PopupMenu.prototype.addMenuItemAt = function (menuItem, index) {
        if (this.menuItems.indexOf(menuItem) === -1) {
            this.menuItems.splice(index, 0, menuItem);
        }
    };
    /**
     * Entfernt ein Menüelement aus dem Popup-Menü
     * @param menuItem - Menüelement, das entfernt werden soll
     */
    PopupMenu.prototype.removeMenuItem = function (menuItem) {
        var index = this.menuItems.indexOf(menuItem);
        if (index !== -1) {
            this.menuItems.splice(index, 1);
        }
    };
    /**
     * Versteckt das Popup-Menü
     */
    PopupMenu.prototype.hide = function () {
        this.menuElement.replaceChildren();
        document.body.removeChild(this.menuElement);
    };
    /**
     * Stylt das Popup-Menü
     * @param x - x-Koordinate
     * @param y - y-Koordinate
     */
    PopupMenu.prototype.styleMenuElement = function (x, y) {
        this.menuElement.style.position = 'fixed';
        this.menuElement.style.left = x + 'px';
        this.menuElement.style.top = y + 'px';
        this.menuElement.style.backgroundColor = 'white';
        this.menuElement.style.border = '1px solid black';
        this.menuElement.style.padding = '2px';
        this.menuElement.style.margin = '0';
        this.menuElement.style.boxShadow = '2px 2px 5px black';
        this.menuElement.style.listStyleType = 'none';
    };
    /**
     * Event-Handler, um das Popup-Menü zu verstecken, wenn der Benutzer außerhalb des Menüs klickt/contextmenu
     * @param e - Event
     */
    PopupMenu.prototype.closePopupMenuHandler = function (e) {
        if (e.target !== this.menuElement &&
            this.menuElement.parentNode !== null &&
            !this.menuElement.contains(e.target)) {
            e.preventDefault();
            e.stopPropagation();
            this.hide();
        }
    };
    return PopupMenu;
}());



/***/ }),

/***/ "./frontend/src/utils/classes/SelectColorFactory.ts":
/*!**********************************************************!*\
  !*** ./frontend/src/utils/classes/SelectColorFactory.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectColorFactory: () => (/* binding */ SelectColorFactory)
/* harmony export */ });
var SelectColorFactory = /** @class */ (function () {
    function SelectColorFactory() {
    }
    /**
     * Gibt die aktuelle Farbe für das Auswählen von Shapes zurück
     */
    SelectColorFactory.getSelectColor = function () {
        return this.selectColor;
    };
    /**
     * Setzt die Farbe für das Auswählen von Shapes
     * @param selectColor - Die Farbe, die für das Auswählen von Shapes verwendet werden soll
     */
    SelectColorFactory.setSelectColor = function (selectColor) {
        this.selectColor = selectColor;
    };
    /**
     * Die Farbe, die für das Auswählen von Shapes verwendet wird.
     * Default ist schwarz
     */
    SelectColorFactory.selectColor = '#000000';
    return SelectColorFactory;
}());



/***/ }),

/***/ "./frontend/src/utils/classes/ShapeClasses.ts":
/*!****************************************************!*\
  !*** ./frontend/src/utils/classes/ShapeClasses.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Circle: () => (/* binding */ Circle),
/* harmony export */   Line: () => (/* binding */ Line),
/* harmony export */   Rectangle: () => (/* binding */ Rectangle),
/* harmony export */   Triangle: () => (/* binding */ Triangle)
/* harmony export */ });
/**
 * Klasse einer Shape in Form einer Linie, die gezeichnet werden kann.
 */
var Line = /** @class */ (function () {
    function Line(id, from, to, backgroundColor, borderColor, selectColor, zIndex) {
        this.id = id;
        this.from = from;
        this.to = to;
        this.backgroundColor = backgroundColor;
        this.borderColor = borderColor;
        this.selectColor = selectColor;
        this.zIndex = zIndex;
        this.type = 'Line';
    }
    /**
     * Zeichnet die Linie auf den Canvas.
     * @param ctx - Der CanvasRenderingContext2D, auf dem gezeichnet wird.
     * @param isSelected - Ob nur die Linie gezeichnet werden soll oder nur die Auswahlpunkte.
     */
    Line.prototype.draw = function (ctx, isSelected) {
        if (isSelected) {
            ctx.fillStyle = this.selectColor;
            ctx.fillRect(this.from.x - 2, this.from.y - 2, 6, 6);
            ctx.fillRect(this.to.x - 2, this.to.y - 2, 6, 6);
        }
        else {
            ctx.strokeStyle = this.borderColor;
            ctx.beginPath();
            ctx.moveTo(this.from.x, this.from.y);
            ctx.lineTo(this.to.x, this.to.y);
            ctx.stroke();
        }
    };
    return Line;
}());

/**
 * Klasse einer Shape in Form eines Kreises, der gezeichnet werden kann.
 */
var Circle = /** @class */ (function () {
    function Circle(id, center, radius, backgroundColor, borderColor, selectColor, zIndex) {
        this.id = id;
        this.center = center;
        this.radius = radius;
        this.backgroundColor = backgroundColor;
        this.borderColor = borderColor;
        this.selectColor = selectColor;
        this.zIndex = zIndex;
        this.type = 'Circle';
    }
    /**
     * Zeichnet den Kreis auf den Canvas.
     * @param ctx - Der CanvasRenderingContext2D, auf dem gezeichnet wird.
     * @param isSelected - Ob nur der Kreis gezeichnet werden soll oder nur die Auswahlpunkte.
     */
    Circle.prototype.draw = function (ctx, isSelected) {
        if (isSelected) {
            ctx.fillStyle = this.selectColor;
            ctx.fillRect(this.center.x - 2, this.center.y - 2, 6, 6);
            ctx.fillRect(this.center.x + this.radius - 2, this.center.y - 2, 6, 6);
            ctx.fillRect(this.center.x - this.radius - 2, this.center.y - 2, 6, 6);
            ctx.fillRect(this.center.x - 2, this.center.y + this.radius - 2, 6, 6);
            ctx.fillRect(this.center.x - 2, this.center.y - this.radius - 2, 6, 6);
        }
        else {
            ctx.strokeStyle = this.borderColor;
            ctx.beginPath();
            ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillStyle = this.backgroundColor;
            ctx.fill();
        }
    };
    return Circle;
}());

/**
 * Klasse einer Shape in Form eines Rechtecks, das gezeichnet werden kann.
 */
var Rectangle = /** @class */ (function () {
    function Rectangle(id, from, to, backgroundColor, borderColor, selectColor, zIndex) {
        this.id = id;
        this.from = from;
        this.to = to;
        this.backgroundColor = backgroundColor;
        this.borderColor = borderColor;
        this.selectColor = selectColor;
        this.zIndex = zIndex;
        this.type = 'Rectangle';
    }
    /**
     * Zeichnet das Rechteck auf den Canvas.
     * @param ctx - Der CanvasRenderingContext2D, auf dem gezeichnet wird.
     * @param isSelected - Ob nur das Rechteck gezeichnet werden soll oder nur die Auswahlpunkte.
     */
    Rectangle.prototype.draw = function (ctx, isSelected) {
        if (isSelected) {
            ctx.fillStyle = this.selectColor;
            ctx.fillRect(this.from.x - 2, this.from.y - 2, 6, 6);
            ctx.fillRect(this.to.x - 2, this.to.y - 2, 6, 6);
            ctx.fillRect(this.from.x - 2, this.to.y - 2, 6, 6);
            ctx.fillRect(this.to.x - 2, this.from.y - 2, 6, 6);
        }
        else {
            ctx.strokeStyle = this.borderColor;
            ctx.beginPath();
            ctx.strokeRect(this.from.x, this.from.y, this.to.x - this.from.x, this.to.y - this.from.y);
            ctx.stroke();
            ctx.fillStyle = this.backgroundColor;
            ctx.fillRect(this.from.x, this.from.y, this.to.x - this.from.x, this.to.y - this.from.y);
        }
    };
    return Rectangle;
}());

/**
 * Klasse einer Shape in Form eines Dreiecks, das gezeichnet werden kann.
 */
var Triangle = /** @class */ (function () {
    function Triangle(id, p1, p2, p3, backgroundColor, borderColor, selectColor, zIndex) {
        this.id = id;
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.backgroundColor = backgroundColor;
        this.borderColor = borderColor;
        this.selectColor = selectColor;
        this.zIndex = zIndex;
        this.type = 'Triangle';
    }
    /**
     * Zeichnet das Dreieck auf den Canvas.
     * @param ctx - Der CanvasRenderingContext2D, auf dem gezeichnet wird.
     * @param isSelected - Ob nur das Dreieck gezeichnet werden soll oder nur die Auswahlpunkte.
     */
    Triangle.prototype.draw = function (ctx, isSelected) {
        if (isSelected) {
            ctx.fillStyle = this.selectColor;
            ctx.fillRect(this.p1.x - 2, this.p1.y - 2, 6, 6);
            ctx.fillRect(this.p2.x - 2, this.p2.y - 2, 6, 6);
            ctx.fillRect(this.p3.x - 2, this.p3.y - 2, 6, 6);
        }
        else {
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
    };
    return Triangle;
}());



/***/ }),

/***/ "./frontend/src/utils/classes/ShapeFactories.ts":
/*!******************************************************!*\
  !*** ./frontend/src/utils/classes/ShapeFactories.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CircleFactory: () => (/* binding */ CircleFactory),
/* harmony export */   LineFactory: () => (/* binding */ LineFactory),
/* harmony export */   RectangleFactory: () => (/* binding */ RectangleFactory),
/* harmony export */   SelectorFactory: () => (/* binding */ SelectorFactory),
/* harmony export */   TriangleFactory: () => (/* binding */ TriangleFactory)
/* harmony export */ });
/* harmony import */ var _interfaces_types_typesShapes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../interfaces-types/typesShapes */ "./frontend/src/utils/interfaces-types/typesShapes.ts");
/* harmony import */ var _ShapeClasses__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShapeClasses */ "./frontend/src/utils/classes/ShapeClasses.ts");
/* harmony import */ var _IdFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IdFactory */ "./frontend/src/utils/classes/IdFactory.ts");
/* harmony import */ var _functions_shapeConversionFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../functions/shapeConversionFunctions */ "./frontend/src/utils/functions/shapeConversionFunctions.ts");
/* harmony import */ var _PopupMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PopupMenu */ "./frontend/src/utils/classes/PopupMenu.ts");
/* harmony import */ var _store_DrawingAreaIShapesStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/DrawingAreaIShapesStore */ "./frontend/src/store/DrawingAreaIShapesStore.ts");
/* harmony import */ var _SelectColorFactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SelectColorFactory */ "./frontend/src/utils/classes/SelectColorFactory.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







/**
 * Eine abstrakte Factory-Klasse, die die Erstellung für eine Linie, ein Kreis und ein Rechteck ermöglicht.
 */
var AbstractFactory = /** @class */ (function () {
    function AbstractFactory(shapeManager) {
        this.shapeManager = shapeManager;
    }
    /**
     * Diese Methode wird aufgerufen, wenn der Benutzer die Maus drückt.
     * @param x - Die x-Koordinate des Mauszeigers
     * @param y - Die y-Koordinate des Mauszeigers
     */
    AbstractFactory.prototype.handleMouseDown = function (x, y) {
        this.from = new _interfaces_types_typesShapes__WEBPACK_IMPORTED_MODULE_0__.Point2D(x, y);
    };
    /**
     * Diese Methode wird aufgerufen, wenn der Benutzer die Maus loslässt.
     * @param x - Die x-Koordinate des Mauszeigers
     * @param y - Die y-Koordinate des Mauszeigers
     */
    AbstractFactory.prototype.handleMouseUp = function (x, y) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.tmpShape) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.shapeManager.removeIShapeWithId(this.tmpShape.id)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.shapeManager.addIShape((0,_functions_shapeConversionFunctions__WEBPACK_IMPORTED_MODULE_3__.shapeToIShape)(this.createShape(this.from, new _interfaces_types_typesShapes__WEBPACK_IMPORTED_MODULE_0__.Point2D(x, y))), true)];
                    case 3:
                        _a.sent();
                        this.from = undefined;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Diese Methode wird aufgerufen, wenn der Benutzer die Maus bewegt.
     * @param x - Die x-Koordinate des Mauszeigers
     * @param y - Die y-Koordinate des Mauszeigers
     */
    AbstractFactory.prototype.handleMouseMove = function (x, y) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /**
                         * Hier wird nur ein temporärer Kreis gezeichnet, wenn der Startpunkt definiert ist.
                         */
                        if (!this.from) {
                            return [2 /*return*/];
                        }
                        if (!(!this.tmpTo || this.tmpTo.x !== x || this.tmpTo.y !== y)) return [3 /*break*/, 4];
                        this.tmpTo = new _interfaces_types_typesShapes__WEBPACK_IMPORTED_MODULE_0__.Point2D(x, y);
                        if (!this.tmpShape) return [3 /*break*/, 2];
                        /**
                         * Hier wird die temporäre Linie entfernt, wenn es existiert.
                         */
                        return [4 /*yield*/, this.shapeManager.removeIShapeWithId(this.tmpShape.id)];
                    case 1:
                        /**
                         * Hier wird die temporäre Linie entfernt, wenn es existiert.
                         */
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        /**
                         * Hier wird ein temporäres Shape gezeichnet und hinzugefügt.
                         */
                        this.tmpShape = this.createShape(this.from, new _interfaces_types_typesShapes__WEBPACK_IMPORTED_MODULE_0__.Point2D(x, y));
                        return [4 /*yield*/, this.shapeManager.addIShape((0,_functions_shapeConversionFunctions__WEBPACK_IMPORTED_MODULE_3__.shapeToIShape)(this.tmpShape))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AbstractFactory;
}());
/**
 * Eine Factory-Klasse, die Linien erstellt.
 */
var LineFactory = /** @class */ (function (_super) {
    __extends(LineFactory, _super);
    function LineFactory(shapeManager) {
        var _this = _super.call(this, shapeManager) || this;
        _this.label = 'Linie';
        return _this;
    }
    /**
     * Diese Methode erstellt eine Linie.
     * @param from - Der Startpunkt
     * @param to - Der Endpunkt
     */
    LineFactory.prototype.createShape = function (from, to) {
        return new _ShapeClasses__WEBPACK_IMPORTED_MODULE_1__.Line(_IdFactory__WEBPACK_IMPORTED_MODULE_2__.IDFactory.getNewId(), from, to, 'transparent', '#000000', _SelectColorFactory__WEBPACK_IMPORTED_MODULE_6__.SelectColorFactory.getSelectColor(), undefined);
    };
    return LineFactory;
}(AbstractFactory));

/**
 * Eine Factory-Klasse, die Kreise erstellt.
 */
var CircleFactory = /** @class */ (function (_super) {
    __extends(CircleFactory, _super);
    function CircleFactory(shapeManager) {
        var _this = _super.call(this, shapeManager) || this;
        _this.label = 'Kreis';
        return _this;
    }
    /**
     * Diese Methode erstellt einen Kreis.
     * @param from - Der Startpunkt
     * @param to - Der Endpunkt
     */
    CircleFactory.prototype.createShape = function (from, to) {
        return new _ShapeClasses__WEBPACK_IMPORTED_MODULE_1__.Circle(_IdFactory__WEBPACK_IMPORTED_MODULE_2__.IDFactory.getNewId(), from, CircleFactory.computeRadius(from, to.x, to.y), 'transparent', '#000000', _SelectColorFactory__WEBPACK_IMPORTED_MODULE_6__.SelectColorFactory.getSelectColor(), undefined);
    };
    /**
     * Diese Methode berechnet den Radius eines Kreises.
     * @param from - Der Startpunkt
     * @param x - Die x-Koordinate des Endpunkts
     * @param y - Die y-Koordinate des Endpunkts
     */
    CircleFactory.computeRadius = function (from, x, y) {
        var xDiff = from.x - x, yDiff = from.y - y;
        return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    };
    return CircleFactory;
}(AbstractFactory));

/**
 * Eine Factory-Klasse, die Rechtecke erstellt.
 */
var RectangleFactory = /** @class */ (function (_super) {
    __extends(RectangleFactory, _super);
    function RectangleFactory(shapeManager) {
        var _this = _super.call(this, shapeManager) || this;
        _this.label = 'Rechteck';
        return _this;
    }
    /**
     * Diese Methode erstellt ein Rechteck.
     * @param from - Der Startpunkt
     * @param to - Der Endpunkt
     */
    RectangleFactory.prototype.createShape = function (from, to) {
        return new _ShapeClasses__WEBPACK_IMPORTED_MODULE_1__.Rectangle(_IdFactory__WEBPACK_IMPORTED_MODULE_2__.IDFactory.getNewId(), from, to, 'transparent', '#000000', _SelectColorFactory__WEBPACK_IMPORTED_MODULE_6__.SelectColorFactory.getSelectColor(), undefined);
    };
    return RectangleFactory;
}(AbstractFactory));

/**
 * Eine Factory-Klasse, die Dreiecke erstellt und nicht die abstrakte Klasse AbstractFactory nutzt.
 */
var TriangleFactory = /** @class */ (function () {
    function TriangleFactory(shapeManager) {
        this.shapeManager = shapeManager;
        this.label = 'Dreieck';
    }
    /**
     * Diese Methode wird aufgerufen, wenn der Benutzer die Maus drückt.
     * Hier wird die Shape auch endgültig gezeichnet und auf dem Server gespeichert.
     * @param x - Die x-Koordinate des Mauszeigers
     * @param y - Die y-Koordinate des Mauszeigers
     */
    TriangleFactory.prototype.handleMouseDown = function (x, y) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.tmpShape) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.shapeManager.removeIShapeWithId(this.tmpShape.id)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.shapeManager.addIShape((0,_functions_shapeConversionFunctions__WEBPACK_IMPORTED_MODULE_3__.shapeToIShape)(new _ShapeClasses__WEBPACK_IMPORTED_MODULE_1__.Triangle(_IdFactory__WEBPACK_IMPORTED_MODULE_2__.IDFactory.getNewId(), this.from, this.tmpTo, new _interfaces_types_typesShapes__WEBPACK_IMPORTED_MODULE_0__.Point2D(x, y), 'transparent', '#000000', _SelectColorFactory__WEBPACK_IMPORTED_MODULE_6__.SelectColorFactory.getSelectColor(), undefined)), true)];
                    case 2:
                        _a.sent();
                        this.from = undefined;
                        this.tmpTo = undefined;
                        this.tmpLine = undefined;
                        this.thirdPoint = undefined;
                        this.tmpShape = undefined;
                        return [3 /*break*/, 4];
                    case 3:
                        this.from = new _interfaces_types_typesShapes__WEBPACK_IMPORTED_MODULE_0__.Point2D(x, y);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Diese Methode wird aufgerufen, wenn der Benutzer die Maus loslässt.
     * @param x - Die x-Koordinate des Mauszeigers
     * @param y - Die y-Koordinate des Mauszeigers
     */
    TriangleFactory.prototype.handleMouseUp = function (x, y) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.tmpLine) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.shapeManager.removeIShapeWithId(this.tmpLine.id)];
                    case 1:
                        _a.sent();
                        this.tmpLine = undefined;
                        this.tmpTo = new _interfaces_types_typesShapes__WEBPACK_IMPORTED_MODULE_0__.Point2D(x, y);
                        this.thirdPoint = new _interfaces_types_typesShapes__WEBPACK_IMPORTED_MODULE_0__.Point2D(x, y);
                        this.tmpShape = new _ShapeClasses__WEBPACK_IMPORTED_MODULE_1__.Triangle(_IdFactory__WEBPACK_IMPORTED_MODULE_2__.IDFactory.getNewId(), this.from, this.tmpTo, this.thirdPoint, 'transparent', '#000000', _SelectColorFactory__WEBPACK_IMPORTED_MODULE_6__.SelectColorFactory.getSelectColor(), undefined);
                        return [4 /*yield*/, this.shapeManager.addIShape((0,_functions_shapeConversionFunctions__WEBPACK_IMPORTED_MODULE_3__.shapeToIShape)(this.tmpShape))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Diese Methode wird aufgerufen, wenn der Benutzer die Maus bewegt.
     * @param x - Die x-Koordinate des Mauszeigers
     * @param y - Die y-Koordinate des Mauszeigers
     */
    TriangleFactory.prototype.handleMouseMove = function (x, y) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /**
                         * Hier wird nur ein temporärer Kreis gezeichnet, wenn der Startpunkt definiert ist.
                         */
                        if (!this.from) {
                            return [2 /*return*/];
                        }
                        if (!this.tmpShape) return [3 /*break*/, 5];
                        if (!(!this.thirdPoint ||
                            this.thirdPoint.x !== x ||
                            this.thirdPoint.y !== y)) return [3 /*break*/, 4];
                        this.thirdPoint = new _interfaces_types_typesShapes__WEBPACK_IMPORTED_MODULE_0__.Point2D(x, y);
                        if (!this.tmpShape) return [3 /*break*/, 2];
                        /**
                         * Hier wird die temporäre Linie entfernt, wenn diese existiert.
                         */
                        return [4 /*yield*/, this.shapeManager.removeIShapeWithId(this.tmpShape.id)];
                    case 1:
                        /**
                         * Hier wird die temporäre Linie entfernt, wenn diese existiert.
                         */
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        /**
                         * Hier wird ein temporäres Dreieck gezeichnet und hinzugefügt.
                         */
                        this.tmpShape = new _ShapeClasses__WEBPACK_IMPORTED_MODULE_1__.Triangle(_IdFactory__WEBPACK_IMPORTED_MODULE_2__.IDFactory.getNewId(), this.from, this.tmpTo, this.thirdPoint, 'transparent', '#000000', _SelectColorFactory__WEBPACK_IMPORTED_MODULE_6__.SelectColorFactory.getSelectColor(), undefined);
                        return [4 /*yield*/, this.shapeManager.addIShape((0,_functions_shapeConversionFunctions__WEBPACK_IMPORTED_MODULE_3__.shapeToIShape)(this.tmpShape))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 9];
                    case 5:
                        if (!(!this.tmpTo || this.tmpTo.x !== x || this.tmpTo.y !== y)) return [3 /*break*/, 9];
                        this.tmpTo = new _interfaces_types_typesShapes__WEBPACK_IMPORTED_MODULE_0__.Point2D(x, y);
                        if (!this.tmpLine) return [3 /*break*/, 7];
                        /**
                         * Hier wird die temporäre Linie entfernt, wenn diese existiert.
                         */
                        return [4 /*yield*/, this.shapeManager.removeIShapeWithId(this.tmpLine.id)];
                    case 6:
                        /**
                         * Hier wird die temporäre Linie entfernt, wenn diese existiert.
                         */
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        /**
                         * Hier wird eine temporäre Linie gezeichnet und hinzugefügt.
                         */
                        this.tmpLine = new _ShapeClasses__WEBPACK_IMPORTED_MODULE_1__.Line(_IdFactory__WEBPACK_IMPORTED_MODULE_2__.IDFactory.getNewId(), this.from, this.tmpTo, 'transparent', '#000000', _SelectColorFactory__WEBPACK_IMPORTED_MODULE_6__.SelectColorFactory.getSelectColor(), undefined);
                        return [4 /*yield*/, this.shapeManager.addIShape((0,_functions_shapeConversionFunctions__WEBPACK_IMPORTED_MODULE_3__.shapeToIShape)(this.tmpLine))];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return TriangleFactory;
}());

/**
 * Diese Klasse ist für die Selektion von Shapes zuständig.
 */
var SelectorFactory = /** @class */ (function () {
    function SelectorFactory(shapeManager, userId) {
        var _this = this;
        this.shapeManager = shapeManager;
        this.userId = userId;
        this.label = 'Selektion';
        this.isAltPressed = false;
        this.isStrPressed = false;
        this.isMousePressed = false;
        this.iShapeStore = _store_DrawingAreaIShapesStore__WEBPACK_IMPORTED_MODULE_5__.DrawingAreaIShapesStore.getInstance();
        this.lastIndexOfIteratedShape = 0;
        this.lastMovedShape = {
            oldShape: undefined,
            newShape: undefined,
        };
        /**
         * Diese Methode wird aufgerufen, wenn eine Taste gedrückt wird auf dem document body.
         */
        document.body.addEventListener('keydown', function (e) {
            _this.isAltPressed = e.altKey;
            _this.isStrPressed = e.ctrlKey;
        });
        /**
         * Diese Methode wird aufgerufen, wenn eine Taste losgelassen wird auf dem document body.
         */
        document.body.addEventListener('keyup', function (e) {
            _this.isAltPressed = e.altKey;
            _this.isStrPressed = e.ctrlKey;
        });
    }
    SelectorFactory.prototype.handleMouseDown = function (x, y) {
        this.isMousePressed = true;
        this.cordsMousePressed = new _interfaces_types_typesShapes__WEBPACK_IMPORTED_MODULE_0__.Point2D(x, y);
        this.lastMovedShape.oldShape = undefined;
        this.lastMovedShape.newShape = undefined;
    };
    SelectorFactory.prototype.handleMouseUp = function (x, y) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isMousePressed = false;
                        if (!(this.lastMovedShape.oldShape && this.lastMovedShape.newShape)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.shapeManager.moveIShape((0,_functions_shapeConversionFunctions__WEBPACK_IMPORTED_MODULE_3__.shapeToIShape)(this.lastMovedShape.oldShape), (0,_functions_shapeConversionFunctions__WEBPACK_IMPORTED_MODULE_3__.shapeToIShape)(this.lastMovedShape.newShape), true)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Diese Methode wird aufgerufen, wenn der Benutzer die Maus bewegt und setzt Drag and Drop um.
     * @param x - Die x-Koordinate des Mauszeigers
     * @param y - Die y-Koordinate des Mauszeigers
     */
    SelectorFactory.prototype.handleMouseMove = function (x, y) {
        var _this = this;
        if (this.isMousePressed &&
            this.iShapeStore.getSelectedIShapes(this.userId).length !== 0) {
            this.iShapeStore
                .getSelectedIShapes(this.userId)
                .map(_functions_shapeConversionFunctions__WEBPACK_IMPORTED_MODULE_3__.iShapeToShape)
                .forEach(function (shape) { return __awaiter(_this, void 0, void 0, function () {
                var newShape, diffX, diffY;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isMouseOverShape(shape, x, y)) return [3 /*break*/, 2];
                            newShape = void 0;
                            diffX = x - this.cordsMousePressed.x;
                            diffY = y - this.cordsMousePressed.y;
                            if (shape instanceof _ShapeClasses__WEBPACK_IMPORTED_MODULE_1__.Line) {
                                newShape = new _ShapeClasses__WEBPACK_IMPORTED_MODULE_1__.Line(shape.id, new _interfaces_types_typesShapes__WEBPACK_IMPORTED_MODULE_0__.Point2D(shape.from.x + diffX, shape.from.y + diffY), new _interfaces_types_typesShapes__WEBPACK_IMPORTED_MODULE_0__.Point2D(shape.to.x + diffX, shape.to.y + diffY), shape.backgroundColor, shape.borderColor, shape.selectColor, shape.zIndex);
                            }
                            if (shape instanceof _ShapeClasses__WEBPACK_IMPORTED_MODULE_1__.Circle) {
                                newShape = new _ShapeClasses__WEBPACK_IMPORTED_MODULE_1__.Circle(shape.id, new _interfaces_types_typesShapes__WEBPACK_IMPORTED_MODULE_0__.Point2D(shape.center.x + diffX, shape.center.y + diffY), shape.radius, shape.backgroundColor, shape.borderColor, shape.selectColor, shape.zIndex);
                            }
                            if (shape instanceof _ShapeClasses__WEBPACK_IMPORTED_MODULE_1__.Rectangle) {
                                newShape = new _ShapeClasses__WEBPACK_IMPORTED_MODULE_1__.Rectangle(shape.id, new _interfaces_types_typesShapes__WEBPACK_IMPORTED_MODULE_0__.Point2D(shape.from.x + diffX, shape.from.y + diffY), new _interfaces_types_typesShapes__WEBPACK_IMPORTED_MODULE_0__.Point2D(shape.to.x + diffX, shape.to.y + diffY), shape.backgroundColor, shape.borderColor, shape.selectColor, shape.zIndex);
                            }
                            if (shape instanceof _ShapeClasses__WEBPACK_IMPORTED_MODULE_1__.Triangle) {
                                newShape = new _ShapeClasses__WEBPACK_IMPORTED_MODULE_1__.Triangle(shape.id, new _interfaces_types_typesShapes__WEBPACK_IMPORTED_MODULE_0__.Point2D(shape.p1.x + diffX, shape.p1.y + diffY), new _interfaces_types_typesShapes__WEBPACK_IMPORTED_MODULE_0__.Point2D(shape.p2.x + diffX, shape.p2.y + diffY), new _interfaces_types_typesShapes__WEBPACK_IMPORTED_MODULE_0__.Point2D(shape.p3.x + diffX, shape.p3.y + diffY), shape.backgroundColor, shape.borderColor, shape.selectColor, shape.zIndex);
                            }
                            if (!(newShape !== undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.shapeManager.moveIShape((0,_functions_shapeConversionFunctions__WEBPACK_IMPORTED_MODULE_3__.shapeToIShape)(shape), (0,_functions_shapeConversionFunctions__WEBPACK_IMPORTED_MODULE_3__.shapeToIShape)(newShape))];
                        case 1:
                            _a.sent();
                            /**
                             * Das alte Shape und neue Shape werden gespeichert, damit das letzte Event wiederholt werden kann, um in den EventStream zu schreiben.
                             * Sonst würde jedes Event in dem EventStream stehen und das führt zu einer unübersichtlichen Darstellung.
                             */
                            this.lastMovedShape.oldShape = shape;
                            this.lastMovedShape.newShape = newShape;
                            this.cordsMousePressed = new _interfaces_types_typesShapes__WEBPACK_IMPORTED_MODULE_0__.Point2D(x, y);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); });
        }
    };
    /**
     * Diese Methode wird aufgerufen, wenn der Benutzer auf das Canvas rechts klickt.
     * @param x - Die x-Koordinate des Mauszeigers
     * @param y - Die y-Koordinate des Mauszeigers
     */
    SelectorFactory.prototype.handleContextMenu = function (x, y) {
        var _this = this;
        if (this.iShapeStore.getSelectedIShapes(this.userId).length !== 0) {
            var popupMenu = new _PopupMenu__WEBPACK_IMPORTED_MODULE_4__.PopupMenu();
            var popupMenuItem = popupMenu.createMenuItem('Löschen', function (menu) {
                _this.iShapeStore
                    .getSelectedIShapes(_this.userId)
                    .forEach(function (shape) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.shapeManager.removeIShapeWithId(shape.id, true)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                menu === null || menu === void 0 ? void 0 : menu.hide();
            });
            popupMenu.addMenuItem(popupMenuItem);
            var popUpSeparator = popupMenu.createSeparator();
            popupMenu.addMenuItem(popUpSeparator);
            var radioOptionBackground = popupMenu.createRadioOption('Hintergrundfarbe:', {
                transparent: 'transparent',
                '#FF0000': 'rot',
                '#00FF00': 'grün',
                '#FFFF00': 'gelb',
                '#0000FF': 'blau',
                '#000000': 'schwarz',
            }, this.iShapeStore.getSelectedIShapes(this.userId).length === 1
                ? this.iShapeStore.getSelectedIShapes(this.userId)[0].backgroundColor
                : undefined, function (color) {
                _this.iShapeStore
                    .getSelectedIShapes(_this.userId)
                    .forEach(function (iShape) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.shapeManager.setBackgroundColor(iShape, color)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            popupMenu.addMenuItem(radioOptionBackground);
            var popUpSeparator2 = popupMenu.createSeparator();
            popupMenu.addMenuItem(popUpSeparator2);
            var radioOptionBorder = popupMenu.createRadioOption('Rahmenfarbe:', {
                '#FF0000': 'rot',
                '#00FF00': 'grün',
                '#FFFF00': 'gelb',
                '#0000FF': 'blau',
                '#000000': 'schwarz',
            }, this.iShapeStore.getSelectedIShapes(this.userId).length === 1
                ? this.iShapeStore.getSelectedIShapes(this.userId)[0].borderColor
                : undefined, function (color) {
                _this.iShapeStore
                    .getSelectedIShapes(_this.userId)
                    .forEach(function (iShape) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.shapeManager.setBorderColor(iShape, color)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            popupMenu.addMenuItem(radioOptionBorder);
            var popUpSeparator3 = popupMenu.createSeparator();
            popupMenu.addMenuItem(popUpSeparator3);
            var popupMenuItemForeGround = popupMenu.createMenuItem('in den Vordergrund (ganz vor)', function () {
                _this.iShapeStore
                    .getSelectedIShapes(_this.userId)
                    .forEach(function (iShape) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.shapeManager.setZIndex(iShape, 'end')];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            popupMenu.addMenuItem(popupMenuItemForeGround);
            var popUpSeparator4 = popupMenu.createSeparator();
            popupMenu.addMenuItem(popUpSeparator4);
            var popupMenuItemBackGround = popupMenu.createMenuItem('in den Hintergrund (ganz hinter)', function () {
                _this.iShapeStore
                    .getSelectedIShapes(_this.userId)
                    .forEach(function (iShape) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.shapeManager.setZIndex(iShape, 'start')];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            popupMenu.addMenuItem(popupMenuItemBackGround);
            popupMenu.show(x, y);
        }
    };
    /**
     * Diese Methode wird aufgerufen, wenn der Benutzer auf das Canvas klickt.
     * @param x - Die x-Koordinate des Mauszeigers
     * @param y - Die y-Koordinate des Mauszeigers
     */
    SelectorFactory.prototype.handleMouseClick = function (x, y) {
        return __awaiter(this, void 0, void 0, function () {
            var shapes, i, index, shape;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isStrPressed) {
                            this.resetShapesSelection();
                        }
                        if (!this.isAltPressed) {
                            this.lastIndexOfIteratedShape = 0;
                        }
                        shapes = this.iShapeStore.getIShapes().map(_functions_shapeConversionFunctions__WEBPACK_IMPORTED_MODULE_3__.iShapeToShape);
                        i = shapes.length - 1;
                        _a.label = 1;
                    case 1:
                        if (!(i >= 0)) return [3 /*break*/, 7];
                        index = (this.lastIndexOfIteratedShape + i) % shapes.length;
                        shape = shapes[index];
                        if (!this.isMouseOverShape(shape, x, y)) return [3 /*break*/, 6];
                        if (!(this.isAltPressed && this.isShapeSelected(shape))) return [3 /*break*/, 4];
                        if (!!this.isStrPressed) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.shapeManager.unselectIShape(shape.id, true)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.shapeManager.selectIShape((0,_functions_shapeConversionFunctions__WEBPACK_IMPORTED_MODULE_3__.shapeToIShape)(shape), true)];
                    case 5:
                        _a.sent();
                        this.lastIndexOfIteratedShape = index;
                        return [3 /*break*/, 7];
                    case 6:
                        i--;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Diese Methode setzt die Selektion zurück.
     */
    SelectorFactory.prototype.resetShapesSelection = function () {
        var _this = this;
        if (this.iShapeStore.getSelectedIShapes(this.userId).length === 0) {
            return;
        }
        this.iShapeStore.getSelectedIShapes(this.userId).forEach(function (shape) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.shapeManager.unselectIShape(shape.id, true)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * Diese Methode prüft, ob eine Shape selektiert ist.
     * @param shape - Die Shape die geprüft werden soll
     */
    SelectorFactory.prototype.isShapeSelected = function (shape) {
        var index = this.iShapeStore
            .getSelectedIShapes(this.userId)
            .indexOf((0,_functions_shapeConversionFunctions__WEBPACK_IMPORTED_MODULE_3__.shapeToIShape)(shape));
        return index !== -1;
    };
    /**
     * Diese Methode prüft, ob der Mauszeiger über einer Shape ist.
     * @param shape Die Shape
     * @param x - Die x-Koordinate des Mauszeigers
     * @param y - Die y-Koordinate des Mauszeigers
     * @returns true, wenn der Mauszeiger über der Shape ist, sonst false
     */
    SelectorFactory.prototype.isMouseOverShape = function (shape, x, y) {
        if (shape instanceof _ShapeClasses__WEBPACK_IMPORTED_MODULE_1__.Line) {
            return this.isMouseOverLine(shape, x, y);
        }
        if (shape instanceof _ShapeClasses__WEBPACK_IMPORTED_MODULE_1__.Circle) {
            return this.isMouseOverCircle(shape, x, y);
        }
        if (shape instanceof _ShapeClasses__WEBPACK_IMPORTED_MODULE_1__.Rectangle) {
            return this.isMouseOverRectangle(shape, x, y);
        }
        if (shape instanceof _ShapeClasses__WEBPACK_IMPORTED_MODULE_1__.Triangle) {
            return this.isMouseOverTriangle(shape, x, y);
        }
        return false;
    };
    /**
     * Diese Methode prüft, ob der Mauszeiger über einer Linie ist.
     * @param shape - Die Linie
     * @param x - Die x-Koordinate des Mauszeigers
     * @param y - Die y-Koordinate des Mauszeigers
     * @returns true, wenn der Mauszeiger über der Linie ist mit einer Toleranz von 5 Pixeln, sonst false
     * Coauthored by ChatGPT
     */
    SelectorFactory.prototype.isMouseOverLine = function (shape, x, y) {
        if (((x > shape.from.x - 5 && x < shape.to.x + 5) ||
            (x < shape.from.x + 5 && x > shape.to.x - 5)) &&
            ((y > shape.from.y - 5 && y < shape.to.y + 5) ||
                (y < shape.from.y + 5 && y > shape.to.y - 5))) {
            var dx = shape.to.x - shape.from.x;
            var dy = shape.to.y - shape.from.y;
            var dxPoint = x - shape.from.x;
            var dyPoint = y - shape.from.y;
            var scalar = (dxPoint * dx + dyPoint * dy) / (dx * dx + dy * dy);
            var xProjection = shape.from.x + scalar * dx;
            var yProjection = shape.from.y + scalar * dy;
            var distance = Math.sqrt((x - xProjection) * (x - xProjection) +
                (y - yProjection) * (y - yProjection));
            return distance < 5;
        }
        return false;
    };
    /**
     * Diese Methode prüft, ob der Mauszeiger über einem Kreis ist.
     * @param shape - Der Kreis
     * @param x - Die x-Koordinate des Mauszeigers
     * @param y - Die y-Koordinate des Mauszeigers
     * @returns true, wenn der Mauszeiger über dem Kreis ist, sonst false
     */
    SelectorFactory.prototype.isMouseOverCircle = function (shape, x, y) {
        var dx = shape.center.x - x;
        var dy = shape.center.y - y;
        return Math.sqrt(dx * dx + dy * dy) < shape.radius;
    };
    /**
     * Diese Methode prüft, ob der Mauszeiger über einem Rechteck ist.
     * @param shape - Das Rechteck
     * @param x - Die x-Koordinate des Mauszeigers
     * @param y - Die y-Koordinate des Mauszeigers
     * @returns true, wenn der Mauszeiger über dem Rechteck ist, sonst false
     */
    SelectorFactory.prototype.isMouseOverRectangle = function (shape, x, y) {
        return (((x > shape.from.x && x < shape.to.x) ||
            (x < shape.from.x && x > shape.to.x)) &&
            ((y > shape.from.y && y < shape.to.y) ||
                (y < shape.from.y + 5 && y > shape.to.y)));
    };
    /**
     * Diese Methode prüft, ob der Mauszeiger über einem Dreieck ist.
     * @param shape - Das Dreieck
     * @param x - Die x-Koordinate des Mauszeigers
     * @param y - Die y-Koordinate des Mauszeigers
     * @returns true, wenn der Mauszeiger über dem Dreieck ist, sonst false
     * Coauthored by ChatGPT
     */
    SelectorFactory.prototype.isMouseOverTriangle = function (shape, x, y) {
        var b1 = this.calculateSign(x, y, shape.p1.x, shape.p1.y, shape.p2.x, shape.p2.y) <
            0.0;
        var b2 = this.calculateSign(x, y, shape.p2.x, shape.p2.y, shape.p3.x, shape.p3.y) <
            0.0;
        var b3 = this.calculateSign(x, y, shape.p3.x, shape.p3.y, shape.p1.x, shape.p1.y) <
            0.0;
        return b1 === b2 && b2 === b3;
    };
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
    SelectorFactory.prototype.calculateSign = function (x, y, x2, y2, x3, y3) {
        return (x - x3) * (y2 - y3) - (x2 - x3) * (y - y3);
    };
    return SelectorFactory;
}());



/***/ }),

/***/ "./frontend/src/utils/classes/ToolArea.ts":
/*!************************************************!*\
  !*** ./frontend/src/utils/classes/ToolArea.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToolArea: () => (/* binding */ ToolArea)
/* harmony export */ });
/**
 * Klasse für die ToolArea, die die Werkzeuge für die Zeichenfläche bereitstellt.
 */
var ToolArea = /** @class */ (function () {
    function ToolArea(shapesSelector, menue) {
        var _this = this;
        var domElms = [];
        shapesSelector.forEach(function (sl) {
            var domSelElement = document.createElement('li');
            domSelElement.innerText = sl.label;
            menue.appendChild(domSelElement);
            domElms.push(domSelElement);
            domSelElement.addEventListener('click', function () {
                selectFactory.call(_this, sl, domSelElement);
            });
        });
        var selectFactory = function (sl, domElm) {
            // remove class from all elements
            for (var j = 0; j < domElms.length; j++) {
                domElms[j].classList.remove('marked');
            }
            _this.selectedShape = sl;
            // add class to the one that is selected currently
            domElm.classList.add('marked');
        };
    }
    ToolArea.prototype.getSelectedShape = function () {
        return this.selectedShape;
    };
    return ToolArea;
}());



/***/ }),

/***/ "./frontend/src/utils/functions/getInformationForDrawingArea.ts":
/*!**********************************************************************!*\
  !*** ./frontend/src/utils/functions/getInformationForDrawingArea.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getInformationForDrawingArea: () => (/* binding */ getInformationForDrawingArea)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * Holt die Informationen für eine Zeichenfläche.
 * @param drawingAreaId - ID der Zeichenfläche.
 */
function getInformationForDrawingArea(drawingAreaId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, errorData, data, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, fetch('/api/drawingArea/getDrawingAreaInformation', {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                drawingAreaId: drawingAreaId,
                            }),
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    errorData = _a.sent();
                    return [2 /*return*/, {
                            success: false,
                            message: "Fehler: ".concat(errorData.message),
                        }];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    return [2 /*return*/, {
                            success: true,
                            message: data.message,
                            isModerated: data.isModerated,
                            eventsForDrawingArea: data.eventsForDrawingArea,
                        }];
                case 5:
                    e_1 = _a.sent();
                    return [2 /*return*/, {
                            success: false,
                            message: "".concat(e_1),
                        }];
                case 6: return [2 /*return*/];
            }
        });
    });
}


/***/ }),

/***/ "./frontend/src/utils/functions/shapeConversionFunctions.ts":
/*!******************************************************************!*\
  !*** ./frontend/src/utils/functions/shapeConversionFunctions.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   iShapeToShape: () => (/* binding */ iShapeToShape),
/* harmony export */   shapeToIShape: () => (/* binding */ shapeToIShape)
/* harmony export */ });
/* harmony import */ var _classes_ShapeClasses__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/ShapeClasses */ "./frontend/src/utils/classes/ShapeClasses.ts");

/**
 * Konvertiert ein IShape in ein Shape
 * @param iShape Die IShape, die konvertiert werden soll
 */
function iShapeToShape(iShape) {
    switch (iShape.type) {
        case 'Line':
            return new _classes_ShapeClasses__WEBPACK_IMPORTED_MODULE_0__.Line(iShape.id, iShape.from, iShape.to, iShape.backgroundColor, iShape.borderColor, iShape.selectColor, iShape.zIndex);
        case 'Rectangle':
            return new _classes_ShapeClasses__WEBPACK_IMPORTED_MODULE_0__.Rectangle(iShape.id, iShape.from, iShape.to, iShape.backgroundColor, iShape.borderColor, iShape.selectColor, iShape.zIndex);
        case 'Circle':
            return new _classes_ShapeClasses__WEBPACK_IMPORTED_MODULE_0__.Circle(iShape.id, iShape.center, iShape.radius, iShape.backgroundColor, iShape.borderColor, iShape.selectColor, iShape.zIndex);
        case 'Triangle':
            return new _classes_ShapeClasses__WEBPACK_IMPORTED_MODULE_0__.Triangle(iShape.id, iShape.p1, iShape.p2, iShape.p3, iShape.backgroundColor, iShape.borderColor, iShape.selectColor, iShape.zIndex);
    }
}
/**
 * Konvertiert ein Shape in ein IShape
 * @param shape Die Shape, die konvertiert werden soll
 */
function shapeToIShape(shape) {
    switch (shape.type) {
        case 'Line':
            return {
                id: shape.id,
                type: 'Line',
                borderColor: shape.borderColor,
                backgroundColor: shape.backgroundColor,
                selectColor: shape.selectColor,
                zIndex: shape.zIndex,
                from: shape.from,
                to: shape.to,
            };
        case 'Rectangle':
            return {
                id: shape.id,
                type: 'Rectangle',
                borderColor: shape.borderColor,
                backgroundColor: shape.backgroundColor,
                selectColor: shape.selectColor,
                zIndex: shape.zIndex,
                from: shape.from,
                to: shape.to,
            };
        case 'Circle':
            return {
                id: shape.id,
                type: 'Circle',
                borderColor: shape.borderColor,
                backgroundColor: shape.backgroundColor,
                selectColor: shape.selectColor,
                zIndex: shape.zIndex,
                center: shape.center,
                radius: shape.radius,
            };
        case 'Triangle':
            return {
                id: shape.id,
                type: 'Triangle',
                borderColor: shape.borderColor,
                backgroundColor: shape.backgroundColor,
                selectColor: shape.selectColor,
                zIndex: shape.zIndex,
                p1: shape.p1,
                p2: shape.p2,
                p3: shape.p3,
            };
    }
}


/***/ }),

/***/ "./frontend/src/utils/functions/showCustomMessageModal.ts":
/*!****************************************************************!*\
  !*** ./frontend/src/utils/functions/showCustomMessageModal.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   showCustomMessageModal: () => (/* binding */ showCustomMessageModal)
/* harmony export */ });
/**
 * Erstellt ein Modal mit einer Nachricht.
 * Alert würde an einigen Stellen nicht funktionieren, da der Alert-Dialog den JavaScript-Thread blockiert.
 * @param title - Titel des Modals
 * @param text - Text des Modals
 */
function showCustomMessageModal(title, text) {
    var messageModal = document.createElement('div');
    messageModal.classList.add('modal');
    messageModal.style.display = 'block';
    var modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    var closeButton = document.createElement('span');
    closeButton.classList.add('close');
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', function () {
        document.body.removeChild(messageModal);
    });
    var titleElement = document.createElement('h2');
    titleElement.textContent = title;
    var textElement = document.createElement('p');
    textElement.textContent = text;
    var okButton = document.createElement('button');
    okButton.textContent = 'Bestätigen';
    okButton.addEventListener('click', function () {
        document.body.removeChild(messageModal);
    });
    modalContent.appendChild(closeButton);
    modalContent.appendChild(titleElement);
    modalContent.appendChild(textElement);
    modalContent.appendChild(okButton);
    messageModal.appendChild(modalContent);
    document.body.appendChild(messageModal);
}


/***/ }),

/***/ "./frontend/src/utils/functions/updateUsersForDrawingArea.ts":
/*!*******************************************************************!*\
  !*** ./frontend/src/utils/functions/updateUsersForDrawingArea.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addUserToDrawingArea: () => (/* binding */ addUserToDrawingArea),
/* harmony export */   getUsersForDrawingArea: () => (/* binding */ getUsersForDrawingArea),
/* harmony export */   removeUserFromDrawingArea: () => (/* binding */ removeUserFromDrawingArea)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * Fügt einen Benutzer zu einer Zeichenfläche hinzu.
 * @param drawingAreaId - ID der Zeichenfläche
 * @param permission - Berechtigung des Benutzers, der hinzugefügt werden soll
 * @param userIdToAdd - ID des Benutzers, der hinzugefügt werden soll
 */
function addUserToDrawingArea(drawingAreaId, permission, userIdToAdd) {
    return __awaiter(this, void 0, void 0, function () {
        var response, errorData, data, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, fetch('/api/drawingArea/addUserToDrawingArea', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            credentials: 'include',
                            body: JSON.stringify({
                                drawingAreaId: drawingAreaId,
                                permission: permission,
                                userIdToAdd: userIdToAdd,
                            }),
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    errorData = _a.sent();
                    throw new Error("User konnte nicht hinzugef\u00FCgt werden: ".concat(errorData.message));
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    return [2 /*return*/, { success: true, message: data.message }];
                case 5:
                    e_1 = _a.sent();
                    return [2 /*return*/, {
                            success: false,
                            message: "".concat(e_1),
                        }];
                case 6: return [2 /*return*/];
            }
        });
    });
}
/**
 * Holt die Benutzer für eine Zeichenfläche.
 * @param drawingAreaId - ID der Zeichenfläche
 */
function getUsersForDrawingArea(drawingAreaId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, errorData, data, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, fetch('/api/drawingArea/getUsersFromDrawingArea', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            credentials: 'include',
                            body: JSON.stringify({
                                drawingAreaId: drawingAreaId,
                            }),
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    errorData = _a.sent();
                    throw new Error("User konnte nicht gefunden werden: ".concat(errorData.message));
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    return [2 /*return*/, { success: true, message: data.message, users: data.users }];
                case 5:
                    e_2 = _a.sent();
                    return [2 /*return*/, {
                            success: false,
                            message: "".concat(e_2),
                        }];
                case 6: return [2 /*return*/];
            }
        });
    });
}
/**
 * Entfernt einen Benutzer von einer Zeichenfläche.
 * @param drawingAreaId - ID der Zeichenfläche
 * @param userIdToRemove - ID des Benutzers, der entfernt werden soll
 */
function removeUserFromDrawingArea(drawingAreaId, userIdToRemove) {
    return __awaiter(this, void 0, void 0, function () {
        var response, errorData, data, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, fetch('/api/drawingArea/removeUserFromDrawingArea', {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            credentials: 'include',
                            body: JSON.stringify({
                                drawingAreaId: drawingAreaId,
                                userIdToRemove: userIdToRemove,
                            }),
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    errorData = _a.sent();
                    throw new Error("User konnte nicht entfernt werden: ".concat(errorData.message));
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    return [2 /*return*/, { success: true, message: data.message }];
                case 5:
                    e_3 = _a.sent();
                    return [2 /*return*/, {
                            success: false,
                            message: "".concat(e_3),
                        }];
                case 6: return [2 /*return*/];
            }
        });
    });
}


/***/ }),

/***/ "./frontend/src/utils/interfaces-types/customShapeEvents.ts":
/*!******************************************************************!*\
  !*** ./frontend/src/utils/interfaces-types/customShapeEvents.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IShapeAdded: () => (/* binding */ IShapeAdded),
/* harmony export */   IShapeEventType: () => (/* binding */ IShapeEventType),
/* harmony export */   IShapeRemoved: () => (/* binding */ IShapeRemoved),
/* harmony export */   IShapeSelected: () => (/* binding */ IShapeSelected),
/* harmony export */   IShapeUnselected: () => (/* binding */ IShapeUnselected)
/* harmony export */ });
/**
 * Die verschiedenen Typen von Events, die auftreten können
 */
var IShapeEventType;
(function (IShapeEventType) {
    IShapeEventType["IShapeAdded"] = "IShapeAdded";
    IShapeEventType["IShapeRemoved"] = "IShapeRemoved";
    IShapeEventType["IShapeSelected"] = "IShapeSelected";
    IShapeEventType["IShapeUnselected"] = "IShapeUnselected";
})(IShapeEventType || (IShapeEventType = {}));
var IShapeAdded = /** @class */ (function () {
    function IShapeAdded(iShape) {
        this.iShape = iShape;
        this.type = IShapeEventType.IShapeAdded;
    }
    return IShapeAdded;
}());

var IShapeRemoved = /** @class */ (function () {
    function IShapeRemoved(id) {
        this.id = id;
        this.type = IShapeEventType.IShapeRemoved;
    }
    return IShapeRemoved;
}());

var IShapeSelected = /** @class */ (function () {
    function IShapeSelected(iShape, userId) {
        this.iShape = iShape;
        this.userId = userId;
        this.type = IShapeEventType.IShapeSelected;
    }
    return IShapeSelected;
}());

var IShapeUnselected = /** @class */ (function () {
    function IShapeUnselected(id, userId) {
        this.id = id;
        this.userId = userId;
        this.type = IShapeEventType.IShapeUnselected;
    }
    return IShapeUnselected;
}());



/***/ }),

/***/ "./frontend/src/utils/interfaces-types/typesPermissions.ts":
/*!*****************************************************************!*\
  !*** ./frontend/src/utils/interfaces-types/typesPermissions.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   drawingAreaPermissions: () => (/* binding */ drawingAreaPermissions)
/* harmony export */ });
/**
 * Rechte, die ein Benutzer auf einer Zeichenfläche haben kann ausgeschrieben.
 */
var drawingAreaPermissions = {
    O: 'Owner',
    CO: 'Coowner',
    M: 'Moderator',
    V: 'VIP',
    W: 'Writer',
    R: 'Reader', // kann Zeichenfläche lesen
};


/***/ }),

/***/ "./frontend/src/utils/interfaces-types/typesShapes.ts":
/*!************************************************************!*\
  !*** ./frontend/src/utils/interfaces-types/typesShapes.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Point2D: () => (/* binding */ Point2D)
/* harmony export */ });
/**
 * Klasse für einen 2D-Punkt
 */
var Point2D = /** @class */ (function () {
    function Point2D(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point2D;
}());



/***/ }),

/***/ "./frontend/src/views/drawingArea.ts":
/*!*******************************************!*\
  !*** ./frontend/src/views/drawingArea.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DrawingArea: () => (/* binding */ DrawingArea)
/* harmony export */ });
/* harmony import */ var _utils_classes_CustomIShapeManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/classes/CustomIShapeManager */ "./frontend/src/utils/classes/CustomIShapeManager.ts");
/* harmony import */ var _utils_classes_ShapeFactories__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/classes/ShapeFactories */ "./frontend/src/utils/classes/ShapeFactories.ts");
/* harmony import */ var _utils_classes_ToolArea__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/classes/ToolArea */ "./frontend/src/utils/classes/ToolArea.ts");
/* harmony import */ var _utils_classes_Canvas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/classes/Canvas */ "./frontend/src/utils/classes/Canvas.ts");
/* harmony import */ var _utils_classes_EventFan__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/classes/EventFan */ "./frontend/src/utils/classes/EventFan.ts");
/* harmony import */ var _utils_interfaces_types_typesPermissions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/interfaces-types/typesPermissions */ "./frontend/src/utils/interfaces-types/typesPermissions.ts");
/* harmony import */ var _utils_functions_updateUsersForDrawingArea__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/functions/updateUsersForDrawingArea */ "./frontend/src/utils/functions/updateUsersForDrawingArea.ts");
/* harmony import */ var _utils_functions_getInformationForDrawingArea__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/functions/getInformationForDrawingArea */ "./frontend/src/utils/functions/getInformationForDrawingArea.ts");
/* harmony import */ var _utils_classes_SelectColorFactory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/classes/SelectColorFactory */ "./frontend/src/utils/classes/SelectColorFactory.ts");
/* harmony import */ var _store_DrawingAreaIShapesStore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../store/DrawingAreaIShapesStore */ "./frontend/src/store/DrawingAreaIShapesStore.ts");
/* harmony import */ var _utils_functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/functions/showCustomMessageModal */ "./frontend/src/utils/functions/showCustomMessageModal.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};











/**
 * Klasse für die eine DrawingArea-Seite.
 */
var DrawingArea = /** @class */ (function () {
    function DrawingArea(drawingAreaId, permission, authHandler) {
        this.moderatedState = false;
        this.iShapeStore = _store_DrawingAreaIShapesStore__WEBPACK_IMPORTED_MODULE_9__.DrawingAreaIShapesStore.getInstance();
        this.drawingAreaId = drawingAreaId;
        this.permission = permission;
        this.authHandler = authHandler;
    }
    /**
     * Rendert die Zeichenfläche.
     */
    DrawingArea.prototype.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, "\n            <p>W\u00E4hlen Sie auf der linken Seite Ihr Zeichenwerkzeug aus.\n            Haben Sie eines ausgew\u00E4hlt, k\u00F6nnen Sie mit der Maus\n            die entsprechenden Figuren zeichen. Typischerweise, indem\n            Sie die Maus dr\u00FCcken, dann mit gedr\u00FCckter Maustaste die\n            Form bestimmen, und dann anschlie\u00DFend die Maustaste loslassen.\n            </p>\n                        \n            <div class=\"custom-drawing-area-wrapper\" id=\"customDrawingAreaWrapper\">\n                <ul class=\"tools\" id=\"tools\"></ul>\n            \n                <canvas id=\"drawArea\" class=\"draw-area\" width=\"900\" height=\"800\"></canvas>      \n                \n                <section class=\"sub-custom-drawing-area-wrapper\">\n                    <p>Zeichenfl\u00E4che ID: ".concat(this.drawingAreaId, "</p>\n                    <p>Deine Rechte: ").concat(_utils_interfaces_types_typesPermissions__WEBPACK_IMPORTED_MODULE_5__.drawingAreaPermissions[this.permission], "</p>\n                    <p id=\"moderate-p\">Zustand der Zeichenfl\u00E4che: ").concat(this.moderatedState ? 'moderiert' : 'normal', "</p>\n                    <div class=\"dynamic-sub-custom-drawing-area-wrapper\" id=\"dynamic-sub-wrapper\">\n                    </div>\n                    <button class=\"custom-button\" id=\"back\">Zur\u00FCck zur \u00DCbersicht</button>     \n                    <button class=\"custom-button\" id=\"logout\">Logout</button>\n                    <p>Verbundene User auf dieser Zeichenfl\u00E4che:</p>      \n                    <ul id=\"connectedUsers\">               \n                       \n                    </ul> \n                </section> \n            </div>\n        ")];
            });
        });
    };
    /**
     * Initialisiert die Zeichenfläche.
     * @param router - Router-Instanz
     */
    DrawingArea.prototype.initialize = function (router) {
        return __awaiter(this, void 0, void 0, function () {
            var ws, canvasDomElm, menu, canvas, eventFan, sm, shapesSelector, toolArea, logoutButton, backButton, moderateP;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ws = new WebSocket("ws://localhost:3000/ws/drawingArea/".concat(this.drawingAreaId));
                        /**
                         * Event-Handler für die WebSocket-Verbindung bei Verbindungsaufbau.
                         */
                        ws.onopen = function () {
                            console.log("Verbunden mit DrawingArea: ".concat(_this.drawingAreaId));
                        };
                        /**
                         * Event-Handler für die WebSocket-Verbindung bei Verbindungsschluss.
                         */
                        ws.onclose = function () {
                            console.log("Verbindung zu DrawingArea ".concat(_this.drawingAreaId, " geschlossen"));
                        };
                        /**
                         * Event-Handler für die WebSocket-Verbindung bei verschiedenen Nachrichten.
                         * @param event - Event-Objekt vom Server
                         */
                        ws.onmessage = function (event) { return __awaiter(_this, void 0, void 0, function () {
                            var message, connectedUsersListElement_1, connectedUsers, selectColor, customDrawingAreaWrapper;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        message = JSON.parse(event.data);
                                        if (!(message.type === 'connectedUsers')) return [3 /*break*/, 1];
                                        connectedUsersListElement_1 = document.getElementById('connectedUsers');
                                        connectedUsers = message.connectedUsers;
                                        if (connectedUsersListElement_1) {
                                            connectedUsersListElement_1.innerHTML = '';
                                            connectedUsers.forEach(function (user) {
                                                var li = document.createElement('li');
                                                var span = document.createElement('span');
                                                span.innerText = "".concat(user.color);
                                                span.style.color = user.color;
                                                li.innerText = "User: ".concat(user.name, ", Selekt-Farbe: ");
                                                li.appendChild(span);
                                                connectedUsersListElement_1.appendChild(li);
                                            });
                                        }
                                        return [3 /*break*/, 10];
                                    case 1:
                                        if (!(message.type === 'selectColor')) return [3 /*break*/, 2];
                                        selectColor = message.selectColor;
                                        _utils_classes_SelectColorFactory__WEBPACK_IMPORTED_MODULE_8__.SelectColorFactory.setSelectColor(selectColor);
                                        return [3 /*break*/, 10];
                                    case 2:
                                        if (!(message.type === 'update')) return [3 /*break*/, 3];
                                        eventFan.applyEvents(message.event);
                                        return [3 /*break*/, 10];
                                    case 3:
                                        if (!(message.type === 'moderate')) return [3 /*break*/, 4];
                                        this.moderatedState = message.moderated;
                                        if (moderateP) {
                                            moderateP.innerText = "Zustand der Zeichenfl\u00E4che: ".concat(this.moderatedState ? 'moderiert' : 'normal');
                                        }
                                        if (this.permission === 'W') {
                                            if (this.moderatedState) {
                                                canvasDomElm.style.pointerEvents = 'none';
                                                menu.remove();
                                            }
                                            else {
                                                canvasDomElm.style.pointerEvents = 'auto';
                                                customDrawingAreaWrapper = document.getElementById('customDrawingAreaWrapper');
                                                if (customDrawingAreaWrapper) {
                                                    customDrawingAreaWrapper.insertBefore(menu, canvasDomElm);
                                                }
                                            }
                                        }
                                        return [3 /*break*/, 10];
                                    case 4:
                                        if (!(message.type === 'eventSuccess')) return [3 /*break*/, 5];
                                        eventFan.applyEvents(message.event);
                                        return [3 /*break*/, 10];
                                    case 5:
                                        if (!(message.type === 'error')) return [3 /*break*/, 6];
                                        (0,_utils_functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_10__.showCustomMessageModal)('Fehler', message.message);
                                        return [3 /*break*/, 10];
                                    case 6:
                                        if (!(message.type === 'criticalError')) return [3 /*break*/, 9];
                                        (0,_utils_functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_10__.showCustomMessageModal)('Kritischer Fehler', message.message);
                                        return [4 /*yield*/, this.authHandler.refreshDrawingAreas()];
                                    case 7:
                                        _a.sent();
                                        ws.close();
                                        return [4 /*yield*/, router.navigateTo('#/')];
                                    case 8:
                                        _a.sent();
                                        return [3 /*break*/, 10];
                                    case 9:
                                        (0,_utils_functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_10__.showCustomMessageModal)('Unbekannter Fehler', "Unbekannter Fehler vom Server: ".concat(message));
                                        _a.label = 10;
                                    case 10: return [2 /*return*/];
                                }
                            });
                        }); };
                        /**
                         * Registriert den WebSocket für die DrawingArea, damit der Router die Verbindung schließen kann, wenn die Seite verlassen wird.
                         */
                        router.registerWebsocket(ws);
                        canvasDomElm = document.getElementById('drawArea');
                        menu = document.getElementById('tools');
                        eventFan = new _utils_classes_EventFan__WEBPACK_IMPORTED_MODULE_4__.EventFan();
                        sm = new _utils_classes_CustomIShapeManager__WEBPACK_IMPORTED_MODULE_0__.CustomIShapeManager(eventFan, ws, this.authHandler.getUserId());
                        shapesSelector = [
                            new _utils_classes_ShapeFactories__WEBPACK_IMPORTED_MODULE_1__.LineFactory(sm),
                            new _utils_classes_ShapeFactories__WEBPACK_IMPORTED_MODULE_1__.CircleFactory(sm),
                            new _utils_classes_ShapeFactories__WEBPACK_IMPORTED_MODULE_1__.RectangleFactory(sm),
                            new _utils_classes_ShapeFactories__WEBPACK_IMPORTED_MODULE_1__.TriangleFactory(sm),
                            new _utils_classes_ShapeFactories__WEBPACK_IMPORTED_MODULE_1__.SelectorFactory(sm, this.authHandler.getUserId()),
                        ];
                        toolArea = new _utils_classes_ToolArea__WEBPACK_IMPORTED_MODULE_2__.ToolArea(shapesSelector, menu);
                        canvas = new _utils_classes_Canvas__WEBPACK_IMPORTED_MODULE_3__.Canvas(canvasDomElm, toolArea, this.authHandler.getUserId());
                        eventFan.register(canvas);
                        logoutButton = document.getElementById('logout');
                        if (logoutButton) {
                            logoutButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.authHandler.logout()];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, router.navigateTo('#/login')];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        backButton = document.getElementById('back');
                        if (backButton) {
                            backButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, router.navigateTo('#/')];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        /**
                         * Erstellt die dynamischen Buttons für die DrawingArea, abhängig von den Rechten des Users.
                         */
                        this.createDynamicButtons(ws);
                        /**
                         * Lädt die Informationen für die DrawingArea.
                         */
                        return [4 /*yield*/, this.getDrawingAreaInformation(eventFan, ws, router)];
                    case 1:
                        /**
                         * Lädt die Informationen für die DrawingArea.
                         */
                        _a.sent();
                        /**
                         * Ist der Zustand der Zeichenfläche moderiert, werden die Zeichenfläche und das Menü für den User, abhängig von den Rechten, gesperrt.
                         */
                        if ((this.moderatedState && this.permission === 'W') ||
                            this.permission === 'R') {
                            menu.remove();
                        }
                        moderateP = document.getElementById('moderate-p');
                        if (moderateP) {
                            moderateP.innerText = "Zustand der Zeichenfl\u00E4che: ".concat(this.moderatedState ? 'moderiert' : 'normal');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Lädt die Informationen für die DrawingArea.
     * @param eventFan - EventFan-Instanz
     * @param ws - WebSocket-Instanz
     * @param router - Router-Instanz
     */
    DrawingArea.prototype.getDrawingAreaInformation = function (eventFan, ws, router) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, success, message, isModerated, eventsForDrawingArea;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0,_utils_functions_getInformationForDrawingArea__WEBPACK_IMPORTED_MODULE_7__.getInformationForDrawingArea)(this.drawingAreaId)];
                    case 1:
                        _a = _b.sent(), success = _a.success, message = _a.message, isModerated = _a.isModerated, eventsForDrawingArea = _a.eventsForDrawingArea;
                        if (success &&
                            isModerated !== undefined &&
                            eventsForDrawingArea !== undefined) {
                            this.moderatedState = isModerated;
                            this.iShapeStore.setIShapes([]);
                            this.iShapeStore.setSelectedIShapes([]);
                            eventFan.applyEvents(eventsForDrawingArea);
                        }
                        if (!!success) return [3 /*break*/, 4];
                        (0,_utils_functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_10__.showCustomMessageModal)('Fehler', message);
                        ws.close();
                        return [4 /*yield*/, this.authHandler.refreshDrawingAreas()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, router.navigateTo('#/')];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Erstellt die dynamischen Buttons für die DrawingArea, abhängig von den Rechten des Users.
     * @param ws - WebSocket-Instanz
     */
    DrawingArea.prototype.createDynamicButtons = function (ws) {
        var _this = this;
        var dynamicSubWrapper = document.getElementById('dynamic-sub-wrapper');
        if (dynamicSubWrapper &&
            (this.permission === 'O' ||
                this.permission === 'CO' ||
                this.permission === 'M')) {
            /**
             * Button zum Einladen eines Users auf die DrawingArea.
             * Achtung: Die User-ID muss manuell eingegeben und in Erfahrung gebracht werden.
             */
            var inviteButton = document.createElement('button');
            inviteButton.classList.add('custom-button');
            inviteButton.innerText = 'User Einladen';
            inviteButton.id = 'invite';
            inviteButton.addEventListener('click', function () {
                _this.createInviteModal();
            });
            dynamicSubWrapper.appendChild(inviteButton);
            /**
             * Button zum Entfernen eines Users von der DrawingArea.
             */
            var removeUserButton = document.createElement('button');
            removeUserButton.classList.add('custom-button');
            removeUserButton.innerText = 'User Entfernen';
            removeUserButton.id = 'removeUser';
            removeUserButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.createRemoveUserModal()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            dynamicSubWrapper.appendChild(removeUserButton);
            /**
             * Button zum Setzten des Zustands der Zeichenfläche auf moderiert oder normal.
             */
            var moderateButton = document.createElement('button');
            moderateButton.classList.add('custom-button');
            moderateButton.innerText = 'Toggle Moderieren';
            moderateButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.moderateHandler(ws)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            dynamicSubWrapper.appendChild(moderateButton);
        }
    };
    /**
     * Handler für das Setzen des Zustands der Zeichenfläche auf moderiert oder normal.
     * @param ws - WebSocket-Instanz
     */
    DrawingArea.prototype.moderateHandler = function (ws) {
        return __awaiter(this, void 0, void 0, function () {
            var moderateEvent;
            return __generator(this, function (_a) {
                moderateEvent = {
                    type: 'moderate',
                    moderated: !this.moderatedState,
                };
                ws.send(JSON.stringify(moderateEvent));
                return [2 /*return*/];
            });
        });
    };
    /**
     * Erstellt das Modal zum Einladen eines Users auf die DrawingArea.
     */
    DrawingArea.prototype.createInviteModal = function () {
        var _this = this;
        var modal = document.createElement('div');
        modal.classList.add('modal');
        modal.style.display = 'block';
        var modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        var closeButton = document.createElement('span');
        closeButton.classList.add('close');
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', function () {
            document.body.removeChild(modal);
        });
        var inputLabel = document.createElement('label');
        inputLabel.textContent = 'User-ID: ';
        inputLabel.htmlFor = 'userId-input';
        var inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = 'Enter text here...';
        inputField.id = 'userId-input';
        inputField.style.width = '200px';
        var radioOptions = document.createElement('div');
        /**
         * Je nach Recht des Users werden die Rechte, die der eingeladene User auf der DrawingArea haben kann, angezeigt.
         */
        var permissionKeys = ['V', 'W', 'R'];
        if (this.permission === 'O') {
            permissionKeys.unshift('CO', 'M');
        }
        if (this.permission === 'CO') {
            permissionKeys.unshift('M');
        }
        permissionKeys.forEach(function (key) {
            var label = document.createElement('label');
            var radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'permission';
            radio.value = key;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(_utils_interfaces_types_typesPermissions__WEBPACK_IMPORTED_MODULE_5__.drawingAreaPermissions[key]));
            radioOptions.appendChild(label);
            radioOptions.appendChild(document.createElement('br'));
        });
        var submitButton = document.createElement('button');
        submitButton.textContent = 'Einladen';
        submitButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
            var userIdToAdd, permission, _a, success, message, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userIdToAdd = document.getElementById('userId-input').value;
                        permission = document.querySelector('input[name="permission"]:checked').value;
                        if (!userIdToAdd || !permission) {
                            (0,_utils_functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_10__.showCustomMessageModal)('Fehler', 'Bitte füllen Sie alle Felder aus!');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, (0,_utils_functions_updateUsersForDrawingArea__WEBPACK_IMPORTED_MODULE_6__.addUserToDrawingArea)(this.drawingAreaId, permission, userIdToAdd)];
                    case 1:
                        _a = _b.sent(), success = _a.success, message = _a.message;
                        (0,_utils_functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_10__.showCustomMessageModal)('Status', message);
                        if (success) {
                            document.body.removeChild(modal);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        (0,_utils_functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_10__.showCustomMessageModal)('Fehler', 'Bitte füllen Sie alle Felder aus!');
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        modalContent.appendChild(closeButton);
        modalContent.appendChild(inputLabel);
        modalContent.appendChild(inputField);
        modalContent.appendChild(radioOptions);
        modalContent.appendChild(submitButton);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    };
    /**
     * Erstellt das Modal zum Entfernen eines Users von der DrawingArea.
     */
    DrawingArea.prototype.createRemoveUserModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var deleteModal, modalContent, closeButton, usersForDrawingArea, table, thead, tr, th1, th2, th3, tbody_1, noDataInfo;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deleteModal = document.createElement('div');
                        deleteModal.classList.add('modal');
                        deleteModal.style.display = 'block';
                        modalContent = document.createElement('div');
                        modalContent.classList.add('modal-content');
                        closeButton = document.createElement('span');
                        closeButton.classList.add('close');
                        closeButton.innerHTML = '&times;';
                        closeButton.addEventListener('click', function () {
                            document.body.removeChild(deleteModal);
                        });
                        return [4 /*yield*/, (0,_utils_functions_updateUsersForDrawingArea__WEBPACK_IMPORTED_MODULE_6__.getUsersForDrawingArea)(this.drawingAreaId)];
                    case 1:
                        usersForDrawingArea = _a.sent();
                        if (usersForDrawingArea.users && usersForDrawingArea.users.length > 0) {
                            table = document.createElement('table');
                            thead = document.createElement('thead');
                            tr = document.createElement('tr');
                            th1 = document.createElement('th');
                            th1.textContent = 'User-ID';
                            th2 = document.createElement('th');
                            th2.textContent = 'Recht';
                            th3 = document.createElement('th');
                            th3.textContent = 'Aktion';
                            tr.appendChild(th1);
                            tr.appendChild(th2);
                            tr.appendChild(th3);
                            thead.appendChild(tr);
                            table.appendChild(thead);
                            tbody_1 = document.createElement('tbody');
                            usersForDrawingArea.users.forEach(function (user) {
                                var tr = document.createElement('tr');
                                var td1 = document.createElement('td');
                                td1.textContent = user.userId;
                                var td2 = document.createElement('td');
                                td2.textContent = _utils_interfaces_types_typesPermissions__WEBPACK_IMPORTED_MODULE_5__.drawingAreaPermissions[user.permission];
                                var td3 = document.createElement('td');
                                var button = document.createElement('button');
                                button.textContent = 'Remove';
                                button.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                                    var _a, success, message;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, (0,_utils_functions_updateUsersForDrawingArea__WEBPACK_IMPORTED_MODULE_6__.removeUserFromDrawingArea)(this.drawingAreaId, user.userId)];
                                            case 1:
                                                _a = _b.sent(), success = _a.success, message = _a.message;
                                                (0,_utils_functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_10__.showCustomMessageModal)('Status', message);
                                                if (success) {
                                                    document.body.removeChild(deleteModal);
                                                }
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                td3.appendChild(button);
                                tr.appendChild(td1);
                                tr.appendChild(td2);
                                tr.appendChild(td3);
                                tbody_1.appendChild(tr);
                            });
                            table.style.borderSpacing = '10px';
                            table.appendChild(tbody_1);
                            modalContent.appendChild(closeButton);
                            modalContent.appendChild(table);
                            deleteModal.appendChild(modalContent);
                        }
                        else {
                            noDataInfo = document.createElement('p');
                            noDataInfo.textContent = 'Keine User gefunden';
                            modalContent.appendChild(closeButton);
                            modalContent.appendChild(noDataInfo);
                            deleteModal.appendChild(modalContent);
                        }
                        document.body.appendChild(deleteModal);
                        return [2 /*return*/];
                }
            });
        });
    };
    return DrawingArea;
}());



/***/ }),

/***/ "./frontend/src/views/home.ts":
/*!************************************!*\
  !*** ./frontend/src/views/home.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomePage: () => (/* binding */ HomePage)
/* harmony export */ });
/* harmony import */ var _store_DrawingAreaPreviewElementsStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store/DrawingAreaPreviewElementsStore */ "./frontend/src/store/DrawingAreaPreviewElementsStore.ts");
/* harmony import */ var _utils_functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/functions/showCustomMessageModal */ "./frontend/src/utils/functions/showCustomMessageModal.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


/**
 * Klasse für die Home-Seite.
 */
var HomePage = /** @class */ (function () {
    function HomePage() {
    }
    /**
     * Rendert die Home-Seite.
     */
    HomePage.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, "\n             <main class=\"container-home\">\n                <section class=\"container-header\">\n                    <img src=\"../assets/tha_logo.svg\" alt=\"Logo\" />\n                     <div class=\"sub-container-header-text\">\n                        <h2>Willkommen bei meinem Multiuser-Zeichenprogramm!</h2>\n                        <h4>von Michael Mertl im SoSe2024</h4>\n                     </div>\n                     <button id=\"logout-button\" class=\"custom-button\">Logout</button>\n                </section>\n                \n                <section class=\"container-main\">\n                    <h2>Profileinstellungen</h2>\n                    <section class=\"container-profile-settings\">\n                        <div class=\"sub-container-profile-settings\">\n                            <label for=\"userId\">User ID:</label>\n                            <span id=\"userId\"></span>\n                        </div>\n                        <div class=\"sub-container-profile-settings\">\n                            <label for=\"username\">Aktueller Benutzername: </label>\n                            <span id=\"username\"></span>\n                            <form class=\"sub-container-profile-settings\" id=\"username-form\">\n                                <label for=\"new-username\">Neuer Benutzername: </label>\n                                <input type=\"text\" id=\"new-username\" name=\"new-username\" required>\n                                <button type=\"submit\" class=\"custom-button\">Benutzername speichern</button>\n                            </form>      \n                        </div>\n                        <div class=\"sub-container-profile-settings\">\n                            <label for=\"email\">Aktuelle E-Mail: </label>\n                            <span id=\"email\"></span>\n                            <form class=\"sub-container-profile-settings\" id=\"email-form\">\n                                <label for=\"new-email\">Neue E-Mail: </label>\n                                <input type=\"text\" id=\"new-email\" name=\"new-email\" required>\n                                <button type=\"submit\" class=\"custom-button\">E-Mail speichern</button>\n                            </form>      \n                        </div>                        \n                        <form class=\"sub-container-profile-settings\" id=\"password-form\">\n                            <label for=\"old-password\">Altes Passwort:</label>\n                            <input type=\"password\" id=\"old-password\" name=\"old-password\" required>\n                            <label for=\"new-password\">Neues Passwort:</label>\n                            <input type=\"password\" id=\"new-password\" name=\"new-password\" required>\n                            <label for=\"confirm-new-password\">Neues Passwort best\u00E4tigen:</label>\n                            <input type=\"password\" id=\"confirm-new-password\" name=\"confirm-new-password\" required>\n                            <button type=\"submit\" class=\"custom-button\">Passwort speichern</button>\n                        </form>      \n                    </section>\n                </section>      \n                \n                <section class=\"container-main\">\n                    <h2>Zeichenfl\u00E4chen</h2>\n                    <div class=\"sub-container-main\">\n                      <button class=\"custom-button\" id=\"add-drawing-area-button\">Neue Zeichenfl\u00E4che erstellen</button>\n                      <button class=\"custom-button\" id=\"refresh-drawing-area-button\">Zeichen-fl\u00E4chen neu Laden</button>\n                    </div>\n                    <section class=\"container-preview-drawing-area\" id=\"preview-drawing-area\"> \n                    </section>\n                </section>           \n            </main>\n        "];
            });
        });
    };
    /**
     * Initialisiert die Home-Seite.
     * @param router - Router-Instanz.
     * @param authHandler - AuthHandler-Instanz.
     */
    HomePage.initialize = function (router, authHandler) {
        var _this = this;
        /**
         * Setzt die Benutzerinformationen in die entsprechenden Elemente.
         */
        var userIdElement = document.getElementById('userId');
        if (userIdElement) {
            userIdElement.innerText = authHandler.getUserId();
        }
        var usernameElement = document.getElementById('username');
        if (usernameElement) {
            usernameElement.innerText = authHandler.getUsername();
        }
        var emailElement = document.getElementById('email');
        if (emailElement) {
            emailElement.innerText = authHandler.getEMail();
        }
        /**
         * Event-Listener für die Profileinstellungen.
         */
        var logoutButton = document.getElementById('logout-button');
        if (logoutButton) {
            logoutButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, authHandler.logout()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, router.navigateTo('#/login')];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        /**
         * Event-Listener für die Änderung des Benutzernamens.
         */
        var usernameForm = document.getElementById('username-form');
        if (usernameForm) {
            usernameForm.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
                var newUsername, _a, success, message, newUsernameInput;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            event.preventDefault();
                            newUsername = document.getElementById('new-username').value;
                            return [4 /*yield*/, authHandler.updateUsername(newUsername)];
                        case 1:
                            _a = _b.sent(), success = _a.success, message = _a.message;
                            (0,_utils_functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_1__.showCustomMessageModal)('Status', message);
                            if (success && usernameElement) {
                                usernameElement.innerText = newUsername;
                                newUsernameInput = document.getElementById('new-username');
                                newUsernameInput.value = '';
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        /**
         * Event-Listener für die Änderung der E-Mail-Adresse.
         */
        var emailForm = document.getElementById('email-form');
        if (emailForm) {
            emailForm.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
                var newEmail, _a, success, message, newEmailInput;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            event.preventDefault();
                            newEmail = document.getElementById('new-email').value;
                            return [4 /*yield*/, authHandler.updateEmail(newEmail)];
                        case 1:
                            _a = _b.sent(), success = _a.success, message = _a.message;
                            (0,_utils_functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_1__.showCustomMessageModal)('Status', message);
                            if (success && emailElement) {
                                emailElement.innerText = newEmail;
                                newEmailInput = document.getElementById('new-email');
                                newEmailInput.value = '';
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        /**
         * Event-Listener für die Änderung des Passworts.
         */
        var passwordForm = document.getElementById('password-form');
        if (passwordForm) {
            passwordForm.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
                var oldPassword, newPassword, confirmNewPassword, _a, success, message, oldPasswordInput, newPasswordInput, confirmNewPasswordInput;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            event.preventDefault();
                            oldPassword = document.getElementById('old-password').value;
                            newPassword = document.getElementById('new-password').value;
                            confirmNewPassword = document.getElementById('confirm-new-password').value;
                            if (newPassword !== confirmNewPassword) {
                                (0,_utils_functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_1__.showCustomMessageModal)('Fehler', 'Die neuen Passwörter stimmen nicht überein!');
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, authHandler.updatePassword(oldPassword, newPassword)];
                        case 1:
                            _a = _b.sent(), success = _a.success, message = _a.message;
                            (0,_utils_functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_1__.showCustomMessageModal)('Status', message);
                            if (success) {
                                oldPasswordInput = document.getElementById('old-password');
                                newPasswordInput = document.getElementById('new-password');
                                confirmNewPasswordInput = document.getElementById('confirm-new-password');
                                oldPasswordInput.value = '';
                                newPasswordInput.value = '';
                                confirmNewPasswordInput.value = '';
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        var parentElement = document.getElementById('preview-drawing-area');
        if (!parentElement) {
            return;
        }
        /**
         * Erstellt die Vorschau-Zeichenflächen-Elemente auf der Home-Seite.
         */
        var drawingAreaPreviewElementsStore = _store_DrawingAreaPreviewElementsStore__WEBPACK_IMPORTED_MODULE_0__.DrawingAreaPreviewElementsStore.getInstance();
        drawingAreaPreviewElementsStore
            .getDrawingAreaPreviewElements()
            .forEach(function (dap) {
            dap.initialize(router, authHandler, parentElement, drawingAreaPreviewElementsStore);
        });
        /**
         * Event-Listener für das Hinzufügen einer neuen Zeichenfläche.
         */
        var addDrawingAreaButton = document.getElementById('add-drawing-area-button');
        if (addDrawingAreaButton) {
            addDrawingAreaButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                var drawingAreaPreview, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, drawingAreaPreviewElementsStore.addDrawingAreaPreviewElements()];
                        case 1:
                            drawingAreaPreview = _a.sent();
                            drawingAreaPreview.initialize(router, authHandler, parentElement, drawingAreaPreviewElementsStore);
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            (0,_utils_functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_1__.showCustomMessageModal)('Fehler', "".concat(e_1));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
        }
        /**
         * Event-Listener für das Aktualisieren der Vorschau-Zeichenflächen-Elemente.
         * Nötig, da man so jederzeit die Vorschau-Zeichenflächen-Elemente aktualisieren kann.
         * Es kann nämlich jederzeit vorkommen, dass man zu einer neuen Zeichenfläche hinzugefügt oder von einer entfernt wird.
         */
        var refreshDrawingAreaButton = document.getElementById('refresh-drawing-area-button');
        if (refreshDrawingAreaButton) {
            refreshDrawingAreaButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, success, message, e_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, authHandler.refreshDrawingAreas()];
                        case 1:
                            _a = _b.sent(), success = _a.success, message = _a.message;
                            if (success) {
                                parentElement.innerHTML = '';
                                drawingAreaPreviewElementsStore
                                    .getDrawingAreaPreviewElements()
                                    .forEach(function (dap) {
                                    dap.initialize(router, authHandler, parentElement, drawingAreaPreviewElementsStore);
                                });
                            }
                            (0,_utils_functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_1__.showCustomMessageModal)('Status', message);
                            return [3 /*break*/, 3];
                        case 2:
                            e_2 = _b.sent();
                            (0,_utils_functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_1__.showCustomMessageModal)('Fehler', "".concat(e_2));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
        }
    };
    return HomePage;
}());



/***/ }),

/***/ "./frontend/src/views/login.ts":
/*!*************************************!*\
  !*** ./frontend/src/views/login.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginPage: () => (/* binding */ LoginPage)
/* harmony export */ });
/* harmony import */ var _utils_functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/functions/showCustomMessageModal */ "./frontend/src/utils/functions/showCustomMessageModal.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

/**
 * Klasse für die Login-Seite.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage() {
    }
    /**
     * Rendert die Login-Seite.
     */
    LoginPage.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, "\n            <main class=\"container\">\n                <section class=\"container-header\">\n                    <img src=\"../assets/tha_logo.svg\" alt=\"Logo\" />\n                     <div class=\"sub-container-header-text\">\n                        <h2>Willkommen bei meinem Multiuser-Zeichenprogramm!</h2>\n                        <h4>von Michael Mertl im SoSe2024</h4>\n                     </div>\n                </section>\n                \n                <section class=\"container-main\">\n                    <h2>Login</h2>\n                    <form id=\"login-form\" class=\"sub-container-main-form\">\n                        <label for=\"username\">Benutzername:</label>\n                        <input type=\"text\" id=\"username\" name=\"username\" required>\n                        <label for=\"email\">E-Mail:</label>\n                        <input type=\"text\" id=\"email\" name=\"email\" required>\n                        <label for=\"password\">Passwort:</label>\n                        <input type=\"password\" id=\"password\" name=\"password\" required>\n                        <button type=\"submit\" class=\"custom-button\">Login</button>\n                    </form>\n                </section>\n                \n                <section class=\"container-footer\">\n                    <p>Noch keinen Account? \n                        <span id=\"register-button\" class=\"container-footer-text-button\">Hier Registrieren</span>\n                    </p>\n                </section>\n            </main>\n        "];
            });
        });
    };
    /**
     * Initialisiert die Login-Seite.
     * @param router - Router-Instanz
     * @param authHandler - AuthHandler-Instanz
     */
    LoginPage.initialize = function (router, authHandler) {
        var _this = this;
        /**
         * Event-Listener für das Login-Formular
         */
        var loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
                var username, email, password, _a, success, message;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            event.preventDefault();
                            username = document.getElementById('username').value;
                            email = document.getElementById('email')
                                .value;
                            password = document.getElementById('password').value;
                            return [4 /*yield*/, authHandler.login(username, email, password)];
                        case 1:
                            _a = _b.sent(), success = _a.success, message = _a.message;
                            (0,_utils_functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_0__.showCustomMessageModal)('Status', message);
                            if (!success) return [3 /*break*/, 3];
                            return [4 /*yield*/, router.navigateTo('#/')];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
        }
        /**
         * Event-Listener für den Registrieren-Button, der den Benutzer zur Registrierungsseite weiterleitet.
         */
        var registerButton = document.getElementById('register-button');
        if (registerButton) {
            registerButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, router.navigateTo('#/register')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        }
    };
    return LoginPage;
}());



/***/ }),

/***/ "./frontend/src/views/notFound.ts":
/*!****************************************!*\
  !*** ./frontend/src/views/notFound.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NotFoundPage: () => (/* binding */ NotFoundPage)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * Klasse für die 404-Seite.
 */
var NotFoundPage = /** @class */ (function () {
    function NotFoundPage() {
    }
    /**
     * Rendert die 404-Seite.
     */
    NotFoundPage.render = function () {
        return "\n             <main class=\"container\">\n                <section class=\"container-header\">\n                    <img src=\"../assets/tha_logo.svg\" alt=\"Logo\" />\n                     <div class=\"sub-container-header-text\">\n                        <h2>Willkommen bei meinem Multiuser-Zeichenprogramm!</h2>\n                        <h4>von Michael Mertl im SoSe2024</h4>\n                     </div>\n                </section>\n                \n                <section class=\"container-main\">\n                    <h2>Error 404</h2>\n                    <p>Die Seite, die Sie suchen, existiert nicht.</p>\n                </section>\n                \n                <section class=\"container-footer\">\n                    <p>Hier geht es zur\u00FCck zur\n                        <span id=\"back-to-home\" class=\"container-footer-text-button\">Startseite</span>\n                    </p>\n                </section>\n            </main>\n        ";
    };
    /**
     * Initialisiert die 404-Seite.
     * @param router - Router-Instanz
     * @param authHandler - AuthHandler-Instanz
     */
    NotFoundPage.initialize = function (router, authHandler) {
        var _this = this;
        /**
         * Event-Listener für den "Zurück zur Startseite"-Button.
         */
        var backToHome = document.getElementById('back-to-home');
        if (backToHome) {
            backToHome.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!authHandler.isLoggedIn()) return [3 /*break*/, 2];
                            return [4 /*yield*/, router.navigateTo('#/')];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, router.navigateTo('#/login')];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
        }
    };
    return NotFoundPage;
}());



/***/ }),

/***/ "./frontend/src/views/register.ts":
/*!****************************************!*\
  !*** ./frontend/src/views/register.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RegisterPage: () => (/* binding */ RegisterPage)
/* harmony export */ });
/* harmony import */ var _utils_functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/functions/showCustomMessageModal */ "./frontend/src/utils/functions/showCustomMessageModal.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

/**
 * Klasse für die Registrierungs-Seite.
 */
var RegisterPage = /** @class */ (function () {
    function RegisterPage() {
    }
    /**
     * Rendert die Registrierungs-Seite.
     */
    RegisterPage.render = function () {
        return "\n            <main class=\"container\">\n                <section class=\"container-header\">\n                    <img src=\"../assets/tha_logo.svg\" alt=\"Logo\" />\n                     <div class=\"sub-container-header-text\">\n                        <h2>Willkommen bei meinem Multiuser-Zeichenprogramm!</h2>\n                        <h4>von Michael Mertl im SoSe2024</h4>\n                     </div>\n                </section>\n                \n                <section class=\"container-main\">\n                    <h2>Registrieren</h2>\n                    <form id=\"register-form\" class=\"sub-container-main-form\">\n                         <label for=\"username\">Benutzername:</label>\n                        <input type=\"text\" id=\"username\" name=\"username\" required>\n                        <label for=\"email\">E-Mail:</label>\n                        <input type=\"text\" id=\"email\" name=\"email\" required>\n                        <label for=\"password\">Passwort:</label>\n                        <input type=\"password\" id=\"password\" name=\"password\" required>\n                        <label for=\"password-confirm\">Passwort best\u00E4tigen:</label>\n                        <input type=\"password\" id=\"password-confirm\" name=\"password-confirm\" required>\n                        <button type=\"submit\" class=\"custom-button\">Registrieren</button>\n                    </form>\n                </section>\n                \n                <section class=\"container-footer\">\n                    <p>Bereits einen Account?\n                        <span id=\"login-button\" class=\"container-footer-text-button\">Hier Einloggen</span>\n                    </p>\n                </section>\n            </main>\n        ";
    };
    /**
     * Initialisiert die Registrierungs-Seite.
     * @param router - Router-Instanz
     * @param authHandler - AuthHandler-Instanz
     */
    RegisterPage.initialize = function (router, authHandler) {
        var _this = this;
        /**
         * Event-Listener für das Registrierungs-Formular.
         */
        var registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
                var username, email, password, passwordConfirm, _a, success, message;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            event.preventDefault();
                            username = document.getElementById('username').value;
                            email = document.getElementById('email')
                                .value;
                            password = document.getElementById('password').value;
                            passwordConfirm = document.getElementById('password-confirm').value;
                            if (password !== passwordConfirm) {
                                (0,_utils_functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_0__.showCustomMessageModal)('Fehler', 'Passwörter stimmen nicht überein.');
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, authHandler.register(username, email, password)];
                        case 1:
                            _a = _b.sent(), success = _a.success, message = _a.message;
                            (0,_utils_functions_showCustomMessageModal__WEBPACK_IMPORTED_MODULE_0__.showCustomMessageModal)('Status', message);
                            if (!success) return [3 /*break*/, 3];
                            return [4 /*yield*/, router.navigateTo('#/login')];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
        }
        /**
         * Event-Listener für den "Hier Einloggen"-Button, der den Benutzer zur Login-Seite weiterleitet.
         */
        var loginButton = document.getElementById('login-button');
        if (loginButton) {
            loginButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, router.navigateTo('#/login')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        }
    };
    return RegisterPage;
}());



/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/native.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/native.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).

var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }
  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");


/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  //
  // Note to future-self: No, you can't remove the `toLowerCase()` call.
  // REF: https://github.com/uuidjs/uuid/pull/677#issuecomment-1757351351
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
function stringify(arr, offset = 0) {
  var uuid = unsafeStringify(arr, offset);
  // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields
  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }
  return uuid;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ "./node_modules/uuid/dist/esm-browser/native.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");



function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
  }
  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    offset = offset || 0;
    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");

function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./frontend/src/main.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _router_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router/router */ "./frontend/src/router/router.ts");
/* harmony import */ var _utils_classes_AuthHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/classes/AuthHandler */ "./frontend/src/utils/classes/AuthHandler.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


/**
 * Initialisiert die App und den Router, nachdem der DOM geladen wurde.
 */
document.addEventListener('DOMContentLoaded', function (e) { return __awaiter(void 0, void 0, void 0, function () {
    var app, authHandler, router;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.stopImmediatePropagation();
                app = document.getElementById('app');
                if (!app) return [3 /*break*/, 3];
                authHandler = new _utils_classes_AuthHandler__WEBPACK_IMPORTED_MODULE_1__.AuthHandler();
                return [4 /*yield*/, authHandler.init()];
            case 1:
                _a.sent();
                router = new _router_router__WEBPACK_IMPORTED_MODULE_0__.Router(app, authHandler);
                return [4 /*yield*/, router.init()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });

/******/ })()
;
//# sourceMappingURL=main.js.map