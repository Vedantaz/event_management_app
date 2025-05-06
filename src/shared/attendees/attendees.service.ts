import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { FetchAttendeesDto } from "./dto/fetchAttendees.dto";
import { bookingMessages } from "src/common/constants/booking.constants";

@Injectable()
export class AttendeeService {
  constructor(private prisma: PrismaService) {}

  async getAttendees(data: FetchAttendeesDto) {
    const attendees = await this.prisma.attendee.findMany({
      where: { eventId: data.eventId },
      include: {
        user: {
          include: {
            bookings: {
              where: {
                eventId: data.eventId,
                status: "CONFIRMED",
              },
            },
          },
        },
        event: true,
      },
    });

    return {
      data: attendees,
    };
  }

  async getAllAttendees() {
    return await this.prisma.attendee.findMany();
  }

  async filterAttendeesByDate(
    eventId: number,
    startDate?: string,
    endDate?: string
  ) {
    return await this.prisma.booking.findMany({
      where: {
        eventId: eventId,
        registeredAt:
          startDate && endDate
            ? { gte: new Date(startDate), lte: new Date(endDate) }
            : undefined,
      },
      select: { userId: true, registeredAt: true, status: true },
    });
  }

  async markAttendeeCheckedIn(bookingId: number) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new NotFoundException(bookingMessages.NO_BOOKING_FOUND);
    }

    if (booking.status !== "CONFIRMED") {
      throw new BadRequestException(bookingMessages.BOOKING_NOT_CONFIRMED);
    }

    const attendee = await this.prisma.attendee.findFirst({
      where: {
        userId: booking.userId,
        eventId: booking.eventId,
      },
    });

    if (attendee) {
      throw new BadRequestException(
        bookingMessages.ATTENDEE_ALREADY_CHECKED_IN
      );
    }
    await this.prisma.attendee.create({
      data: {
        userId: booking.userId,
        eventId: booking.eventId,
        checkedIn: true,
      },
    });
    return;
  }
}
