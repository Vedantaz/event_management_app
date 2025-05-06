import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

export class markFavorites {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  @Type(() => Number)
  eventId: number;
}
