import { ApiBody, ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";
import { FeedbackResponse, FeedbackUpdateRequest } from "src/module/feedback/dto";

export function UpdateDocs(): MethodDecorator {
  return (target: string, key: string, descriptor: any) => {
    ApiOperation({
      summary: "피드백 정보 수정",
      description: "피드백 정보를 수정합니다.",
    })(target, key, descriptor);

    ApiParam({
      name: "id",
      description: "피드백 ID",
    })(target, key, descriptor);

    ApiBody({
      type: FeedbackUpdateRequest,
    })(target, key, descriptor);

    ApiOkResponse({
      type: FeedbackResponse,
      description: "피드백 정보 수정 성공",
    })(target, key, descriptor);
  };
}
