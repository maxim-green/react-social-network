"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
global.__root = path_1.default.join(__dirname, '..');
require("dotenv/config"); // explanation for this: https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const configs_1 = require("configs");
const socket_1 = require("socket");
const PORT = process.env.PORT || 5000;
const server = http_1.default.createServer(configs_1.expressApp);
const start = async () => {
    try {
        // connecting to database
        await mongoose_1.default.connect(process.env.DB_URI_LOCAL);
        // starting http server (express)
        server.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
        // starting ws server (socket.io)
        (0, socket_1.ioServer)(server);
    }
    catch (e) {
        console.log(e);
    }
};
start();
//# sourceMappingURL=app.js.map