import { ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "../../module/user/user.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  private logger = new Logger(JwtAuthGuard.name);

  constructor(private readonly userService: UserService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { method, originalUrl, ip, headers } = request;

    try {
      const result = (await super.canActivate(context)) as boolean;
      const { email } = request.user;

      const user = await this.userService.findByEmail(email);
      request.user = user;

      this.logger.log(
        `✅ JWT 인증 성공 | ${method} ${originalUrl} | userId=${user?.id ?? "N/A"}, email=${user?.email ?? "N/A"}, ip=${ip}`
      );

      return result;
    } catch (err) {
      this.logger.warn(
        `❌ JWT 인증 실패 | ${method} ${originalUrl} | ip=${ip} | reason=${err?.message ?? "Unknown error"}`
      );

      throw err;
    }
  }
}
