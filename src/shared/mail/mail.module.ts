import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { MailController } from "./mail.controller";
import { PrismaService } from "src/prisma.service";
<<<<<<< HEAD
import { SpotOpenedListener } from "./listeners/spot-opened-listener";

@Module({
  providers: [MailService, PrismaService, SpotOpenedListener],
=======

@Module({
  providers: [MailService, PrismaService],
>>>>>>> 682ad4a3033634a2b73516cb5378f6417b30b585
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
