import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/createEvent.dto";
import { UpdateEventDto } from "./dto/updateEvent.dto";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/role/role.decorator";
import { ROLES } from "src/enums/role-enum";
import { RolesGuard } from "src/role/role.guard";
import { JwtAuthGuard } from "src/auth/jwt_authGuard";
import { AuthhGuard } from "src/auth/auth.guard";

@Controller("events")
export class EventController {
  constructor(private eventService: EventService) {}

  //   @UseGuards(AuthGuard)
  @UseGuards(JwtAuthGuard, RolesGuard, AuthGuard("jwt"))
  @Roles(ROLES.ADMIN)
  @Post()
  create(@Body() data: CreateEventDto) {
    return this.eventService.createEvent(data);
  }

  @Get()
  findAll() {
    return this.eventService.getAllEvents();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.eventService.getEventById(id);
  }

  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard, AuthGuard("jwt"))
  @Patch(":id")
  update(@Param("id") id: string, @Body() data: UpdateEventDto) {
    return this.eventService.updateEvent(Number(id), data);
  }

  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard, AuthGuard("jwt"))
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.eventService.deleteEvent(Number(id));
  }
}
