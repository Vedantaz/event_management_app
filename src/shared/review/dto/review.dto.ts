// create-review.dto.ts
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsInt,
  IsString,
  Min,
  Max,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from "class-validator";
import { eventMessages } from "src/common/constants/event.constants";
import { OrderBy, ReviewSortBy, SortBy } from "src/common/enums/enums";

export class CreateReviewDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  @Type(() => Number)
  eventId: number;

  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({
    required: true,
  })
  rating: number;

  @IsString()
  @ApiProperty({
    required: true,
  })
  message: string;
}

export class getALlReviewsDto {
  @IsOptional()
  @IsEnum(SortBy, {
    message: eventMessages.SORT_BY_REVIEW_PROPERTY,
  })
  sortBy?: SortBy;

  @ApiProperty({
    required: false,
    enum: OrderBy,
  })
  @IsOptional()
  @IsEnum(OrderBy, { message: eventMessages.ORDER_SORT })
  order?: OrderBy;
}

export class ReviewQueryDto {
  @IsOptional()
  @IsEnum(ReviewSortBy)
  @ApiPropertyOptional({
    enum: ReviewSortBy,
    example: ReviewSortBy.RATING,
  })
  sortBy?: ReviewSortBy;

  @IsOptional()
  @IsEnum(OrderBy)
  @ApiPropertyOptional({
    enum: OrderBy,
    example: OrderBy.DESC,
  })
  orderBy?: OrderBy;
}
