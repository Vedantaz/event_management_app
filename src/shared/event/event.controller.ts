import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
  ParseIntPipe,
  HttpStatus,
} from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/createEvent.dto";
import { UpdateEventDto } from "./dto/updateEvent.dto";
import { Roles } from "src/common/decorators/role.decorator";
import { ROLES } from "src/common/enums/enums";
import { RolesGuard } from "src/common/guards/role.guard";
import { JwtAuthGuard } from "src/common/guards/jwtAuthGuard";
import { FileInterceptor } from "@nestjs/platform-express";
import { SearchFilterDto } from "./dto/search-filter-events.dto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AuthUser } from "src/common/decorators/auth.decorator";
import { JwtPayloadDto } from "src/auth/dto/jwtPayload.dto";
import { eventMessages } from "src/common/constants/event.constants";

@Controller("events")
@ApiTags("Events API")
export class EventController {
  constructor(private eventService: EventService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: eventMessages.CREATE_EVENT })
  @UseInterceptors(FileInterceptor("imageURL"))
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: CreateEventDto })
  @Post("create")
  async createEvent(
    @UploadedFile() profile: Express.Multer.File,
    @Body() data: CreateEventDto,
    @AuthUser() authUser: JwtPayloadDto
  ) {
    const userId = authUser.userId;
    data.imageURL = profile ? profile : undefined;
    const event = await this.eventService.createEvent(data, userId);
    return {
      data: event,
      statusCode: HttpStatus.CREATED,
      message: eventMessages.EVENT_CREATE_SUCCESS,
    };
  }

  @Get("getAll")
  @ApiOperation({ summary: eventMessages.GET_ALL_EVENTS })
  async findAll() {
    const events = await this.eventService.getAllEvents();
    return { message: eventMessages.EVENT_RETRIEVED_SUCCESS, data: events };
  }

  @Get("search")
  @ApiOperation({ summary: eventMessages.SEARCH_FILTER_SORT_FOR_EVENTS })
  async searchFilterEvents(@Query() data: SearchFilterDto) {
    const events = await this.eventService.searchAndFilterEvents(data);
    return { data: events };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @UseInterceptors(FileInterceptor("file"))
  @ApiBearerAuth()
  @ApiOperation({ summary: eventMessages.UPDATE_EVENT_DETAILS })
  @Patch("update/:id")
  async updateEvent(
    @Param("id", ParseIntPipe) id: number,
    @Body() data: UpdateEventDto
  ) {
    const event = await this.eventService.updateEvent(id, data);
    return event;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: eventMessages.DELETE_EVENT })
  @Delete("delete/:id")
  async removeEvent(@Param("id") id: string) {
    const event = await this.eventService.deleteEvent(Number(id));
    return { message: eventMessages.EVENT_DELETE_SUCCESS, data: event };
  }

  @Get(":id")
  @ApiOperation({ summary: eventMessages.GET_EVENT_BY_ID })
  findOneEvent(@Param("id") id: number) {
    return this.eventService.getEventById(id);
  }
}
