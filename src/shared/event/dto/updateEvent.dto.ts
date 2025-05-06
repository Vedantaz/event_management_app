import { IsNumber, IsOptional } from "class-validator";
import { Transform } from "class-transformer";
export class UpdateEventDto {
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @Transform(() => Date)
  date: Date;

  @IsOptional()
  location: string;

  @IsOptional()
  category: string;

  @IsOptional()
  @Transform(() => Number)
  price: number;

  @IsOptional()
  @Transform(() => Number)
  @IsNumber()
  maxAttendees: number;

  @IsOptional()
  @Transform(() => Number)
  availableSeats: number;

  @IsOptional()
  imageURL?: string;
}
