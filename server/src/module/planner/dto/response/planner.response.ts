import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { TodoDetailResponse } from "src/module/todo/dto";

export class PlannerResponse {
  @ApiProperty({ type: String, example: "2024-04-01" })
  @Expose()
  date: Date;

  @ApiProperty({ type: () => [TodoDetailResponse] })
  @Expose()
  @Type(() => TodoDetailResponse)
  todos: TodoDetailResponse[];
}
