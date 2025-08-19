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
@Module({
  imports: [
    AuthModule,
    UsersModule,
    ScheduleModule.forRoot(),
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
