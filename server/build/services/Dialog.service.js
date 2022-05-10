"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDialog = exports.findDialog = exports.findUserDialogs = void 0;
const models_1 = require("../models");
const findUserDialogs = async (userId) => {
    // TODO consider refactoring using generic in populate() like it described here: https://mongoosejs.com/docs/typescript/populate.html
    const dialogs = await models_1.Dialog
        .find({ users: userId })
        .select('-message')
        .populate('users', ['_id', 'username', 'firstName', 'lastName', 'avatar']);
    return dialogs.map(dialog => ({
        _id: dialog._id,
        createdAt: dialog.createdAt,
        updatedAt: dialog.updatedAt,
        companion: dialog.users.find(user => user._id.toString() !== userId)
    }));
};
exports.findUserDialogs = findUserDialogs;
const findDialog = async (userId1, userId2) => {
    let dialog = await models_1.Dialog
        .findOne({
        $and: [
            { users: { $all: [userId1, userId2] } },
            { users: { $size: 2 } }
        ]
    })
        .populate('users', ['_id', 'username', 'firstName', 'lastName', 'avatar'])
        .populate({
        path: 'messages',
        populate: { path: 'author', model: 'User', select: ['_id', 'username', 'firstName', 'lastName', 'avatar'] }
    });
    return dialog;
};
exports.findDialog = findDialog;
const createDialog = async (userId1, userId2) => {
    const dialog = new models_1.Dialog({
        date: new Date(),
        users: [userId1, userId2],
        messages: []
    });
    await dialog.save();
    return dialog;
};
exports.createDialog = createDialog;
//# sourceMappingURL=Dialog.service.js.map
