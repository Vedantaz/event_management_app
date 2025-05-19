import { MinLength, IsOptional, IsString, IsEmail } from "class-validator";
import { ROLES, STATUS } from "src/common/enums/enums";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @MinLength(6)
  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  role?: ROLES.USER;

  @IsOptional()
  status?: STATUS;

  @IsOptional()
  imageURL?: string | null;
}
