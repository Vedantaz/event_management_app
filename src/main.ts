import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";
import { Logger, ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./common/filters/exception-filters";
import { TransformInterceptor } from "./common/interceptors/transformer.interceptor";
import * as cookieParser from "cookie-parser";
import { setupSwagger } from "./swagger";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";
import { auth } from "./common/constants/auth.constants";
import { ConfigService } from "@nestjs/config";

const logger = new Logger("Main");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  );
  app.enableCors({
    origin: auth.CORS_LINK,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  });
  app.use(cookieParser());
  setupSwagger(app);
  const uploadDir = join(process.cwd(), "uploads");
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
  }
  await app.listen(configService.get<number>("HTTP_PORT") || 3000);
  logger.log(`${auth.SERVER_RUNNING_ON_URL}${await app.getUrl()}/api`);
}
bootstrap();
