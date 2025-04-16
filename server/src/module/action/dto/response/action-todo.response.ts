import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ActionResponse } from "src/module/action/dto/response/action.response";
import { TodoResponse } from "src/module/todo/dto";

export class ActionTodoResponse extends ActionResponse {
  @ApiProperty({ description: "할 일 정보" })
  @Expose()
  @Type(() => TodoResponse)
  todo: TodoResponse;
}
