import { Body, Controller, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { Messages } from "src/common/constants/auth.constants";
import { MailService } from "./mail.service";
import { eventBooking } from "./dto/event-booking.dto";
import { JwtAuthGuard } from "src/common/guards/jwtAuthGuard";
import { RolesGuard } from "src/common/guards/role.guard";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ROLES } from "src/common/enums/enums";
import { Roles } from "src/common/decorators/role.decorator";

@Controller("mail")
@ApiTags("Mail APIs")
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post("event-register")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @ApiOperation({ summary: Messages.SENDING_MAIL })
  async register(@Body() data: eventBooking) {
    const registerEmail =
      await this.mailService.sendRegistrationConfirmation(data);
    return {
      message: Messages.REGISTRATION_EMAIL_SENT,
      statusCode: HttpStatus.OK,
      data: registerEmail,
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @Post("event-booking-confirmation")
  @ApiOperation({
    summary: Messages.SENDING_CONFIRMATION_EMAIL,
  })
  async sendBookingConfirmation(@Body() data: eventBooking) {
    const email = this.mailService.sendEventBookingConfirmation(data);
    return { message: Messages.BOOKING_CONFIRMATION_EMAIL, data: email };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @Post("event-reminder")
  @ApiOperation({ summary: Messages.SENDING_REMINDER_MAIL })
  async sendEventReminder() {
    const reminder = await this.mailService.handleReminder();
    return { message: Messages.EVENT_REMINDER, data: reminder };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @Post("event/cancel-booking")
  @ApiOperation({ summary: Messages.SENDING_CANCELLATION_MAIL })
  async sendBookingCancellation(@Body() data: eventBooking) {
    const email = await this.mailService.sendBookingCancellation(data);
    return { message: Messages.BOOKING_CANCELLATION_EMAIL, data: email };
  }
}
