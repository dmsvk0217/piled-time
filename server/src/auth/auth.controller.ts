import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { AuthService } from "src/auth/auth.service";
import { AuthDocs } from "src/auth/decorator/swagger";
import { OAuthExceptionFilter } from "src/auth/filters/auth.filter";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @AuthDocs.googleLogin()
  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleLogin() {}

  @AuthDocs.googleRedirect()
  @Get("google/redirect")
  @UseGuards(AuthGuard("google"))
  @UseFilters(OAuthExceptionFilter)
  async googleRedirect(@Req() req, @Res() res: Response) {
    const { accessToken, refreshToken, csrfToken } = this.authService.login(req.user);
    this.authService.setAuthCookies(res, accessToken, refreshToken, csrfToken);

    const callbackUrl = this.configService.get<string>("OAUTH_CALLBACK_URL");
    return res.redirect(callbackUrl);
  }

  @AuthDocs.refresh()
  @Get("refresh")
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies["refresh_token"];
    if (!refreshToken) throw new UnauthorizedException();

    const newAccessToken = await this.authService.refreshAccessToken(refreshToken);
    this.authService.setAccessTokenCookie(res, newAccessToken);

    return { ok: true };
  }

  @AuthDocs.logout()
  @Post("logout")
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies["refresh_token"];
    if (refreshToken) {
      await this.authService.verifyAndRemoveRefreshToken(refreshToken);
    }

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.clearCookie("csrf_token");

    return { message: "Logged out" };
  }

  @AuthDocs.getCsrfToken()
  @Get("csrf-token")
  getCsrfToken(@Res({ passthrough: true }) res: Response) {
    const csrfToken = this.authService.generateCsrfToken();
    this.authService.setCsrfTokenCookie(res, csrfToken);

    return { csrfToken };
  }
}
