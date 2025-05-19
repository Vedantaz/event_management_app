import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

import { CreateEventDto } from "./dto/createEvent.dto";
import { UpdateEventDto } from "./dto/updateEvent.dto";
import * as fs from "fs";
import * as path from "path";
import { Messages } from "src/common/constants/mail.constants";
import { eventMessages } from "src/common/constants/event.constants";
import { SearchFilterDto } from "./dto/search-filter-events.dto";
import { OrderBy, SortBy } from "src/common/enums/enums";
import { Prisma } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class EventService {
  private uploadDir = path.join(__dirname, "../../uploads/events");

  constructor(private prisma: PrismaService) {
    this.ensureUploadImg();
  }

  private ensureUploadImg() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async createEvent(data: CreateEventDto, userId: number) {
    const { imageURL, date } = data;

    let fileName: string | null = null;

    if (imageURL) {
      const ext = path.extname(imageURL.originalname);
      fileName = `${userId}-${uuidv4()}${ext}`;
    }

    try {
      await this.prisma.event.create({
        data: {
          ...data,
          date: new Date(date),
          imageURL: fileName ? `${Messages.FILE_IMAGE_URL}${fileName}` : null,
          userId: userId,
        },
      });

      return;
    } catch (error) {
      throw new BadRequestException(Messages.EVENT_CREATION_FAILED);
    }
  }

  async getAllEvents() {
    const events = await this.prisma.event.findMany();
    return { data: events };
  }

  async getEventById(id: number) {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) throw new NotFoundException(Messages.EVENT_NOT_FOUND);
    return { data: event };
  }

  async updateEvent(
    eventId: number,
    data: UpdateEventDto,
    newfile?: Express.Multer.File
  ) {
    const existingEvent = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!existingEvent) {
      throw new NotFoundException();
    }

    if (
      !newfile ||
      !data.availableSeats ||
      !data.category ||
      !data.date ||
      !data.description ||
      !data.location ||
      !data.maxAttendees ||
      !data.name ||
      !data.price
    ) {
      throw new BadRequestException(eventMessages.NO_DATA_PROVIDED);
    }

    const updatedData = await this.prisma.event.update({
      where: { id: eventId },
      data: {
        ...data,
      },
    });

    if (newfile) {
      if (existingEvent.imageURL) {
        const oldFilePath = path.join(this.uploadDir, existingEvent.imageURL);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      updatedData.imageURL = newfile.filename;
    }

    const updatedEvent = await this.prisma.event.update({
      where: { id: eventId },
      data: updatedData,
    });
    return {
      statusCode: HttpStatus.OK,
      message: eventMessages.EVENT_DATA_UPDATED,
      event: updatedEvent,
      imageUrl: newfile
        ? `${Messages.GETEVENT_IMAGEURL}${newfile.filename}`
        : existingEvent.imageURL,
    };
  }

  async deleteEvent(id: number) {
    return this.prisma.event.delete({ where: { id } });
  }

  async getAttendeesForEvent(eventId: number) {
    const attendees = await this.prisma.booking.findMany({
      where: { eventId },
      include: { user: true },
    });

    return attendees.map(({ user }) => user);
  }

  async searchAndFilterEvents(data: SearchFilterDto) {
    const { page = 1, limit = 3 } = data;
    const skip = (page - 1) * limit;

    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      throw new BadRequestException(eventMessages.PAGE_LIMIT_MUST_BE_POSITIVE);
    }

    const total = await this.prisma.event.count();

    const filters: Prisma.EventWhereInput = {};
    if (data.name) filters.name = { equals: data.name };
    if (data.location) filters.location = { equals: data.location };
    if (data.category) filters.category = { equals: data.category };
    if (data.availableSeats) {
      filters.availableSeats = { equals: Number(data.availableSeats) };

      if (isNaN(data.availableSeats))
        throw new BadRequestException(
          eventMessages.AVAILABLE_SEATS_MUST_BE_NUMBER
        );
      filters.availableSeats = { equals: data.availableSeats };
    }

    if (data.startDate && data.endDate) {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new BadRequestException(eventMessages.INVALID_START_END_DATE);
      }
      filters.date = {
        gte: start,
        lte: end,
      };
    }

    let orderBy: Prisma.EventOrderByWithRelationInput = { date: "asc" };
    if (data.sortBy === SortBy.POPULARITY)
      orderBy = {
        availableSeats:
          data.order === OrderBy.DESC ? OrderBy.DESC : OrderBy.ASC,
      };
    else if (data.sortBy === SortBy.DATE)
      orderBy = {
        date: data.order === OrderBy.DESC ? OrderBy.DESC : OrderBy.ASC,
      };
    else if (data.sortBy === SortBy.PRICE)
      orderBy = {
        price: data.order === OrderBy.DESC ? OrderBy.DESC : OrderBy.ASC,
      };

    const result = await this.prisma.event.findMany({
      where: filters,
      orderBy,
      skip,
      take: limit,
    });
    if (result.length > 0) {
      return {
        totalEvents: total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        data: result,
      };
    } else {
      return await this.prisma.event.findMany();
    }
  }
}
