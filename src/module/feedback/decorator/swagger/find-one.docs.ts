import { ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";
import { CategoryResponse } from "src/module/category/dto";

export function FindOneDocs(): MethodDecorator {
  return (target: string, key: string, descriptor: any) => {
    ApiOperation({
      summary: "카테고리 정보 상세",
      description: "카테고리 정보를 조회합니다.",
    })(target, key, descriptor);

    ApiParam({
      name: "id",
      type: Number,
      description: "카테고리 ID",
    })(target, key, descriptor);

    ApiOkResponse({
      description: "카테고리 정보 조회 성공",
      type: CategoryResponse,
    })(target, key, descriptor);
  };
}
