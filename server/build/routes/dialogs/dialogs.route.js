"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("middleware");
const services_1 = require("services");
const router = express_1.default.Router();
// /api/dialogs/
router.get('/', middleware_1.auth, middleware_1.requireAuth, async (req, res) => {
    try {
        const dialogs = await (0, services_1.findUserDialogs)(req.user.id);
        res.status(200).json({ resultCode: 0, message: 'Success', data: { dialogs } });
    }
    catch (e) {
        res.handleError(e);
    }
});
// /api/dialogs/:username
router.get('/:username', middleware_1.auth, middleware_1.requireAuth, async (req, res) => {
    try {
        const targetUser = await (0, services_1.findUser)({ username: req.params.username });
        const dialog = await (0, services_1.findDialog)(req.user.id, targetUser.id);
        const resultDialog = dialog ? dialog : await (0, services_1.createDialog)(req.user.id, targetUser.id);
        res.status(200).json({ resultCode: 0, message: 'Success', data: { dialog: resultDialog } });
    }
    catch (e) {
        res.handleError(e);
    }
});
exports.default = router;
//# sourceMappingURL=dialogs.route.js.map