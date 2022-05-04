"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("middleware");
const services_1 = require("services");
const avatar_route_1 = __importDefault(require("./avatar/avatar.route"));
const cover_route_1 = __importDefault(require("./cover/cover.route"));
const status_route_1 = __importDefault(require("./status/status.route"));
const router = express_1.default.Router();
router.use('/avatar', avatar_route_1.default);
router.use('/cover', cover_route_1.default);
router.use('/status', status_route_1.default);
router.get('/:username', async (req, res) => {
    try {
        const user = await (0, services_1.getUserProfile)(req.params.username);
        res.status(200).json({ resultCode: 0, message: 'Success', data: { user: user.toObject() } });
    }
    catch (e) {
        res.handleError(e);
    }
});
router.put('/', middleware_1.auth, middleware_1.requireAuth, async (req, res) => {
    try {
        await (0, services_1.updateProfile)(req.user, req.body);
        res.status(200).json({ resultCode: 0, message: 'Success' });
    }
    catch (e) {
        res.handleError(e);
    }
});
exports.default = router;
//# sourceMappingURL=profile.route.js.map