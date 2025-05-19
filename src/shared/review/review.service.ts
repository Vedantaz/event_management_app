import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateReviewDto, ReviewQueryDto } from "./dto/review.dto";
import { UpdateReviewDto } from "./dto/updateReview.dto";
import { PrismaService } from "src/prisma.service";
import { ReviewSortBy } from "src/common/enums/enums";
import { Prisma } from "@prisma/client";
import {
  bookingMessages,
  reviewMessages,
} from "src/common/constants/booking.constants";
import { eventMessages } from "src/common/constants/event.constants";

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(userId: number, data: CreateReviewDto) {
    const event = await this.prisma.event.findUnique({
      where: { id: data.eventId },
    });

    if (!event) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: bookingMessages.EVENT_NOT_FOUND,
      });
    }
    const existingReview = await this.prisma.review.findFirst({
      where: {
        userId,
        eventId: data.eventId,
      },
    });

    if (existingReview) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: bookingMessages.REVIEW_ALREADY_EXISTS,
      });
    }

    await this.prisma.review.create({
      data: {
        userId,
        eventId: data.eventId,
        rating: data.rating,
        message: data.message,
      },
    });

    return;
  }

  async getALlReviews(data: ReviewQueryDto) {
    let orderBy: Prisma.ReviewOrderByWithRelationInput = {
      createdAt: "asc",
    };

    if (data.sortBy === ReviewSortBy.RATING) orderBy = { rating: "desc" };
    return this.prisma.review.findMany({
      orderBy,
    });
  }

  async updateReview(userId: number, data: UpdateReviewDto) {
    const review = await this.prisma.review.findFirst({
      where: {
        userId: userId,
      },
      select: { id: true, userId: true, message: true },
    });

    if (!review) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: bookingMessages.REVIEW_NOT_FOUND,
      });
    }

    if (review.userId !== userId) {
      throw new ForbiddenException({
        message: reviewMessages.NOT_ALLOWED_TO_UPDATE,
      });
    }
    if (!data) {
      throw new BadRequestException(eventMessages.NO_DATA_PROVIDED);
    }

    await this.prisma.review.update({
      where: { userId: userId, id: review.id },
      data: data,
    });

    return;
  }

  async removeReview(reviewId: number, userId: number) {
    const review = await this.prisma.review.findFirst({
      where: { id: reviewId, userId },
    });

    if (!review) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: bookingMessages.REVIEW_NOT_FOUND,
      });
    }

    await this.prisma.review.delete({ where: { id: reviewId } });
    return;
  }
}
