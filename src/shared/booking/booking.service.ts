import {
  BadRequestException,
<<<<<<< HEAD
  ConflictException,
  HttpException,
=======
>>>>>>> 682ad4a3033634a2b73516cb5378f6417b30b585
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { createBookingDto } from "./dto/booking.dto";
import { PrismaService } from "src/prisma.service";
import { MailService } from "../mail/mail.service";
import { bookingMessages } from "src/common/constants/booking.constants";
import { cancelTicket } from "./dto/cancelTicket.dto";
import { BookingStatus } from "@prisma/client";
import { confirmBookingsDto } from "./dto/updateBooking.dto";
import { CancelStatus } from "src/common/enums/enums";
<<<<<<< HEAD
import { EventEmitter2 } from "@nestjs/event-emitter";
import { constructFrom } from "date-fns";
import { SpotOpenedEvent } from "../event/spot-opened";
@Injectable()
export class BookingService {
  private readonly lastNotifiedMap = new Map<number, Date>();
  constructor(
    private readonly prisma: PrismaService,
    private eventEmitter: EventEmitter2,
=======
@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,
>>>>>>> 682ad4a3033634a2b73516cb5378f6417b30b585
    private readonly mailService: MailService
  ) {}

  async eventBooking(userId: number, data: createBookingDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: bookingMessages.USER_NOT_FOUND,
      });
    }

    const event = await this.prisma.event.findUnique({
      where: { id: data.eventId },
    });
    if (!event) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: bookingMessages.EVENT_NOT_FOUND,
      });
    }
    const booking = await this.prisma.booking.findFirst({
      where: { eventId: data.eventId, userId: userId },
    });
    if (booking) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: bookingMessages.ALREADY_BOOKED,
      });
    }

    if (event.availableSeats < data.ticketCount) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: bookingMessages.NOT_ENOUGH_SEATS,
      });
    }

    const totalPrice = event.price * data.ticketCount;
    if (totalPrice === data.amount) {
      await this.prisma.event.update({
        where: { id: data.eventId },
        data: { availableSeats: event.availableSeats - data.ticketCount },
      });

      await this.prisma.booking.create({
        data: {
          userId,
          eventId: data.eventId,
          ticketCount: data.ticketCount,
          amount: totalPrice,
        },
      });

      return;
    } else {
      throw new BadRequestException(bookingMessages.AMOUNT_MISMATCH);
    }
    return;
  }

  async getBookings() {
    return await this.prisma.booking.findMany();
  }

  async deleteBooking(data: cancelTicket) {
    const booking = await this.prisma.booking.findFirst({
      where: { id: data.bookingId },
    });

    if (!booking) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: bookingMessages.NO_BOOKING_FOUND,
      });
    }

    const userId = booking.userId;
    await this.prisma.booking.update({
      where: { id: data.bookingId },
      data: { status: BookingStatus.CANCELED },
    });
<<<<<<< HEAD
    const checkCancellation = await this.prisma.cancellation.findFirst({
      where: { userId, eventId: booking.eventId },
    });
    if (!checkCancellation) {
      await this.prisma.cancellation.create({
        data: {
          userId,
          eventId: booking.eventId,
          bookingId: booking.id,
          amount: booking.amount,
          status: CancelStatus.PROCESSING,
        },
      });
    } else {
      throw new ConflictException({
        message: bookingMessages.BOOKING_ALREADY_CANCELLED,
      });
    }

=======
    await this.prisma.cancellation.create({
      data: {
        userId,
        eventId: booking.eventId,
        bookingId: booking.id,
        amount: booking.amount,
        status: CancelStatus.PROCESSING,
      },
    });
>>>>>>> 682ad4a3033634a2b73516cb5378f6417b30b585
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: bookingMessages.USER_NOT_FOUND,
      });
    }
    const event = await this.prisma.event.findUnique({
<<<<<<< HEAD
      where: { id: booking.eventId },
=======
      where: { id: userId },
>>>>>>> 682ad4a3033634a2b73516cb5378f6417b30b585
    });
    if (!event) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: bookingMessages.EVENT_NOT_FOUND,
      });
    }
    await this.mailService.sendBookingCancellation({
      email: user.email,
      name: user.name,
      event: event.name,
    });
<<<<<<< HEAD
    const seats = event.availableSeats;
    if (seats > 0) {
      const now = new Date();
      const lastSent = this.lastNotifiedMap.get(event.id);

      if (
        !lastSent ||
        now.getTime() - lastSent.getTime() > 24 * 60 * 60 * 1000
      ) {
        const favorites = await this.prisma.favorites.findMany({
          where: { userId: userId },
          include: { user: true },
        });
        for (const fav of favorites) {
          // await this.mailService.sendSpotOpenedNotification({
          //   email: fav.user.email,
          //   name: fav.user.name,
          //   event: event.name,
          // });
          this.eventEmitter.emit(
            "spot-opened",
            new SpotOpenedEvent(fav.user.email, fav.user.name, event.name)
          );
        }
        this.lastNotifiedMap.set(event.id, now);
      }
    }
=======

    return { message: bookingMessages.REFUND_PROCESSED_SUCCESS };
>>>>>>> 682ad4a3033634a2b73516cb5378f6417b30b585
  }

  async getBookingByStatus(status: BookingStatus) {
    const bookings = await this.prisma.booking.findMany({
      where: { status },
    });

    if (!bookings || bookings.length === 0) {
      return;
    }
    return {
      message: bookingMessages.BOOKING_RETRIEVED_SUCCESS,
      data: bookings,
    };
  }

  async confirmBookingStatus(data: confirmBookingsDto) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: data.bookingId },
    });

    if (!booking) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: bookingMessages.NO_BOOKING_FOUND,
      });
    }
    const eventId = booking.eventId;
    if (data.status === booking.status) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: bookingMessages.SAME_BOOKING_STATUS,
      });
    }

    await this.prisma.booking.update({
      where: { id: data.bookingId },
      data: { status: data.status },
    });

    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });
    const userId = booking.userId;
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: bookingMessages.USER_NOT_FOUND,
      });
    }

    if (!event) {
      throw new NotFoundException(bookingMessages.EVENT_NOT_FOUND);
    }
    await this.mailService.sendEventBookingConfirmation({
      email: user.email,
      name: user.name,
      event: event.name,
    });

    return;
  }

  async processRefund(cancellationId: number) {
    const cancellation = await this.prisma.cancellation.findUnique({
      where: { id: cancellationId },
    });

    if (!cancellation) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: bookingMessages.CANCELLATION_NOT_FOUND,
      });
    }

    if (cancellation.status === CancelStatus.PENDING) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: bookingMessages.STATUS_PENDING,
      });
    }

    if (cancellation.status === CancelStatus.COMPLETED) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: bookingMessages.REFUND_PROCESS_ALREADY_COMPLETED,
      });
    }

    await this.prisma.cancellation.update({
      where: { id: cancellationId },
      data: { status: CancelStatus.COMPLETED },
    });

<<<<<<< HEAD
    await this.prisma.cancellation.deleteMany({
      where: { bookingId: cancellation.bookingId },
    });

    await this.prisma.booking.delete({
      where: { id: cancellation.bookingId },
    });

=======
>>>>>>> 682ad4a3033634a2b73516cb5378f6417b30b585
    return;
  }
}
