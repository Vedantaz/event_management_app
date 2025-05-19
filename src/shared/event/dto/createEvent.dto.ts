import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsDate,
} from "class-validator";
import { Type } from "class-transformer";
import { Messages } from "src/common/constants/mail.constants";

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Tech Conference 2025" })
  name: string;

  @IsString()
  @ApiProperty({
    description: "description",
    required: true,
  })
  description: string;

  @IsDate({ message: Messages.INVALID_DATE })
  @Type(() => Date)
  @ApiProperty({
    example: "2025-09-09",
  })
  date: Date;

  @IsString()
  @ApiProperty({
    description: "location",
    required: true,
  })
  location: string;

  @IsString()
  @ApiProperty({
    description: "category",
    required: true,
  })
  category: string;

  @IsNumber()
  @ApiProperty({
    description: "price",
    required: true,
  })
  @Type(() => Number)
  price: number;

  @ApiProperty({
    description: "maxAttendees",
    required: true,
  })
  @Type(() => Number)
  @IsNumber()
  maxAttendees: number;

  @IsNumber()
  @ApiProperty({
    description: "availableSeats",
    required: true,
  })
  @Type(() => Number)
  availableSeats: number;

  @ApiPropertyOptional({ type: "string", format: "binary" })
  @IsOptional()
  imageURL?: Express.Multer.File;
}
