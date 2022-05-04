"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.updateStatus = exports.updateCoverImage = exports.updateAvatar = exports.refreshTokens = exports.logoutUser = exports.loginUser = exports.createUser = exports.isUsernameAvailable = exports.isEmailAvailable = exports.getUserByRefreshToken = exports.getUserByAccessToken = exports.getUserProfile = exports.getUserSubscriptions = exports.getUsers = exports.findUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const helpers_1 = require("helpers");
const models_1 = require("models");
const Image_service_1 = require("./Image.service");
// todo: change all User.findOne to custom findUser function. Need to figure out how to select fields in this case.
const findUser = async (filter) => {
    const user = await models_1.User.findOne(filter);
    if (!user)
        throw new helpers_1.HTTPError(404, { resultCode: 1, message: `User not found` });
    return user;
};
exports.findUser = findUser;
const getUsers = async () => {
    return await models_1.User.find().select('username firstName lastName avatar subscriptions').lean();
};
exports.getUsers = getUsers;
const getUserSubscriptions = async (user) => {
    return await models_1.User.find({ _id: { $in: user.subscriptions } }).select('username firstName lastName avatar subscriptions').lean();
};
exports.getUserSubscriptions = getUserSubscriptions;
const getUserProfile = async (username) => {
    const user = await models_1.User.findOne({ username }).select('-refreshToken -password -incomingFriendshipRequests -outgoingFriendshipRequests');
    if (!user)
        throw new helpers_1.HTTPError(404, { resultCode: 1, message: `User not found` });
    return user;
};
exports.getUserProfile = getUserProfile;
const getUserByAccessToken = async (accessToken) => {
    const { userId } = await (0, helpers_1.verifyToken)(accessToken); // validating RT
    const user = await models_1.User.findById(userId)
        .select('-refreshToken -password')
        .populate('subscriptions', 'username firstName lastName avatar subscriptions');
    if (!user)
        throw new helpers_1.HTTPError(401, { resultCode: 1, message: 'Invalid token' });
    return user;
};
exports.getUserByAccessToken = getUserByAccessToken;
const getUserByRefreshToken = async (refreshToken) => {
    const { userId } = (0, helpers_1.verifyToken)(refreshToken); // validating RT
    const candidate = await models_1.User.findById(userId)
        .select('-password')
        .populate('subscriptions', 'username firstName lastName avatar subscriptions');
    if (!candidate)
        throw new helpers_1.HTTPError(401, { resultCode: 1, message: 'Invalid token' });
    const isEqual = await bcryptjs_1.default.compare(refreshToken, candidate.refreshToken); // comparing provided RT with RT from database
    if (!isEqual) {
        candidate.refreshToken = null;
        await candidate.save();
        throw new helpers_1.HTTPError(401, { resultCode: 1, message: 'Invalid token' });
    }
    return candidate; // RT valid and matching RT from database
};
exports.getUserByRefreshToken = getUserByRefreshToken;
const isEmailAvailable = async (email) => !(await models_1.User.findOne({ email }));
exports.isEmailAvailable = isEmailAvailable;
const isUsernameAvailable = async (username) => !(await models_1.User.findOne({ username }));
exports.isUsernameAvailable = isUsernameAvailable;
const createUser = async (payload) => {
    const password = await bcryptjs_1.default.hash(payload.password, 10);
    return await models_1.User.create({ ...payload, password });
};
exports.createUser = createUser;
const loginUser = async (payload) => {
    const user = await models_1.User.findOne({ email: payload.email });
    const condition = user ? await bcryptjs_1.default.compare(payload.password, user.password) : false;
    if (!condition)
        throw new helpers_1.HTTPError(401, {
            resultCode: 1, message: 'Unauthorized', errors: [{ field: 'form', message: 'Wrong e-mail or password' }]
        });
    const { accessToken, refreshToken } = await (0, helpers_1.generateTokens)(user, payload.rememberMe);
    user.isOnline = true;
    await user.save();
    return { user, accessToken, refreshToken };
};
exports.loginUser = loginUser;
const logoutUser = async (user) => {
    user.isOnline = false;
    user.refreshToken = null;
    await user.save();
};
exports.logoutUser = logoutUser;
const refreshTokens = async (refreshToken) => {
    if (!refreshToken)
        throw new helpers_1.HTTPError(401, { resultCode: 1, message: 'Invalid token' });
    const user = await (0, exports.getUserByRefreshToken)(refreshToken);
    if (!user)
        throw new helpers_1.HTTPError(401, { resultCode: 1, message: 'Invalid token' });
    return await (0, helpers_1.generateTokens)(user);
};
exports.refreshTokens = refreshTokens;
const updateAvatar = async (user, file, crop) => {
    const avatar = await (0, Image_service_1.saveAvatarImage)(file, crop);
    await (0, helpers_1.deleteFile)(user.avatar.small);
    await (0, helpers_1.deleteFile)(user.avatar.large);
    user.avatar = avatar;
    await user.save();
    return user.avatar;
};
exports.updateAvatar = updateAvatar;
const updateCoverImage = async (user, file, crop) => {
    const coverImage = await (0, Image_service_1.saveCoverImage)(file, crop);
    await (0, helpers_1.deleteFile)(user.coverImage);
    user.coverImage = coverImage;
    await user.save();
    return user.coverImage;
};
exports.updateCoverImage = updateCoverImage;
const updateStatus = async (user, status) => {
    user.status = status;
    await user.save();
};
exports.updateStatus = updateStatus;
const updateProfile = async (user, payload) => {
    Object.assign(user, payload);
    await user.save();
};
exports.updateProfile = updateProfile;
//# sourceMappingURL=User.service.js.map