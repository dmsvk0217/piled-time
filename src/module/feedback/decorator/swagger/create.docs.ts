import { ApiBody, ApiCreatedResponse, ApiOperation } from "@nestjs/swagger";
import { CategoryCreateRequest, CategoryResponse } from "src/module/category/dto";

export function CreateDocs(): MethodDecorator {
  return (target: string, key: string, descriptor: any) => {
    ApiOperation({
      summary: "카테고리 정보 저장",
      description: "카테고리 정보를 저장합니다.",
    })(target, key, descriptor);

    ApiBody({
      type: CategoryCreateRequest,
    })(target, key, descriptor);

    ApiCreatedResponse({
      description: "카테고리 정보 저장 성공",
      type: CategoryResponse,
    })(target, key, descriptor);
  };
}
