import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { MailController } from "./mail.controller";
import { PrismaService } from "src/prisma.service";

@Module({
  providers: [MailService, PrismaService],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
