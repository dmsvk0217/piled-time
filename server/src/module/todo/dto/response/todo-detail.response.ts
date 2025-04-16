import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ActionResponse } from "src/module/action/dto";
import { CategoryResponse } from "src/module/category/dto";
import { PlanResponse } from "src/module/plan/dto";
import { TodoResponse } from "src/module/todo/dto/response/todo.response";

export class TodoDetailResponse extends TodoResponse {
  @ApiProperty({ description: "카테고리 정보", type: () => CategoryResponse })
  @Expose()
  @Type(() => CategoryResponse)
  category: CategoryResponse;

  @ApiProperty({ description: "실행 정보", type: () => [ActionResponse] })
  @Expose()
  @Type(() => ActionResponse)
  actions: ActionResponse[];

  @ApiProperty({ description: "계획 정보", type: () => [PlanResponse] })
  @Expose()
  @Type(() => PlanResponse)
  plans: PlanResponse[];
}
