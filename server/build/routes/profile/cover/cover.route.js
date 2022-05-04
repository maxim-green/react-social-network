"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const middleware_1 = require("middleware");
const services_1 = require("services");
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const router = express_1.default.Router();
router.put('/', upload.single('image'), middleware_1.auth, middleware_1.requireAuth, async (req, res) => {
    try {
        const coverImage = await (0, services_1.updateCoverImage)(req.user, req.file, JSON.parse(req.body.crop));
        res.status(200).json({
            resultCode: 0,
            message: 'Success',
            data: { coverImage }
        });
    }
    catch (e) {
        res.handleError(e);
    }
});
exports.default = router;
//# sourceMappingURL=cover.route.js.map