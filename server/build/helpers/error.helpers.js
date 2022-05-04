"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwValidationError = exports.HTTPError = void 0;
class HTTPError {
    constructor(statusCode, responseData) {
        this.statusCode = statusCode;
        this.responseData = responseData;
    }
}
exports.HTTPError = HTTPError;
const throwValidationError = (errors) => {
    throw new HTTPError(400, {
        resultCode: 1,
        message: 'Invalid input data',
        errors: errors.map(error => ({ field: error.param, message: error.msg }))
    });
};
exports.throwValidationError = throwValidationError;
//# sourceMappingURL=error.helpers.js.map