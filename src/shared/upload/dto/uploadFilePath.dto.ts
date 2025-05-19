import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class uploadFilePathDto {
  @IsString()
  filename: string;

  @IsString()
  filePath: string;
}

export class getProfileDto {
  @ApiPropertyOptional()
  filename: string;
}
