import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";
import { Todo } from "src/module/todo/entities/todo.entity";

export class TodoCreateRequest extends OmitType(Todo, [
  "user",
  "category",
  "plan",
  "action",
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
]) {
  @ApiProperty({ example: 1, description: "카테고리 ID" })
  @IsInt()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({ example: "2025-01-01", description: "할 일 작성 날짜" })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @ApiProperty({ example: "this is content", description: "할 일 내용" })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: 0, description: "달성률(0~100)", required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  percent?: number;
}
