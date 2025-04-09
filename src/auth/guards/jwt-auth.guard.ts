import { ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  private logger = new Logger(JwtAuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { method, originalUrl, ip, headers } = request;

    try {
      const result = (await super.canActivate(context)) as boolean;

      const user = request.user as any;

      this.logger.log(
        `[✅ JWT 인증 성공]
➡️ ${method} ${originalUrl}
👤 userId: ${user?.id ?? "N/A"}, email: ${user?.email ?? "N/A"}
🌐 IP: ${ip}
📱 UA: ${headers["user-agent"]}
`
      );

      return result;
    } catch (err) {
      this.logger.warn(
        `[❌ JWT 인증 실패]
➡️ ${method} ${originalUrl}
🌐 IP: ${ip}
📱 UA: ${headers["user-agent"]}
💥 이유: ${err?.message ?? "Unknown error"}
`
      );
      throw err;
    }
  }
}
