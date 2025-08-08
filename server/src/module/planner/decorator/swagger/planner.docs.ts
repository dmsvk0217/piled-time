import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { PlannerResponse, PlannerWeekdayResponse } from "src/module/planner/dto";

export class PlannerDocs {
  static getDaily(): MethodDecorator {
    return applyDecorators(
      ApiOperation({
        summary: "일간 플래너 조회",
        description: "지정한 날짜의 플래너 데이터를 조회합니다.",
      }),
      ApiQuery({
        name: "date",
        required: true,
        description: "YYYY-MM-DD 형식의 날짜",
        type: String,
      }),
      ApiResponse({
        status: 200,
        description: "일간 플래너 조회 성공",
        type: PlannerResponse,
      })
    );
  }

  static getWeekly(): MethodDecorator {
    return applyDecorators(
      ApiOperation({
        summary: "주간 플래너 조회",
        description: "지정한 날짜가 포함된 주간의 모든 플래너 데이터를 조회합니다.",
      }),
      ApiQuery({
        name: "date",
        required: true,
        description: "YYYY-MM-DD 형식의 날짜",
        type: String,
      }),
      ApiResponse({
        status: 200,
        description: "주간 플래너 조회 성공",
        type: PlannerResponse,
        isArray: true,
      })
    );
  }

  static getMonthly(): MethodDecorator {
    return applyDecorators(
      ApiOperation({
        summary: "월간 플래너 조회",
        description: "지정한 날짜가 포함된 월간의 모든 플래너 데이터를 조회합니다.",
      }),
      ApiQuery({
        name: "date",
        required: true,
        description: "YYYY-MM-DD 형식의 날짜",
        type: String,
      }),
      ApiResponse({
        status: 200,
        description: "월간 플래너 조회 성공",
        type: PlannerResponse,
        isArray: true,
      })
    );
  }

  static getWeekday(): MethodDecorator {
    return applyDecorators(
      ApiOperation({
        summary: "요일별 플래너 조회",
        description: "지정한 요일(예: 월요일)에 해당하는 모든 플래너 데이터를 조회합니다.",
      }),
      ApiQuery({
        name: "date",
        required: true,
        description: "YYYY-MM-DD 형식의 날짜",
        type: String,
      }),
      ApiQuery({
        name: "weekday",
        required: true,
        description: "0(일) ~ 6(토) 형식의 요일 인덱스",
        type: Number,
      }),
      ApiResponse({
        status: 200,
        description: "요일별 플래너 조회 성공",
        type: PlannerWeekdayResponse,
      })
    );
  }
}
