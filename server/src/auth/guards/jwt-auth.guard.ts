import { ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  private logger = new Logger(JwtAuthGuard.name);

  constructor(private authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { method, originalUrl, ip } = request;

    const result = (await super.canActivate(context)) as boolean;

    try {
      const { email } = request.user;
      const user = await this.authService.findByEmail(email);
      request.user = user;

      this.logger.log(
        `✅ JWT 인증 성공 | ${method} ${originalUrl} | userId=${user?.id}, email=${user?.email}, ip=${ip}`
      );

      return result;
    } catch (err) {
      this.logger.warn(
        `❌ JWT 인증 실패 | ${method} ${originalUrl} | ip=${ip} | reason=${err?.message}`
      );
      throw err;
    }
  }
}
