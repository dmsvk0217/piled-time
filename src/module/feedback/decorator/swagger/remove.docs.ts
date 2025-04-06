import { ApiNoContentResponse, ApiOperation, ApiParam } from "@nestjs/swagger";

export function RemoveDocs(): MethodDecorator {
  return (target: string, key: string, descriptor: any) => {
    ApiOperation({
      summary: "카테고리 정보 삭제",
      description: "카테고리 정보를 삭제합니다.",
    })(target, key, descriptor);

    ApiParam({
      name: "id",
      description: "카테고리 ID",
    })(target, key, descriptor);

    ApiNoContentResponse({
      description: "카테고리 정보 삭제 성공",
    })(target, key, descriptor);
  };
}
