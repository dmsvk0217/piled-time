import { ApiProperty, IntersectionType, OmitType } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { BaseResponseDto } from "src/common/database/dto/base-response.dto";
import { Action } from "src/module/action/entities/action.entity";
import { TodoResponse } from "src/module/Todo/dto";

export class ActionResponse extends IntersectionType(
  OmitType(Action, ["todo"] as const),
  BaseResponseDto
) {
  @ApiProperty({ description: "할 일 정보" })
  @Expose()
  @Type(() => TodoResponse)
  todo: TodoResponse;

  @ApiProperty({ example: "2025-01-01", description: "실행 시작 날짜" })
  @Expose()
  @Type(() => Date)
  startAt: Date;

  @ApiProperty({ example: 75, description: "실행 시간 (분)" })
  @Expose()
  duration: number;
}
