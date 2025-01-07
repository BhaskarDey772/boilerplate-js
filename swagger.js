const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const config = require('./config.js');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: config.projectName,
      version: '1.0.0',
      description: config.projectDesc,
    },
    components: {
      securitySchemes: {
        apiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-api-key',
        },
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        apiKeyAuth: [],
      },
    ],
  },
  apis: ['./routes/**/*.js'], // Path to the API docs
};


const swaggerSpec = swaggerJsdoc(swaggerOptions);

function swaggerDocs(app, port) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Documentation in JSON format
  app.get('/docs.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

module.exports = { swaggerDocs };
