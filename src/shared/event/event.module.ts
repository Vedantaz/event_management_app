import { Module } from "@nestjs/common";
import { EventService } from "./event.service";
import { EventController } from "./event.controller";
import { PrismaService } from "src/prisma.service";
@Module({
  imports: [],
  providers: [EventService, PrismaService],
  controllers: [EventController],
})
export class EventModule {}
