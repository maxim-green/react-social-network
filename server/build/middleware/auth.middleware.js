"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketAuth = exports.requireAuth = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const services_1 = require("services");
const helpers_1 = require("helpers");
const cookie_1 = __importDefault(require("cookie"));
const auth = async (req, res, next) => {
    if (req.method === 'OPTIONS')
        return next();
    try {
        if (!req.cookies.accessToken)
            return next();
        req.user = await (0, services_1.getUserByAccessToken)(req.cookies.accessToken);
        return next();
    }
    catch (e) {
        if (e instanceof jsonwebtoken_1.default.JsonWebTokenError)
            console.log('Invalid access token');
        if (e instanceof jsonwebtoken_1.default.TokenExpiredError)
            console.log('Expired access token');
        return next();
    }
};
exports.auth = auth;
const requireAuth = (req, res, next) => {
    try {
        const { user } = req;
        if (!user) {
            throw new helpers_1.HTTPError(401, { resultCode: 1, message: 'Not authorized' });
        }
        else {
            return next();
        }
    }
    catch (e) {
        res.handleError(e);
    }
};
exports.requireAuth = requireAuth;
const socketAuth = async (socket, next) => {
    try {
        if (!socket.request.headers['cookie']) {
            return next(new Error('Socket connection error. Not authorized'));
        }
        const cookies = cookie_1.default.parse(socket.request.headers['cookie']);
        const { accessToken } = cookies;
        if (!accessToken) {
            return next(new Error('Socket connection error. Not authorized'));
        }
        socket.user = await (0, services_1.getUserByAccessToken)(accessToken);
        return next();
    }
    catch (e) {
        if (e instanceof jsonwebtoken_1.default.JsonWebTokenError)
            console.log('Invalid access token');
        if (e instanceof jsonwebtoken_1.default.TokenExpiredError)
            console.log('Expired access token');
        return next(new Error('Socket connection error. Not authorized'));
    }
};
exports.socketAuth = socketAuth;
//# sourceMappingURL=auth.middleware.js.map