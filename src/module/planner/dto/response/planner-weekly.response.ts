import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { TodoDetailResponse } from "src/module/todo/dto";

export class PlannerWeekResponse {
  @ApiProperty({ type: String, example: "2024-04-14" })
  @Expose()
  start: Date;

  @ApiProperty({ type: String, example: "2024-04-20" })
  @Expose()
  end: Date;

  @ApiProperty({ type: () => [TodoDetailResponse] })
  @Expose()
  @Type(() => TodoDetailResponse)
  todos: TodoDetailResponse[];
}
