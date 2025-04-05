import {
  IsString,
  IsNumber,
  IsDate,
  IsInt,
  IsUrl,
  IsNotEmpty,IsOptional
} from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsDate()
  date: Date;
  @IsString()
  location: string;
  @IsString() category: string;
  @IsNumber() price: number;
  @IsInt() maxAttendees: number;
  @IsInt() availableSeats: number;
  @IsUrl() 
  @IsOptional()
  imageURL: string;
}
