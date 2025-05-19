import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsDateString, IsInt } from "class-validator";
import { Transform, Type } from "class-transformer";

export class FetchAttendeesDto {
  @Type((value) => Number)
  @IsInt()
  @ApiProperty({
    required: true,
  })
  eventId: number;
}

export class FilterAttendeesDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    required: false,
    description: "(YYYY-MM-DD)",
  })
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    required: false,
    description: "(YYYY-MM-DD)",
  })
  endDate: string;
}

export class CheckInAttendeeDto {
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({
    required: true,
  })
  bookingId: number;
}

export class CheckInAttendeeResponseDto {
  message: string;

  statusCode: number;
}
