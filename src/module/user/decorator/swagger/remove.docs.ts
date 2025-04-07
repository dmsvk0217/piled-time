import { ApiNoContentResponse, ApiOperation, ApiParam } from "@nestjs/swagger";

export function RemoveDocs(): MethodDecorator {
  return (target: string, key: string, descriptor: any) => {
    ApiOperation({
      summary: "유저 정보 삭제",
      description: "유저 정보를 삭제합니다.",
    })(target, key, descriptor);

    ApiParam({
      name: "id",
      description: "유저 ID",
    })(target, key, descriptor);

    ApiNoContentResponse({
      description: "유저 정보 삭제 성공",
    })(target, key, descriptor);
  };
}
