import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { Weekday } from "src/module/planner/type/weekday.enum";

export class WeekdayPlannerQueryDto {
  @ApiProperty({ example: Weekday.MONDAY })
  @IsEnum(Weekday)
  @IsNotEmpty()
  weekday: Weekday;
}
