import { Injectable, Logger } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { Cron, CronExpression } from "@nestjs/schedule";
import { PrismaService } from "src/prisma.service";
import { Messages } from "src/common/constants/mail.constants";
import { eventBooking } from "./dto/event-booking.dto";
import { setEventReminderDto } from "./dto/event-reminder.dto";

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly prisma: PrismaService
  ) {}

  async sendEventReminder(data: setEventReminderDto) {
    this.logger.log(Messages.CHECK_UPCOMING_EVENTS);

    const event = await this.prisma.event.findUnique({
      where: { id: data.eventId },
<<<<<<< HEAD
      include: {
        user: true,
      },
=======
>>>>>>> 682ad4a3033634a2b73516cb5378f6417b30b585
    });

    if (!event) {
      this.logger.error(`${Messages.EVENT_NOT_FOUND_ID} ${data.eventId}`);
      return;
    }

<<<<<<< HEAD
    if (event.availableSeats <= 15) {
      const data = {
        event: event.name,
        email: event.user.email,
        name: event.user.name,
      };
      await this.notificationForXSeats(data);
    }
=======
>>>>>>> 682ad4a3033634a2b73516cb5378f6417b30b585
    const attendees = await this.prisma.booking.findMany({
      where: { eventId: data.eventId },
      include: { user: true },
    });

    if (!attendees.length) {
      this.logger.warn(
        `${Messages.NO_ATTENDEES_FOUND_FOR_EVENT} ${event["name"]}`
      );
      return;
    }
    const emailRecipients = attendees.map((attendee) => attendee.user.email);
    try {
      await this.mailerService.sendMail({
        to: emailRecipients,
        subject: Messages.EVENT_REMINDER,
        text: `${Messages.REMINDER_YOUR_EVENT} ${event.name} ${Messages.IS_SCHEDULED_ON} ${event.date}.`,
      });

      this.logger.log(
        `${Messages.EVENT_REMINDER_SEND_TO}${emailRecipients.length} ${Messages.ATTENDEES_FOR} ${event.name}`
      );
    } catch (error) {
      this.logger.error(Messages.FAIL_EVENT_REMINDER, error.stack);
    }
  }

  @Cron(CronExpression.EVERY_10_HOURS)
  async handleReminder() {
    try {
      const upcomingEvents = await this.prisma.event.findMany({
        where: {
          date: { gte: new Date() },
        },
      });

      if (!upcomingEvents || upcomingEvents.length === 0) {
        return;
      }

      for (const event of upcomingEvents) {
        try {
          await this.sendEventReminder({ eventId: event.id });
        } catch (reminderErr) {
          Logger.error(
            `${Messages.FAILED_TO_SENT_REMINDER} ${event.id}:`,
            reminderErr
          );
        }
      }
    } catch (err) {
      Logger.error(Messages.ERROR_HANDLE_REMINDER, err);
    }
  }
  async sendRegistrationConfirmation(data: eventBooking) {
    const { name, event } = data;
    try {
      await this.mailerService.sendMail({
        to: data.email,
        subject: Messages.REGISTRATION_SUCCESS,
        text: `${Messages.REGISTERING_THANKS} Mr. ${name} for ${event}.`,
        context: {
          name,
          event,
        },
      });
      this.logger.log(`${Messages.REGISTRATION_EMAIL_SEND_TO} ${data.email}`);
    } catch (error) {
      this.logger.error(
        `${Messages.FAILED_TO_SENT_REGISTRATION_EMAIL} ${data.email}`,
        error
      );
    }
  }

  async sendEventBookingConfirmation(data: eventBooking) {
    try {
      await this.mailerService.sendMail({
        to: data.email,
        subject: Messages.EVENT_BOOKING_CONFIRMATION,
        text: `${Messages.BOOKING_IS_CONFIRMED} ${data.event}`,
        context: { name: data.name, event: data.event },
      });
      this.logger.log(
        `${Messages.EVENT_BOOKING_CONFIRMATION_SENDTO} ${data.email}`
      );
    } catch (error) {
      this.logger.error(
        `${Messages.FAIL_TO_SEND_EMAIL_CONFIRMATION}${data.email}`,
        error.stack
      );
    }
  }

  async sendBookingCancellation(data: eventBooking) {
    try {
      await this.mailerService.sendMail({
        to: data.email,
        subject: Messages.BOOKING_CANCELLATION,
        text: `${Messages.BOOKING_IS_CANCELLED} ${data.event}`,
        context: { name: data.name, event: data.event },
      });
      this.logger.log(`${Messages.BOOKING_CANCELLATION_EMAIL} ${data.email}`);
    } catch (error) {
      this.logger.error(
        `${Messages.BOOKING_CANCELLATION_EMAIL}${data.email}`,
        error.stack
      );
    }
  }
<<<<<<< HEAD

  async sendSpotOpenedNotification(data: eventBooking) {
    try {
      await this.mailerService.sendMail({
        to: "mulevedant91@gmail.com",
        subject: `A spot opened for ${data.event}!`,
        text: "spot-opened",
        context: {
          name: data.name,
          event: data.event,
        },
      });
      this.logger.log(`${Messages.SPOT_OPENED_NOTIFICATION} ${data.email}`);
    } catch (error) {
      this.logger.error(error.stack);
    }
  }

  async notificationForXSeats(data: eventBooking) {
    try {
      await this.mailerService.sendMail({
        to: data.email,
        subject: `Hey ${data.name}, ${Messages.SEATS_LEFT_MSG} ${data.event}}`,
        text: "Only few seats are left!!",
        context: {
          name: data.name,
          event: data.event,
        },
      });
      this.logger.log(Messages.REGISTER_FAST);
    } catch (error) {
      this.logger.log(error.message);
    }
  }
=======
>>>>>>> 682ad4a3033634a2b73516cb5378f6417b30b585
}
