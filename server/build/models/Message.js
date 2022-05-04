"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    author: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    dialog: { type: mongoose_1.Types.ObjectId, ref: 'Dialog', required: true },
    text: { type: String, required: true }
}, {
    timestamps: true,
    collection: 'messages'
});
exports.Message = (0, mongoose_1.model)('Message', schema);
//# sourceMappingURL=Message.js.map