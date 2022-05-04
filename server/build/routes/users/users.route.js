"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("middleware");
const services_1 = require("services");
const posts_1 = __importDefault(require("./posts"));
const subscriptions_1 = __importDefault(require("./subscriptions"));
const router = express_1.default.Router();
router.use('/', posts_1.default);
router.use('/subscriptions', subscriptions_1.default);
router.get('/', middleware_1.auth, async (req, res) => {
    try {
        const users = await (0, services_1.getUsers)();
        return res.status(200).json({
            resultCode: 0,
            message: 'Success',
            data: { users }
        });
    }
    catch (e) {
        res.handleError(e);
    }
});
exports.default = router;
//# sourceMappingURL=users.route.js.map