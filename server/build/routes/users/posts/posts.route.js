"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const services_1 = require("services");
const router = express_1.default.Router();
// todo: fill doc file
// /api/user/:username/post
router.get('/:username/posts', async (req, res) => {
    try {
        const posts = await (0, services_1.getUserPosts)(req.params.username);
        return res.status(200).json({ resultCode: 0, message: 'Success', data: { posts } });
    }
    catch (e) {
        res.handleError(e);
    }
});
exports.default = router;
//# sourceMappingURL=posts.route.js.map