import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsEnum,
} from "class-validator";
import { ROLES } from "src/enums/role-enum";
export class SignupDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(ROLES)
  @IsOptional()
  role: ROLES;
}
