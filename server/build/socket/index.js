"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ioServer = void 0;
const socket_io_1 = require("socket.io");
const mongoose_1 = require("mongoose");
const models_1 = require("models");
const configs_1 = require("configs");
const middleware_1 = require("middleware");
const getUserDialogs = async (userId) => {
    return models_1.Dialog.find({ users: userId });
};
const connectUser = async (user) => {
    console.log(`${user.username} connected`);
    user.isOnline = true;
    await user.save();
};
const disconnectUser = async (user) => {
    console.log(`${user.username} disconnected`);
    user.isOnline = false;
    await user.save();
};
const createMessage = async (author, text, dialogId) => {
    const message = new models_1.Message({
        author,
        dialog: new mongoose_1.Types.ObjectId(dialogId),
        text
    });
    await message.save();
    return message;
};
const ioServer = (server) => {
    const io = new socket_io_1.Server(server, configs_1.ioConfig);
    io.use(middleware_1.socketAuth);
    io.sockets.on('connection', async (socket) => {
        const { user } = socket;
        await connectUser(user);
        const dialogs = await getUserDialogs(user.id);
        socket.join(dialogs.map(d => d.id)); // room id is dialog id
        socket.on('disconnect', async () => {
            await disconnectUser(user);
        });
        socket.on('client-message', async (text, dialogId) => {
            const message = await createMessage(user, text, dialogId);
            await models_1.Dialog.findByIdAndUpdate(dialogId, { $push: { messages: message } });
            const responseMessage = await message
                .populate('author', 'username firstName lastName avatar');
            io.to(dialogId).emit('server-message', { dialogId, message: responseMessage });
        });
    });
};
exports.ioServer = ioServer;
//# sourceMappingURL=index.tsx.map
