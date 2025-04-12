import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleLogin() {}

  @Get("google/redirect")
  @UseGuards(AuthGuard("google"))
  async googleRedirect(@Req() req) {
    return this.authService.login(req.user);
  }
}
