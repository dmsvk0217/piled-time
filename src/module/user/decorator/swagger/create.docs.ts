import { ApiBody, ApiCreatedResponse, ApiOperation } from "@nestjs/swagger";
import { UserCreateRequest, UserResponse } from "src/module/user/dto";

export function CreateDocs(): MethodDecorator {
  return (target: string, key: string, descriptor: any) => {
    ApiOperation({
      summary: "유저 정보 저장",
      description: "유저 정보를 저장합니다.",
    })(target, key, descriptor);

    ApiBody({
      type: UserCreateRequest,
    })(target, key, descriptor);

    ApiCreatedResponse({
      description: "유저 정보 저장 성공",
      type: UserResponse,
    })(target, key, descriptor);
  };
}
