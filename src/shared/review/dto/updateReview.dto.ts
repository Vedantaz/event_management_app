import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateReviewDto {
  @IsString()
  @ApiPropertyOptional()
  message: string;
}
