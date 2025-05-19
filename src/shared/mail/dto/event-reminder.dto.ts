import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsString } from "class-validator";
import { Messages } from "src/common/constants/mail.constants";
import { Transform } from "class-transformer";

export class eventReminder {
  @ApiProperty({
    required: true,
    default: "",
  })
  recipients: string[];

  @IsString()
  @ApiProperty({
    required: true,
    default: "",
  })
  subject: string;

  @IsDate({ message: Messages.INVALID_DATE })
  @ApiProperty({
    example: "04-15-2025",
  })
  date: Date;
}

export class setEventReminderDto {
  @Transform((value) => Number)
  @IsInt()
  @ApiProperty({
    required: true,
  })
  eventId: number;
}
