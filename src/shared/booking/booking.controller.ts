import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { BookingService } from "./booking.service";
import { createBookingDto } from "./dto/booking.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { confirmBookingsDto } from "./dto/updateBooking.dto";
import { JwtAuthGuard } from "src/common/guards/jwtAuthGuard";
import { RolesGuard } from "src/common/guards/role.guard";
import { ROLES } from "src/common/enums/enums";
import { BookingStatus } from "@prisma/client";
import { Roles } from "src/common/decorators/role.decorator";
import { bookingMessages } from "src/common/constants/booking.constants";
import { cancelTicket } from "./dto/cancelTicket.dto";
import { AuthUser } from "src/common/decorators/auth.decorator";
import { JwtPayloadDto } from "src/auth/dto/jwtPayload.dto";
import { swaggerMessages } from "src/common/constants/swagger.contants";

@Controller("booking")
@ApiTags("bookings")
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post("ticket-booking")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: bookingMessages.CREATING_BOOKING_FOR_EVENT })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: bookingMessages.EVENT_TICKET_BOOKED,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: bookingMessages.USER_NOT_FOUND,
  })
  @ApiResponse({
    status: 403,
    description: bookingMessages.FORBIDDEN_MSG,
  })
  async createBooking(
    @Body() data: createBookingDto,
    @AuthUser() authUser: JwtPayloadDto
  ) {
    const userId = authUser.userId;
    try {
      const bookings = await this.bookingService.eventBooking(userId, data);
      return {
        message: bookingMessages.BOOKING_CREATED_SUCCESS,
        data: bookings,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get("get-all")
  @ApiOperation({ summary: bookingMessages.GET_ALL_BOOKINGS })
  async getAllBookings() {
    const bookings = await this.bookingService.getBookings();
    return {
      message: bookings.length
        ? bookingMessages.BOOKING_RETRIEVED_SUCCESS
        : bookingMessages.NO_BOOKING_FOUND,
      data: bookings,
    };
  }

  @Get("get-by-status")
  @ApiOperation({ summary: bookingMessages.GET_SPECIFIC_DATA })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  async getBooking(@Query("status") status: BookingStatus) {
    try {
      const normalizedStatus =
        status?.toUpperCase() as keyof typeof BookingStatus;

      if (!BookingStatus[normalizedStatus]) {
        throw new BadRequestException(bookingMessages.INVALID_BOOKING_STATUS);
      }

      const booking = await this.bookingService.getBookingByStatus(
        BookingStatus[normalizedStatus]
      );
      if (booking) {
        return {
          statusCode: HttpStatus.OK,
          message: bookingMessages.BOOKING_FOUND,
          data: booking,
        };
      }
      return { message: bookingMessages.NO_BOOKING_FOUND };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post("confirm-booking-by-status")
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @ApiOperation({ summary: swaggerMessages.CONFIRM_BOOKING })
  async confirmBookings(@Body() dto: confirmBookingsDto) {
    const booking = await this.bookingService.confirmBookingStatus(dto);
    return {
      statuCode: HttpStatus.OK,
      message: bookingMessages.BOOKING_UPDATE_SUCCESS,
      data: booking,
    };
  }

  @Delete("cancel-booking")
  @ApiOperation({ summary: bookingMessages.CANCEL_BOOKING })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 409,
    description: bookingMessages.BOOKING_ALREADY_CANCELLED,
  })
  async CancelBooking(@Body() data: cancelTicket) {
    try {
      await this.bookingService.deleteBooking(data);
      return { message: bookingMessages.BOOKING_CANCELLED_SUCCESS };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post("process-refund/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: bookingMessages.REFUND_PROCESS })
  async processRefund(@Param("id", ParseIntPipe) cancellationId: number) {
    await this.bookingService.processRefund(cancellationId);
    return {
      statusCode: HttpStatus.OK,
      message: bookingMessages.REFUND_PROCESSED_SUCCESS,
    };
  }
}
