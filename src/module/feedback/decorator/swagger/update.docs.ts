import { ApiBody, ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";
import { CategoryResponse, CategoryUpdateRequest } from "src/module/category/dto";

export function UpdateDocs(): MethodDecorator {
  return (target: string, key: string, descriptor: any) => {
    ApiOperation({
      summary: "카테고리 정보 수정",
      description: "카테고리 정보를 수정합니다.",
    })(target, key, descriptor);

    ApiParam({
      name: "id",
      description: "카테고리 ID",
    })(target, key, descriptor);

    ApiBody({
      type: CategoryUpdateRequest,
    })(target, key, descriptor);

    ApiOkResponse({
      type: CategoryResponse,
      description: "카테고리 정보 수정 성공",
    })(target, key, descriptor);
  };
}
