import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class uploadDto {
  @ApiProperty({})
  @IsNumber()
  @Type(() => Number)
  id: number;

  @ApiProperty({})
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @ApiProperty({})
  @IsString()
  filename: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({})
  filePath: string;
}
