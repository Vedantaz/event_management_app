import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsEnum,
} from "class-validator";
import { ROLES } from "src/common/enums/enums";
export class SignupDto {
  @IsString()
  @ApiProperty({
    required: true,
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    required: true,
  })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    required: true,
  })
  password: string;

  @IsEnum(ROLES)
  @IsOptional()
  role: ROLES;
}
