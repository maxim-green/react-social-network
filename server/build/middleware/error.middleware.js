"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withErrorHandler = void 0;
const helpers_1 = require("helpers");
const withErrorHandler = (req, res, next) => {
    res.handleError = (e) => {
        if (e instanceof helpers_1.HTTPError) {
            // todo: consider redirecting to 404 page if e.statusCode === 404
            return res
                .status(e.statusCode)
                .json(e.responseData);
        }
        console.log(e);
        return res
            .status(500)
            .json({ resultCode: 1, message: 'Something went wrong :(' });
    };
    next();
};
exports.withErrorHandler = withErrorHandler;
//# sourceMappingURL=error.middleware.js.map