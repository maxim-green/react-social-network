"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_route_1 = __importDefault(require("./register/register.route"));
const refresh_tokens_route_1 = __importDefault(require("./refresh-tokens/refresh-tokens.route"));
const login_route_1 = __importDefault(require("./login/login.route"));
const logout_route_1 = __importDefault(require("./logout/logout.route"));
const me_route_1 = __importDefault(require("./me/me.route"));
const router = express_1.default.Router();
router.use('/register', register_route_1.default);
router.use('/refresh-tokens', refresh_tokens_route_1.default);
router.use('/login', login_route_1.default);
router.use('/logout', logout_route_1.default);
router.use('/me', me_route_1.default);
exports.default = router;
//# sourceMappingURL=auth.route.js.map