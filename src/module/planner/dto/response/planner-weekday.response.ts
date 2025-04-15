import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { Weekday } from "src/module/planner/type/weekday.enum";
import { TodoDetailResponse } from "src/module/todo/dto";

export class PlannerWeekdayResponse {
  @ApiProperty({ enum: Weekday })
  @Expose()
  weekday: Weekday;

  @ApiProperty({ type: () => [TodoDetailResponse] })
  @Expose()
  @Type(() => TodoDetailResponse)
  todos: TodoDetailResponse[];
}
