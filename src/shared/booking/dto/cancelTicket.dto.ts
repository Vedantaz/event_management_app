import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";

export class cancelTicket {
  @IsNotEmpty()
  @ApiProperty({
    description: "bookingId",
    required: true,
  })
  @Transform(({ value }) => Number(value))
  bookingId: number;
}
