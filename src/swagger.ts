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
<<<<<<< HEAD
    .addGlobalParameters({
      name: "Accept-Language",
      in: "header",
      required: false,
      schema: { type: "string", default: "en" },
    })
=======
>>>>>>> 682ad4a3033634a2b73516cb5378f6417b30b585
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
