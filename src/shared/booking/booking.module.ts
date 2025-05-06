import { Module } from "@nestjs/common";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";
import { PrismaService } from "src/prisma.service";
import { MailModule } from "../mail/mail.module";
@Module({
  imports: [MailModule],
  controllers: [BookingController],
  providers: [BookingService, PrismaService],
})
export class BookingModule {}
