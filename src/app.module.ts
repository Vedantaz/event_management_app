import { Module } from "@nestjs/common";
import { UsersModule } from "./shared/users/users.module";
import { AuthModule } from "./auth/auth.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UploadModule } from "./shared/upload/upload.module";
import { ScheduleModule } from "@nestjs/schedule";
import { EventModule } from "./shared/event/event.module";
import { MailModule } from "./shared/mail/mail.module";
import { BookingModule } from "./shared/booking/booking.module";
import { AttendeesModule } from "./shared/attendees/attendees.module";
import { FavoritesModule } from "./shared/favorites/favorites.module";
import { ReviewModule } from "./shared/review/review.module";
import { validationSchema } from "./common/config/config.schema";
<<<<<<< HEAD
import { EventEmitterModule } from "@nestjs/event-emitter";
import { I18nModule, HeaderResolver } from "nestjs-i18n";
import * as path from "path";
=======

>>>>>>> 682ad4a3033634a2b73516cb5378f6417b30b585
@Module({
  imports: [
    AuthModule,
    UsersModule,
    ScheduleModule.forRoot(),
<<<<<<< HEAD
    EventEmitterModule.forRoot(),
=======
>>>>>>> 682ad4a3033634a2b73516cb5378f6417b30b585
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>("MAIL_HOST"),
          port: config.get<number>("MAIL_PORT"),
          secure: false,
          auth: {
            user: config.get<string>("MAIL_USER"),
            pass: config.get<string>("MAIL_PASSWORD"),
          },
        },
        defaults: {
          from: config.get<string>("MAIL_FROM"),
        },
      }),
    }),
<<<<<<< HEAD
    I18nModule.forRoot({
      fallbackLanguage: "en",
      loaderOptions: {
        path: path.join(__dirname, "..", "i18n"),
        watch: true,
      },
      resolvers: [
        { use: HeaderResolver, options: ["lang", "locale", "l"] }, // Accept-Language from headers
      ],
    }),
=======
>>>>>>> 682ad4a3033634a2b73516cb5378f6417b30b585
    UploadModule,
    EventModule,
    BookingModule,
    MailModule,
    AttendeesModule,
    FavoritesModule,
    ReviewModule,
  ],
})
export class AppModule {}
