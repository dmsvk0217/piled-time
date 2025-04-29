import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleLogin() {}

  @Get("google/redirect")
  @UseGuards(AuthGuard("google"))
  async googleRedirect(@Req() req, @Res() res) {
    const jwt = this.authService.login(req.user);
    const callbackUrl = this.configService.get<string>("OAUTH_CALLBACK_URL");
    return res.redirect(`${callbackUrl}?token=${jwt}`);
  }
}
