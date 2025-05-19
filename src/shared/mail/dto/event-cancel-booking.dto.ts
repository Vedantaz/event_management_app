import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class EventCancelBooking {
  @IsNotEmpty()
  @IsEmail()
  email: string[];
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  event: string;
}
export class EventConfirmation {
  @IsNotEmpty()
  @IsEmail()
  email: string[];

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  event: string;
}
