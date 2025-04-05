import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailService } from './mail/mail.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { EventService } from './event/event.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventModule } from './event/event.module';
@Module({
  imports: [UsersModule, AuthModule, ScheduleModule.forRoot(),EventEmitterModule.forRoot(),
    ConfigModule.forRoot(),
      MailerModule.forRoot({
          transport: {
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASSWORD,
            },
          },
          defaults: {
            from:  process.env.MAIL_FROM, 
          },
    }),
      UploadModule,
      EventModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, MailService, EventService],
  exports:[PrismaService]
})
export class AppModule implements NestModule{

  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
