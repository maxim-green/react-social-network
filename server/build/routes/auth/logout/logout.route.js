"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("middleware");
const services_1 = require("services");
const router = express_1.default.Router();
// /coreApi/auth/logout
router.delete('/', middleware_1.auth, middleware_1.requireAuth, async (req, res) => {
    try {
        await (0, services_1.logoutUser)(req.user);
        res
            .clearCookie('accessToken')
            .clearCookie('refreshToken')
            .status(200)
            .json({ resultCode: 0, message: "Success" });
    }
    catch (e) {
        res.handleError(e);
    }
});
exports.default = router;
//# sourceMappingURL=logout.route.js.map