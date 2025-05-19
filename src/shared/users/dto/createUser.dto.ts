import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsEnum,
} from "class-validator";
import { ROLES, STATUS } from "src/common/enums/enums";
import { Role, Status } from "@prisma/client";

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    default: "",
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    required: true,
    default: "",
  })
  email: string;

  @MinLength(6)
  @IsString()
  @ApiProperty({
    required: true,
    default: "",
  })
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({
    enum: ROLES,
  })
  @IsEnum(ROLES)
  @IsOptional()
  role?: ROLES;

  @IsString()
  @IsOptional()
  imageURL: string;

  @ApiProperty({
    enum: STATUS,
  })
  @IsOptional()
  @IsEnum(STATUS)
  status?: STATUS;
}

export class CreateUserResponseDto {
  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional({})
  password: string;

  @IsOptional()
  role?: Role;

  @IsOptional()
  imageURL: string | null;

  createdAt: Date;

  updatedAt: Date;

  @IsOptional()
  status?: Status;
}

export class GetAllUsersResponseDto {
  name: string;

  email: string;

  password: string;

  @IsEnum(Role)
  role?: Role;

  imageURL: string | undefined;

  createdAt: Date;

  updatedAt: Date;

  id: number;

  @IsEnum(Status)
  status?: Status;
}

export class UpdateUserResponseDto extends PartialType(CreateUserDto) {}
