import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { TodoDetailResponse } from "src/module/todo/dto";

export class DailyPlannerResponse {
  @ApiProperty({ type: () => [TodoDetailResponse] })
  @Expose()
  @Type(() => TodoDetailResponse)
  todos: TodoDetailResponse[];
}
