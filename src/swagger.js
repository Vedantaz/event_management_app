"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var setupSwagger = function (app) {
    var logger = new common_1.Logger("Swagger");
    var config = new swagger_1.DocumentBuilder()
        .setTitle("Chur network - Event Management System!")
        .setDescription("API descriptions")
        .setVersion("1.0")
        .addTag("Mini Project")
        .addBearerAuth()
        .build();
    var documentFactory = function () { return swagger_1.SwaggerModule.createDocument(app, config); };
    swagger_1.SwaggerModule.setup("api", app, documentFactory, {
        swaggerOptions: {
            withCredentials: true,
        },
    });
    logger.log("=================================================");
    logger.log("Swagger is attached on path: ".concat("/api"));
    logger.log("=================================================");
};
exports.setupSwagger = setupSwagger;
