"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfig = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for Bind social network.',
        version: '1.0.0',
        description: 'This is a REST API application made with Express. It provides and manages data for Bind social network.',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'Bind',
            url: 'http://localhost:3000',
        },
    },
    servers: [
        {
            url: 'http://localhost:5000/api',
            description: 'Development server',
        }
    ],
};
const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./**/*.yml'],
};
exports.swaggerConfig = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.config.js.map