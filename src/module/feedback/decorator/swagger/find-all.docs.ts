import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { CategoryResponse } from "src/module/category/dto";

export function FindAllDocs(): MethodDecorator {
  return (target: string, key: string, descriptor: any) => {
    ApiOperation({
      summary: "카테고리 정보 리스트",
      description: "카테고리 정보 리스트를 조회합니다.",
    })(target, key, descriptor);

    ApiOkResponse({
      description: "카테고리 정보 리스트 조회 성공",
      type: CategoryResponse,
      isArray: true,
    })(target, key, descriptor);
  };
}
