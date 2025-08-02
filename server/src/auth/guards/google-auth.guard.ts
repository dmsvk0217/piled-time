import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GoogleAuthGuard extends AuthGuard("google") {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  handleRequest(err, user, info, context) {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    if (req.query?.error === "access_denied") {
      const redirectUrl = this.configService.get<string>("FRONTEND_LOGIN_URL");
      res.redirect(redirectUrl);
      throw new UnauthorizedException();
    }

    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
