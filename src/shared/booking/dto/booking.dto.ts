import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";
import { Transform } from "class-transformer";
import { bookingMessages } from "src/common/constants/booking.constants";

export class createBookingDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  eventId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(1, { message: bookingMessages.TICKET_COUNT })
  ticketCount: number;

  @Min(0)
  @ApiProperty({ required: false })
  amount: number;
}

export class refundDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  @Transform(({ value }) => Number(value))
  id: number;
}
