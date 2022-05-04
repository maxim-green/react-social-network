"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const helpers_1 = require("helpers");
const services_1 = require("services");
const router = express_1.default.Router();
const validators = [
    (0, express_validator_1.check)('email', 'Invalid email').isEmail(),
    (0, express_validator_1.check)('password', 'Password length should be at least 6 characters').isLength({ min: 6 }),
];
// /coreApi/auth/login
router.post('/', validators, async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            (0, helpers_1.throwValidationError)(errors.array());
        console.log(req.body);
        const { accessToken, refreshToken } = await (0, services_1.loginUser)(req.body);
        res
            .cookie("accessToken", accessToken, { httpOnly: true }) // add secure: process.env.NODE_ENV === "production" option
            .cookie("refreshToken", refreshToken, { httpOnly: true }) // add secure: process.env.NODE_ENV === "production" option
            .status(200)
            .json({ resultCode: 0, message: "Success" });
    }
    catch (e) {
        res.handleError(e);
    }
});
exports.default = router;
//# sourceMappingURL=login.route.js.map