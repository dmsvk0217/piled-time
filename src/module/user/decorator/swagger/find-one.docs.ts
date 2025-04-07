import { ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";
import { UserResponse } from "src/module/user/dto";

export function FindOneDocs(): MethodDecorator {
  return (target: string, key: string, descriptor: any) => {
    ApiOperation({
      summary: "유저 정보 상세",
      description: "유저 정보를 조회합니다.",
    })(target, key, descriptor);

    ApiParam({
      name: "id",
      type: Number,
      description: "유저 ID",
    })(target, key, descriptor);

    ApiOkResponse({
      description: "유저 정보 조회 성공",
      type: UserResponse,
    })(target, key, descriptor);
  };
}
