"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const services_1 = require("services");
const helpers_1 = require("helpers");
const router = express_1.default.Router();
const validators = [
    (0, express_validator_1.check)('email', 'Invalid email').isEmail(),
    (0, express_validator_1.check)('email').custom(async (email) => {
        const isAvailable = await (0, services_1.isEmailAvailable)(email);
        if (!isAvailable)
            return Promise.reject('E-mail is already in use');
    }),
    (0, express_validator_1.check)('username', 'Username length should be at least 6 characters').isLength({ min: 6 }),
    (0, express_validator_1.check)('username').custom(async (username) => {
        const isAvailable = await (0, services_1.isUsernameAvailable)(username);
        if (!isAvailable)
            return Promise.reject('Username is already in use');
    }),
    (0, express_validator_1.check)('password', 'Password length should be at least 6 characters').isLength({ min: 6 }),
    (0, express_validator_1.check)('firstName', 'Invalid first name').exists({ checkFalsy: true }).not().isNumeric(),
    (0, express_validator_1.check)('lastName', 'Invalid last name').exists({ checkFalsy: true }).not().isNumeric(),
];
router.post('/', validators, async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            (0, helpers_1.throwValidationError)(errors.array());
        await (0, services_1.createUser)(req.body);
        res.status(200).json({ resultCode: 0, message: "Success" });
    }
    catch (e) {
        res.handleError(e);
    }
});
exports.default = router;
//# sourceMappingURL=register.route.js.map