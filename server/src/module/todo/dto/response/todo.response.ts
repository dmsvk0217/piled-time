import { ApiProperty, IntersectionType, OmitType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { BaseResponseDto } from "src/common/database/dto/base-response.dto";
import { Todo } from "src/module/todo/entities/todo.entity";

export class TodoResponse extends IntersectionType(
  OmitType(Todo, ["user", "category", "plans", "actions"] as const),
  BaseResponseDto,
) {
  @ApiProperty({ example: "2025-01-01", description: "할 일 작성 날짜" })
  @Expose()
  date: Date;

  @ApiProperty({ example: "this is content", description: "할 일  내용" })
  @Expose()
  content: string;
}
