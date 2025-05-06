import { Module } from "@nestjs/common";
import { AttendeeController } from "./attendees.controller";
import { AttendeeService } from "./attendees.service";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [AttendeeController],
  providers: [AttendeeService, PrismaService],
})
export class AttendeesModule {}
