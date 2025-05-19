import { IsEmail, MinLength, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Messages } from "src/common/constants/auth.constants";

export class LoginDto {
  @IsEmail({}, { message: Messages.VALID_EMAIL })
  @IsNotEmpty({ message: Messages.EMAIL_REQUIRED })
  @ApiProperty({
    required: true,
  })
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty({ message: Messages.PASSWORD_REQUIRED })
  @MinLength(6, { message: Messages.PASSWORD_CONDITION })
  @ApiProperty({ required: true })
  password: string;
}
