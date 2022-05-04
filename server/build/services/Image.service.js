"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePostImage = exports.saveCoverImage = exports.saveAvatarImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const saveAvatarImage = async (file, crop) => {
    const extension = path_1.default.extname(file.originalname);
    const timestamp = Date.now();
    const lgUploadPath = `/uploads/avatar/avatar${timestamp}-lg${extension}`;
    await (0, sharp_1.default)(file.buffer)
        .toFile(path_1.default.join(__root, lgUploadPath));
    const smUploadPath = `/uploads/avatar/avatar${timestamp}-sm${extension}`;
    await (0, sharp_1.default)(file.buffer)
        .extract({
        left: Math.round(crop.x),
        top: Math.round(crop.y),
        width: Math.round(crop.width),
        height: Math.round(crop.height)
    })
        .resize(120, 120)
        .toFile(path_1.default.join(__root, smUploadPath));
    return {
        small: `${process.env.URL}:${process.env.PORT}${smUploadPath}`,
        large: `${process.env.URL}:${process.env.PORT}${lgUploadPath}`
    };
};
exports.saveAvatarImage = saveAvatarImage;
const saveCoverImage = async (file, crop) => {
    const extension = path_1.default.extname(file.originalname);
    const timestamp = Date.now();
    const uploadPath = `/uploads/cover/cover${timestamp}${extension}`;
    await (0, sharp_1.default)(file.buffer)
        .extract({
        left: Math.round(crop.x),
        top: Math.round(crop.y),
        width: Math.round(crop.width),
        height: Math.round(crop.height)
    })
        .resize({ fit: sharp_1.default.fit.contain, width: 720 })
        .toFile(path_1.default.join(__root, uploadPath));
    return `${process.env.URL}:${process.env.PORT}${uploadPath}`;
};
exports.saveCoverImage = saveCoverImage;
const savePostImage = async (file, postId, imageId) => {
    const extension = path_1.default.extname(file.originalname);
    const uploadPathOriginal = `/uploads/post/post${postId}-image${imageId}${extension}`;
    const uploadPathThumbnail = `/uploads/post/post${postId}-image${imageId}_thumbnail${extension}`;
    await (0, sharp_1.default)(file.buffer)
        .toFile(path_1.default.join(__root, uploadPathOriginal));
    await (0, sharp_1.default)(file.buffer)
        .resize({ fit: sharp_1.default.fit.cover, width: 720, height: 720 })
        .toFile(path_1.default.join(__root, uploadPathThumbnail));
    return {
        original: `${process.env.URL}:${process.env.PORT}${uploadPathOriginal}`,
        thumbnail: `${process.env.URL}:${process.env.PORT}${uploadPathThumbnail}`
    };
};
exports.savePostImage = savePostImage;
//# sourceMappingURL=Image.service.js.map