"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("middleware");
const router = express_1.default.Router();
// /coreApi/auth/me
router.get('/', middleware_1.auth, middleware_1.requireAuth, async (req, res) => {
    try {
        res.status(200).json({ resultCode: 0, message: "Authorized", data: { user: req.user.toObject() } });
    }
    catch (e) {
        res.handleError(e);
    }
});
exports.default = router;
//# sourceMappingURL=me.route.js.map