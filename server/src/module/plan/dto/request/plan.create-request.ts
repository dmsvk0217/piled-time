import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty } from "class-validator";
import { Plan } from "src/module/plan/entities/plan.entity";

export class PlanCreateRequest extends OmitType(Plan, [
  "todo",
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
]) {
  @ApiProperty({ example: 1, description: "할일 ID" })
  @IsInt()
  @IsNotEmpty()
  todoId: number;

  @ApiProperty({ example: "2025-01-01", description: "계획 시작 날짜" })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  startAt: Date;

  @ApiProperty({ example: 75, description: "계획 시간 (분)" })
  @IsInt()
  @IsNotEmpty()
  duration: number;
}
