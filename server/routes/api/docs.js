const router = require('express').Router()



const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
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
            url: 'https://localhost:3000',
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
    apis: ['./routes/**/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);



router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

module.exports = router