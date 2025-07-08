import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty } from "class-validator";

export class DailyPlannerQueryDto {
  @ApiProperty({ example: "2024-04-15", description: "기준 날짜" })
  @IsDateString(
    { strict: false },
    { message: "start must be a valid date string (YYYY-MM-DD)" },
  )
  @IsNotEmpty()
  date: string;
}
