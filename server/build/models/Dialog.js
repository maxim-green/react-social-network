"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    users: { type: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }], required: true, default: [] },
    messages: { type: [{ type: mongoose_1.Types.ObjectId, ref: 'Message' }], required: true, default: [] }
}, {
    timestamps: true,
    collection: 'dialogs'
});
exports.Dialog = (0, mongoose_1.model)('Dialog', schema);
//# sourceMappingURL=Dialog.js.map