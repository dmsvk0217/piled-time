import { ApiNoContentResponse, ApiOperation, ApiParam } from "@nestjs/swagger";

export function RemoveDocs(): MethodDecorator {
  return (target: string, key: string, descriptor: any) => {
    ApiOperation({
      summary: "피드백 정보 삭제",
      description: "피드백 정보를 삭제합니다.",
    })(target, key, descriptor);

    ApiParam({
      name: "id",
      description: "피드백 ID",
    })(target, key, descriptor);

    ApiNoContentResponse({
      description: "피드백 정보 삭제 성공",
    })(target, key, descriptor);
  };
}
