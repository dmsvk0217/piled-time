import { ApiProperty, IntersectionType, OmitType } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { BaseResponseDto } from "src/common/database/dto/base-response.dto";
import { Plan } from "src/module/plan/entities/plan.entity";
import { TodoResponse } from "src/module/Todo/dto";

export class PlanResponse extends IntersectionType(
  OmitType(Plan, ["todo"] as const),
  BaseResponseDto
) {
  @ApiProperty({ description: "할 일 정보" })
  @Expose()
  @Type(() => TodoResponse)
  todo: TodoResponse;

  @ApiProperty({ example: "2025-01-01", description: "계획 시작 날짜" })
  @Expose()
  @Type(() => Date)
  startAt: Date;

  @ApiProperty({ example: 75, description: "계획 시간 (분)" })
  @Expose()
  duration: number;
}
