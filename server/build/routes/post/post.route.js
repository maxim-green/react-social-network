"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const middleware_1 = require("middleware");
const services_1 = require("services");
const helpers_1 = require("helpers");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    try {
        const posts = await (0, services_1.getPosts)();
        res.status(200).json({ resultCode: 0, message: 'Success', data: { posts } });
    }
    catch (e) {
        res.handleError(e);
    }
});
router.get('/feed', middleware_1.auth, middleware_1.requireAuth, async (req, res) => {
    try {
        const userPosts = await (0, services_1.getUserPosts)(req.user.username);
        const subscriptionsPosts = await (0, services_1.getSubscriptionsPosts)(req.user);
        res.status(200).json({ resultCode: 0, message: 'Success', data: { posts: [...userPosts, ...subscriptionsPosts] } });
    }
    catch (e) {
        res.handleError(e);
    }
});
//todo add documentation for this route
router.post('/:postId/like', middleware_1.auth, middleware_1.requireAuth, async (req, res) => {
    try {
        await (0, services_1.addLike)(req.params.postId, req.user);
        res.status(200).json({ resultCode: 0, message: 'Success' });
    }
    catch (e) {
        res.handleError(e);
    }
});
//todo add documentation for this route
router.delete('/:postId/like', middleware_1.auth, middleware_1.requireAuth, async (req, res) => {
    try {
        await (0, services_1.deleteLike)(req.params.postId, req.user);
        res.status(200).json({ resultCode: 0, message: 'Success' });
    }
    catch (e) {
        res.handleError(e);
    }
});
// /api/post/:postId
router.get('/:postId', async (req, res) => {
    try {
        const post = await (0, services_1.getPost)(req.params.postId);
        res.status(200).json({ resultCode: 0, message: 'Success', data: { post } });
    }
    catch (e) {
        res.handleError(e);
    }
});
const validators = [
    (0, express_validator_1.check)('text', 'New post text cannot be empty.').exists()
];
// /api/post/
router.post('/', validators, middleware_1.auth, middleware_1.requireAuth, async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            (0, helpers_1.throwValidationError)(errors.array());
        const post = await (0, services_1.createPost)(req.user, req.body.text);
        res.status(200).json({ resultCode: 0, message: 'Success', data: { post } });
    }
    catch (e) {
        res.handleError(e);
    }
});
router.delete('/:id', middleware_1.auth, middleware_1.requireAuth, async (req, res) => {
    try {
        await (0, services_1.deletePost)(req.user, req.params.id);
        return res.status(200).json({ resultCode: 0, message: 'Success' });
    }
    catch (e) {
        res.handleError(e);
    }
});
// todo new version of create post route. with images
router.post('/add', middleware_1.auth, middleware_1.requireAuth, upload.array('images', 10), async (req, res) => {
    try {
        const text = req.body.text;
        const images = req.files;
        const post = await (0, services_1.createPostNew)(req.user, text, images);
        res.status(200).json({ resultCode: 0, message: 'Success', data: { post } });
    }
    catch (e) {
        res.handleError(e);
    }
});
router.post('/:postId/comment', middleware_1.auth, middleware_1.requireAuth, async (req, res) => {
    try {
        const comment = await (0, services_1.addComment)(req.params.postId, req.user, req.body.text);
        res.status(200).json({ resultCode: 0, message: 'Success', data: { comment } });
    }
    catch (e) {
        res.handleError(e);
    }
});
router.delete('/comment/:commentId', middleware_1.auth, middleware_1.requireAuth, async (req, res) => {
    try {
        await (0, services_1.deleteComment)(req.user, req.params.commentId);
        res.status(200).json({ resultCode: 0, message: 'Success' });
    }
    catch (e) {
        res.handleError(e);
    }
});
exports.default = router;
//# sourceMappingURL=post.route.js.map