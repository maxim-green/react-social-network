"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressApp = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const serve_static_1 = __importDefault(require("serve-static"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("routes"));
const middleware_1 = require("middleware");
const expressApp = (0, express_1.default)();
exports.expressApp = expressApp;
expressApp.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
expressApp.use(body_parser_1.default.json());
expressApp.use((0, cookie_parser_1.default)());
expressApp.use(middleware_1.withErrorHandler);
expressApp.use('/uploads', (0, serve_static_1.default)(path_1.default.join(__dirname, '../../uploads')));
expressApp.use('/api', routes_1.default);
//# sourceMappingURL=express.config.js.map