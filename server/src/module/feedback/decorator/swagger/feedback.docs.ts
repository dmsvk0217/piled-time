import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { FeedbackResponse } from "src/module/feedback/dto";

export class FeedbackDocs {
  static getDaily(): MethodDecorator {
    return applyDecorators(
      ApiOperation({
        summary: "일간 피드백 조회",
        description: "지정한 날짜의 일간 피드백을 조회합니다.",
      }),
      ApiQuery({ name: "date", required: true, description: "YYYY-MM-DD 형식의 날짜" }),
      ApiResponse({
        status: 200,
        description: "일간 피드백 조회 성공",
        type: FeedbackResponse,
      })
    );
  }

  static getWeekly(): MethodDecorator {
    return applyDecorators(
      ApiOperation({
        summary: "주간 피드백 조회",
        description: "지정한 날짜가 포함된 주간 피드백을 조회합니다.",
      }),
      ApiQuery({ name: "date", required: true, description: "YYYY-MM-DD 형식의 날짜" }),
      ApiResponse({
        status: 200,
        description: "주간 피드백 조회 성공",
        type: FeedbackResponse,
      })
    );
  }

  static getDailyOfWeek(): MethodDecorator {
    return applyDecorators(
      ApiOperation({
        summary: "일간 피드백 주간 리스트 조회",
        description: "해당 주의 모든 일간 피드백을 조회합니다.",
      }),
      ApiQuery({ name: "date", required: true, description: "YYYY-MM-DD 형식의 날짜" }),
      ApiResponse({
        status: 200,
        description: "일간 피드백 주간 리스트 조회 성공",
        type: FeedbackResponse,
        isArray: true,
      })
    );
  }
}
