const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
  swaggerDefinition: {
    info: {
      title: "NodePop API",
      version: "0.1",
      description: "API of Ad",
    },
  },
  apis: ["swagger.yaml"],
};

const especification = swaggerJSDoc(options);

//module.exports = [swaggerUI.serve, swaggerUI.setup(especification)];

module.exports = [swaggerUI.serve, swaggerUI.setup(especification)];
