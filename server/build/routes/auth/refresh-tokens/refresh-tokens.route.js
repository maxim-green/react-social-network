"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const services_1 = require("services");
const router = express_1.default.Router();
// /api/auth/refresh-tokens
router.post('/', async (req, res) => {
    try {
        const { accessToken, refreshToken } = await (0, services_1.refreshTokens)(req.cookies.refreshToken);
        res
            .cookie("accessToken", accessToken, { httpOnly: true }) // add secure: process.env.NODE_ENV === "production" option
            .cookie("refreshToken", refreshToken, { httpOnly: true }) // add secure: process.env.NODE_ENV === "production" option
            .status(200)
            .json({ resultCode: 0, message: "Success" });
    }
    catch (e) {
        res.handleError(e);
    }
});
exports.default = router;
//# sourceMappingURL=refresh-tokens.route.js.map