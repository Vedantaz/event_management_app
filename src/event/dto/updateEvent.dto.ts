import {
    IsString,
    IsNumber,
    IsDate,
    IsInt,
    IsUrl,
    IsNotEmpty,IsOptional
  } from 'class-validator';
import { CreateEventDto } from "./createEvent.dto";

export class UpdateEventDto {

    @IsOptional()
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsDate()
  @IsOptional()
  date: Date;
  @IsString()
  @IsOptional()
  location: string;
  @IsString() @IsOptional() category: string;
  @IsNumber() @IsOptional() price: number;
  @IsInt()  @IsOptional() maxAttendees: number;
  @IsInt() @IsOptional()availableSeats: number;
  @IsUrl() 
  @IsOptional()
  imageURL: string;
}


