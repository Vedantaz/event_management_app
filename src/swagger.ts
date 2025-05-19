import { INestApplication, Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const setupSwagger = (app: INestApplication) => {
  const logger = new Logger("Swagger");
  const config = new DocumentBuilder()
    .setTitle("Chur network - Event Management System!")
    .setDescription("API descriptions")
    .setVersion("1.0")
    .addTag("Mini Project")
    .addBearerAuth()
    .addGlobalParameters({
      name: "Accept-Language",
      in: "header",
      required: false,
      schema: { type: "string", default: "en" },
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory, {
    swaggerOptions: {
      withCredentials: true,
    },
  });
  logger.log(`=================================================`);
  logger.log(`Swagger is attached on path: ${"/api"}`);
  logger.log(`=================================================`);
};
