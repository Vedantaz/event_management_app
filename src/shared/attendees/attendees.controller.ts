import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { AttendeeService } from "./attendees.service";
import {
  CheckInAttendeeResponseDto,
  FetchAttendeesDto,
  FilterAttendeesDto,
} from "./dto/fetchAttendees.dto";
import { JwtAuthGuard } from "src/common/guards/jwtAuthGuard";
import { RolesGuard } from "src/common/guards/role.guard";
import { Roles } from "src/common/decorators/role.decorator";
import { ROLES } from "src/common/enums/enums";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { swaggerMessages } from "src/common/constants/swagger.contants";
import { bookingMessages } from "src/common/constants/booking.constants";

@Controller("attendees")
@ApiTags("Attendees")
export class AttendeeController {
  constructor(private readonly attendeeService: AttendeeService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @Post("check-in/:bookingId")
  @ApiOperation({ summary: swaggerMessages.MARK_ATTENDEES_CHECKEDIN })
  @ApiBearerAuth()
  async checkInAttendee(
    @Param("bookingId", ParseIntPipe) bookingId: number
  ): Promise<CheckInAttendeeResponseDto> {
    await this.attendeeService.markAttendeeCheckedIn(bookingId);
    return {
      statusCode: HttpStatus.CREATED,
      message: bookingMessages.ATTENDEES_CHECKED_IN,
    };
  }

  @Get("get-confirmed-attendees/:eventId")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @ApiOperation({ summary: swaggerMessages.FETCH_ATTENDEES })
  async getConfirmedAttendees(@Param() params: FetchAttendeesDto) {
    const attendee = await this.attendeeService.getAttendees(params);

    return { data: attendee };
  }

  @ApiOperation({ summary: swaggerMessages.FETCH_ALL_ATTENDEES })
  @Get()
  async getAllAttendees() {
    const attendees = await this.attendeeService.getAllAttendees();
    return { data: attendees };
  }

  @Get("filter-attendees/:eventId")
  @ApiBearerAuth()
  @ApiOperation({ summary: swaggerMessages.FILTER_BY_DATE })
  async filterAttendees(
    @Param("eventId", ParseIntPipe) eventId: number,
    @Query() query: FilterAttendeesDto
  ) {
    const data = await this.attendeeService.filterAttendeesByDate(
      eventId,
      query.startDate,
      query.endDate
    );

    return { data: data };
  }
}
