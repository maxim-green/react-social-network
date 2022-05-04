"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const docs_1 = __importDefault(require("./docs"));
const index_1 = __importDefault(require("./auth/index"));
const index_2 = __importDefault(require("./dialogs/index"));
const index_3 = __importDefault(require("./post/index"));
const index_4 = __importDefault(require("./profile/index"));
const index_5 = __importDefault(require("./subscription/index"));
const index_6 = __importDefault(require("./users/index"));
const helpers_1 = require("helpers");
const router = (0, express_1.Router)();
router.use('/docs', docs_1.default);
router.use('/auth', index_1.default);
router.use('/profile', index_4.default);
router.use('/dialog', index_2.default);
router.use('/user', index_6.default);
router.use('/post', index_3.default);
router.use('/subscription', index_5.default);
router.get('/img', (req, res) => {
    const url = 'https://source.unsplash.com/random/1920x1080/?nature';
});
router.delete('/uploads/*', async (req, res) => {
    const url = `${process.env.URL}:${process.env.PORT}/uploads/${req.params[0]}`;
    await (0, helpers_1.deleteFile)(url);
    res.end(`${url} deleted`);
});
exports.default = router;
//# sourceMappingURL=api.route.js.map