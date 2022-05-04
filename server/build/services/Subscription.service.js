"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubscription = exports.createSubscription = void 0;
const models_1 = require("models");
const helpers_1 = require("helpers");
const createSubscription = async (user, targetUserId) => {
    const targetUser = await models_1.User.findById(targetUserId).lean();
    if (user.subscriptions.includes(targetUser))
        throw new helpers_1.HTTPError(409, {
            resultCode: 1,
            message: 'Already subscribed'
        });
    user.subscriptions.push(targetUser);
    await user.save();
};
exports.createSubscription = createSubscription;
const deleteSubscription = async (user, targetUserId) => {
    const targetUser = await models_1.User.findById(targetUserId).lean();
    if (!user.subscriptions.find(u => targetUserId === u.id))
        throw new helpers_1.HTTPError(404, {
            resultCode: 1,
            message: 'Requested resource not found'
        });
    const index = user.subscriptions.indexOf(targetUser);
    user.subscriptions.splice(index, 1);
    await user.save();
};
exports.deleteSubscription = deleteSubscription;
//# sourceMappingURL=Subscription.service.js.map