import { ApiProperty, IntersectionType, OmitType } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { BaseResponseDto } from "src/common/database/dto/base-response.dto";
import { CategoryResponse } from "src/module/category/dto";
import { Todo } from "src/module/todo/entities/todo.entity";

export class TodoResponse extends IntersectionType(
  OmitType(Todo, ["user", "category", "plans", "actions"] as const),
  BaseResponseDto
) {
  @ApiProperty({ description: "카테고리 정보" })
  @Expose()
  @Type(() => CategoryResponse)
  category: CategoryResponse;

  @ApiProperty({ example: "2025-01-01", description: "할 일 작성 날짜" })
  @Expose()
  date: Date;

  @ApiProperty({ example: "this is content", description: "할 일  내용" })
  @Expose()
  content: string;
}
