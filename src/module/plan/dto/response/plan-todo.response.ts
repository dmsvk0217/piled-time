import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { PlanResponse } from "src/module/plan/dto/response/plan.response";
import { TodoResponse } from "src/module/todo/dto";

export class PlanTodoResponse extends PlanResponse {
  @ApiProperty({ description: "할 일 정보" })
  @Expose()
  @Type(() => TodoResponse)
  todo: TodoResponse;
}
