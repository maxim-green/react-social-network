"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDialog = exports.findDialog = exports.findUserDialogs = exports.default = void 0;
var dialogs_route_1 = require("./dialogs.route");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(dialogs_route_1).default; } });
__exportStar(require("./dialogs.route"), exports);
var Dialog_service_1 = require("../../services/Dialog.service");
Object.defineProperty(exports, "findUserDialogs", { enumerable: true, get: function () { return Dialog_service_1.findUserDialogs; } });
var Dialog_service_2 = require("../../services/Dialog.service");
Object.defineProperty(exports, "findDialog", { enumerable: true, get: function () { return Dialog_service_2.findDialog; } });
var Dialog_service_3 = require("../../services/Dialog.service");
Object.defineProperty(exports, "createDialog", { enumerable: true, get: function () { return Dialog_service_3.createDialog; } });
//# sourceMappingURL=index.tsx.map
