import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { UserResponse } from "src/module/user/dto";

export function ProfileDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: "유저 프로파일",
      description: "유저 프로파일을 조회합니다.",
    }),
    ApiOkResponse({
      description: "유저 정보 조회 성공",
      type: UserResponse,
    })
  );
}
