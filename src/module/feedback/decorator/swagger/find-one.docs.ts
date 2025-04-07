import { ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";
import { FeedbackResponse } from "src/module/feedback/dto";

export function FindOneDocs(): MethodDecorator {
  return (target: string, key: string, descriptor: any) => {
    ApiOperation({
      summary: "피드백 정보 상세",
      description: "피드백 정보를 조회합니다.",
    })(target, key, descriptor);

    ApiParam({
      name: "id",
      type: Number,
      description: "피드백 ID",
    })(target, key, descriptor);

    ApiOkResponse({
      description: "피드백 정보 조회 성공",
      type: FeedbackResponse,
    })(target, key, descriptor);
  };
}
