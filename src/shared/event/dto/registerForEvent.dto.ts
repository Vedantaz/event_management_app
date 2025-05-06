import { IsInt, IsNotEmpty } from "class-validator";

export class RegisterUserDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  eventId: number;
}
