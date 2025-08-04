import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";

export class AuthDocs {
  static googleLogin(): MethodDecorator {
    return applyDecorators(
      ApiOperation({
        summary: "구글 로그인 요청",
        description: "구글 로그인 페이지로 리다이렉트합니다.",
      }),
      ApiResponse({ status: 302, description: "구글 인증 페이지로 리다이렉트됨" })
    );
  }

  static googleRedirect(): MethodDecorator {
    return applyDecorators(
      ApiOperation({
        summary: "구글 로그인 콜백",
        description: "구글 로그인 후 사용자 정보를 처리하고 토큰을 발급합니다.",
      }),
      ApiResponse({ status: 302, description: "로그인 완료 후 프론트엔드로 리다이렉트됨" }),
      ApiUnauthorizedResponse({ description: "인증 실패" })
    );
  }

  static refresh(): MethodDecorator {
    return applyDecorators(
      ApiOperation({
        summary: "액세스 토큰 갱신",
        description: "리프레시 토큰을 사용해 새로운 액세스 토큰을 발급합니다.",
      }),
      ApiResponse({ status: 200, description: "액세스 토큰 갱신 성공" }),
      ApiUnauthorizedResponse({ description: "리프레시 토큰 없음 또는 유효하지 않음" })
    );
  }

  static logout(): MethodDecorator {
    return applyDecorators(
      ApiOperation({
        summary: "로그아웃",
        description: "쿠키를 제거하고 로그아웃 처리합니다.",
      }),
      ApiResponse({ status: 200, description: "로그아웃 성공" })
    );
  }

  static getCsrfToken(): MethodDecorator {
    return applyDecorators(
      ApiOperation({
        summary: "CSRF 토큰 발급",
        description: "CSRF 보호용 토큰을 쿠키로 발급받습니다.",
      }),
      ApiResponse({ status: 200, description: "CSRF 토큰 발급 성공" })
    );
  }
}
