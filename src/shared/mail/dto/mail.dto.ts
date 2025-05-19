import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsOptional, IsDate } from "class-validator";

export class sendEmailDto {
  @IsEmail({}, { each: true })
  @ApiProperty()
  recipients: string[];

  @IsString()
  @ApiProperty()
  subject: string;

  @IsString()
  @ApiProperty()
  body: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsString()
  scheduleTime: string;

  @IsDate()
  @IsOptional()
  date?: Date;
}
