"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("middleware");
const services_1 = require("services");
const router = express_1.default.Router();
// /api/subscription/:targetUserId
router.post('/:targetUserId', middleware_1.auth, middleware_1.requireAuth, async (req, res) => {
    try {
        await (0, services_1.createSubscription)(req.user, req.params.targetUserId);
        res.status(200).json({ resultCode: 0, message: 'Success' });
    }
    catch (e) {
        res.handleError(e);
    }
});
// /api/subscription/:targetUserId
router.delete('/:targetUserId', middleware_1.auth, middleware_1.requireAuth, async (req, res) => {
    try {
        await (0, services_1.deleteSubscription)(req.user, req.params.targetUserId);
        res.status(200).json({ resultCode: 0, message: 'Success' });
    }
    catch (e) {
        res.handleError(e);
    }
});
exports.default = router;
//# sourceMappingURL=subscription.route.js.map