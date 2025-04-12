import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty } from "class-validator";
import { Action } from "src/module/action/entities/action.entity";

export class ActionCreateRequest extends OmitType(Action, [
  "todo",
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
]) {
  @ApiProperty({ example: 1, description: "할 일 ID" })
  @IsInt()
  @IsNotEmpty()
  todoId: number;

  @ApiProperty({ example: "2025-01-01", description: "실행 시작 날짜" })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  startAt: Date;

  @ApiProperty({ example: 75, description: "실행 시간 (분)" })
  @IsInt()
  @IsNotEmpty()
  duration: number;
}
