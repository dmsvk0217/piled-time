import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { CategoryResponse } from "src/module/category/dto";
import { TodoResponse } from "src/module/Todo/dto/response/todo.response";

export class TodoCategoryResponse extends TodoResponse {
  @ApiProperty({ description: "카테고리 정보" })
  @Expose()
  @Type(() => CategoryResponse)
  category: CategoryResponse;
}
