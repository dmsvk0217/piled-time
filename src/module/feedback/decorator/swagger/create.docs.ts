import { ApiBody, ApiCreatedResponse, ApiOperation } from "@nestjs/swagger";
import { FeedbackCreateRequest, FeedbackResponse } from "src/module/feedback/dto";

export function CreateDocs(): MethodDecorator {
  return (target: string, key: string, descriptor: any) => {
    ApiOperation({
      summary: "피드백 정보 저장",
      description: "피드백 정보를 저장합니다.",
    })(target, key, descriptor);

    ApiBody({
      type: FeedbackCreateRequest,
    })(target, key, descriptor);

    ApiCreatedResponse({
      description: "피드백 정보 저장 성공",
      type: FeedbackResponse,
    })(target, key, descriptor);
  };
}
