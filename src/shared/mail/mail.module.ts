import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { MailController } from "./mail.controller";
import { PrismaService } from "src/prisma.service";
import { SpotOpenedListener } from "./listeners/spot-opened-listener";

@Module({
  providers: [MailService, PrismaService, SpotOpenedListener],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
