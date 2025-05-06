import {
  IsOptional,
  IsString,
  IsDateString,
  IsEnum,
  IsNumber,
  IsInt,
  Min,
  Max,
} from "class-validator";
import { Transform, Type } from "class-transformer";
import { eventMessages } from "src/common/constants/event.constants";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { OrderBy, SortBy } from "src/common/enums/enums";

export class SearchFilterDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @IsString()
  name?: string;

  @IsString()
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  location?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({
    required: false,
    description: "(YYYY-MM-DD)",
    example: "2025-04-01",
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({
    required: false,
    description: "(YYYY-MM-DD)",
    example: "2025-04-16",
  })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  availableSeats?: number;

  @ApiProperty({
    required: false,
    enum: SortBy,
  })
  @IsOptional()
  @IsEnum(SortBy, {
    message: eventMessages.SORT_BY_PROPERTY,
  })
  sortBy?: SortBy;

  @ApiProperty({
    required: false,
    enum: OrderBy,
  })
  @IsOptional()
  @IsEnum(OrderBy, { message: eventMessages.ORDER_SORT })
  order?: OrderBy;

  @ApiPropertyOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = 4;
}
