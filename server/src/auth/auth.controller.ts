import { Controller, Get, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
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
  async googleRedirect(@Req() req, @Res() res: Response) {
    const { accessToken, refreshToken } = this.authService.login(req.user);

    this.authService.setAuthCookies(res, accessToken, refreshToken);

    const callbackUrl = this.configService.get<string>("OAUTH_CALLBACK_URL");
    return res.redirect(callbackUrl);
  }

  @Get("refresh")
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies["refresh_token"];
    if (!refreshToken) throw new UnauthorizedException();

    const newAccessToken = await this.authService.refreshAccessToken(refreshToken);

    this.authService.setAuthCookies(res, newAccessToken);

    return { ok: true };
  }

  @Get("logout")
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies["refresh_token"];
    if (refreshToken) {
      await this.authService.verifyAndRemoveRefreshToken(refreshToken);
    }

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    return { message: "Logged out" };
  }
}
