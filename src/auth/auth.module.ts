import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma.service";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigService, ConfigModule } from "@nestjs/config";
import { auth } from "src/common/constants/auth.constants";
import { MailModule } from "src/shared/mail/mail.module";
@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  imports: [
    MailModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService): Promise<JwtModuleOptions> => ({
        secret: config.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: config.get<string>("JWT_EXPIRES_IN") || auth.MAX_AGE,
        },
      }),
    }),
  ],
})
export class AuthModule {}
