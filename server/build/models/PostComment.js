"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostComment = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    author: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    likes: { type: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }], default: [] },
}, {
    timestamps: true,
    collection: 'comments'
});
exports.PostComment = (0, mongoose_1.model)('PostComment', schema);
//# sourceMappingURL=PostComment.js.map