import { ApiBody, ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";
import { UserResponse, UserUpdateRequest } from "src/module/user/dto";

export function UpdateDocs(): MethodDecorator {
  return (target: string, key: string, descriptor: any) => {
    ApiOperation({
      summary: "유저 정보 수정",
      description: "유저 정보를 수정합니다.",
    })(target, key, descriptor);

    ApiParam({
      name: "id",
      description: "유저 ID",
    })(target, key, descriptor);

    ApiBody({
      type: UserUpdateRequest,
    })(target, key, descriptor);

    ApiOkResponse({
      type: UserResponse,
      description: "유저 정보 수정 성공",
    })(target, key, descriptor);
  };
}
