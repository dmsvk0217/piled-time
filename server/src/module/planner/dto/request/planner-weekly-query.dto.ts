import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty } from "class-validator";

export class WeeklyPlannerQueryDto {
  @ApiProperty({ example: "2024-04-15", description: "기준 일자" })
  @IsDateString(
    { strict: false },
    { message: "start must be a valid date string (YYYY-MM-DD)" },
  )
  @IsNotEmpty()
  start: string;
}
