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
exports.deleteFile = exports.removeItem = void 0;
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
__exportStar(require("./error.helpers"), exports);
__exportStar(require("./jwt.helpers"), exports);
const removeItem = (array, value) => {
    const index = array.indexOf(value);
    if (index > -1) {
        array.splice(index, 1);
    }
};
exports.removeItem = removeItem;
const stripUrl = (url, baseUrl = `${process.env.URL}:${process.env.PORT}/`) => {
    return url.replace(baseUrl, '');
};
const deleteFile = async (url) => {
    try {
        const filePath = path_1.default.join(__root, ...stripUrl(url).split('/'));
        await (0, promises_1.unlink)(filePath);
    }
    catch (e) {
        console.log(e);
    }
};
exports.deleteFile = deleteFile;
//# sourceMappingURL=index.js.map