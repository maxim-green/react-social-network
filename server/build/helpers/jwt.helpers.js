"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateTokens = async (user, remember = false) => {
    const accessToken = jsonwebtoken_1.default.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_PERIOD });
    const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: remember ? process.env.REFRESH_TOKEN_EXPIRE_PERIOD_LONG : process.env.REFRESH_TOKEN_EXPIRE_PERIOD_SHORT });
    user.refreshToken = await bcryptjs_1.default.hash(refreshToken, 10);
    await user.save();
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.helpers.js.map