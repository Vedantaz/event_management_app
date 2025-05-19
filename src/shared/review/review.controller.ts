import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpStatus,
  InternalServerErrorException,
  UseGuards,
  HttpCode,
  Patch,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from "@nestjs/common";
import { ReviewService } from "./review.service";
import { CreateReviewDto, ReviewQueryDto } from "./dto/review.dto";
import { UpdateReviewDto } from "./dto/updateReview.dto";

import {
  bookingMessages,
  reviewMessages,
} from "src/common/constants/booking.constants";
import { AuthUser } from "src/common/decorators/auth.decorator";
import { JwtPayloadDto } from "src/auth/dto/jwtPayload.dto";
import { JwtAuthGuard } from "src/common/guards/jwtAuthGuard";
import { ApiOperation } from "@nestjs/swagger";
import { swaggerMessages } from "src/common/constants/swagger.contants";
import { eventMessages } from "src/common/constants/event.constants";

@Controller("reviews")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post("create-review")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: swaggerMessages.CREATE_REVIEW })
  async createReview(
    @AuthUser() authUser: JwtPayloadDto,
    @Body() createReviewDto: CreateReviewDto
  ) {
    const userId = authUser.userId;
    try {
      const review = await this.reviewService.createReview(
        userId,
        createReviewDto
      );

      return {
        statusCode: HttpStatus.CREATED,
        message: bookingMessages.REVIEW_CREATED_SUCCESS,
        data: review,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: bookingMessages.SERVER_ERROR,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: swaggerMessages.GET_ALL_REVIEWS })
  @Get()
  async findAll(@Query() query: ReviewQueryDto) {
    const reviews = await this.reviewService.getALlReviews(query);
    return { message: reviewMessages.RETRIEVED_ALL_REVIEWS, data: reviews };
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: swaggerMessages.UPDTE_REVIEW })
  @Patch("update-review")
  async updateReview(
    @AuthUser() authUser: JwtPayloadDto,
    @Body() data: UpdateReviewDto
  ) {
    const userId = authUser.userId;
    if (!data.message) {
      throw new BadRequestException({
        message: eventMessages.NO_DATA_PROVIDED,
      });
    }
    const updatedReview = await this.reviewService.updateReview(userId, data);

    return {
      message: reviewMessages.REVIEW_UPDATED_SUCCESS,
      data: updatedReview,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: swaggerMessages.DELETE_REVIEWL })
  @Delete("remove-review/:id")
  async removeReview(
    @Param("id", ParseIntPipe) reviewId: number,
    @AuthUser() authUser: JwtPayloadDto
  ) {
    const userId = authUser.userId;
    const removedReview = await this.reviewService.removeReview(
      reviewId,
      userId
    );
    return {
      message: bookingMessages.REVIEW_DELETED,
      data: removedReview,
    };
  }
}
