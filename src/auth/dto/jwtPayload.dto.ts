import { IsEmail, IsEnum, IsInt } from "class-validator";
import { ROLES } from "src/common/enums/enums";

export class JwtPayloadDto {
  @IsInt()
  userId: number;

  @IsEmail()
  email: string;

  @IsEnum(ROLES)
  role: ROLES;
}
