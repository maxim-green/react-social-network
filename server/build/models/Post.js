"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
// TODO: move comment to separate model and use it in this schema as ObjectId
const schema = new mongoose_1.Schema({
    author: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    images: [{
            original: { type: String, required: true },
            thumbnail: { type: String, required: true }
        }],
    likes: { type: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }], default: [] },
    comments: [{
            createdAt: { type: Date, required: true },
            author: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
            text: { type: String, required: true },
            likes: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
        }],
}, {
    timestamps: true,
    collection: 'posts'
});
exports.Post = (0, mongoose_1.model)('Post', schema);
//# sourceMappingURL=Post.js.map