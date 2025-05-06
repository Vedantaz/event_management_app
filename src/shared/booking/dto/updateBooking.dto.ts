import { PartialType } from "@nestjs/mapped-types";
import { createBookingDto } from "./booking.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsInt, Min, IsEnum } from "class-validator";
import { bookingMessages } from "src/common/constants/booking.constants";

import { STATUS } from "src/common/enums/enums";
import { BookingStatus } from "@prisma/client";

export class UpdateBookingDto extends PartialType(createBookingDto) {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(STATUS)
  status?: STATUS;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(1, { message: bookingMessages.TICKET_COUNT })
  ticketCount?: number;
}

export class confirmBookingsDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  bookingId: number;

  @ApiProperty({ enum: BookingStatus, example: BookingStatus.CONFIRMED })
  @IsEnum(BookingStatus)
  status: BookingStatus;
}
