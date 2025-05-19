import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ROLES, STATUS } from "src/common/enums/enums";

export class PayloadDto {
  @IsNotEmpty()
  userId: number;

  @IsEnum(ROLES)
  @IsOptional()
  role: ROLES;

  @IsEnum(STATUS)
  @IsString()
  status: STATUS;
}
