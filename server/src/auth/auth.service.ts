import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { randomBytes } from "node:crypto";
import { User } from "src/module/user/entities/user.entity";
import { UserException } from "src/module/user/errors/user.exception";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  login(user: User) {
    const payload = { email: user.email, sub: user.id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: "15m",
      secret: process.env.ACCESS_SECRET,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: "7d",
      secret: process.env.REFRESH_SECRET,
    });

    this.saveRefreshToken(user.id, refreshToken);

    const csrfToken = this.generateCsrfToken();

    return { accessToken, refreshToken, csrfToken };
  }

  async saveRefreshToken(userId: number, token: string) {
    await this.userRepository.update(userId, { refreshToken: token });
  }

  async removeRefreshToken(userId: number) {
    await this.userRepository.update(userId, { refreshToken: null });
  }

  private readonly secure = process.env.NODE_ENV === "production";
  private readonly sameSite = this.secure ? "none" : "lax";

  setAccessTokenCookie(res: Response, token: string) {
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: this.secure,
      sameSite: this.sameSite,
      maxAge: 1000 * 60 * 15, // 15분
    });
  }

  setRefreshTokenCookie(res: Response, token: string) {
    res.cookie("refresh_token", token, {
      httpOnly: true,
      secure: this.secure,
      sameSite: this.sameSite,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
    });
  }

  setCsrfTokenCookie(res: Response, token: string) {
    res.cookie("csrf_token", token, {
      httpOnly: false,
      secure: this.secure,
      sameSite: this.sameSite,
      maxAge: 1000 * 60 * 15, // 15분
    });
  }

  setAuthCookies(res: Response, accessToken?: string, refreshToken?: string, csrfToken?: string) {
    if (accessToken) this.setAccessTokenCookie(res, accessToken);
    if (refreshToken) this.setRefreshTokenCookie(res, refreshToken);
    if (csrfToken) this.setCsrfTokenCookie(res, csrfToken);
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_SECRET,
      });

      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException("Invalid refresh token");
      }

      const newAccessToken = this.jwtService.sign(
        { sub: user.id, email: user.email },
        { secret: process.env.ACCESS_SECRET, expiresIn: "15m" }
      );

      return newAccessToken;
    } catch (err) {
      throw new UnauthorizedException("Refresh token expired or invalid");
    }
  }

  async verifyAndRemoveRefreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_SECRET,
      });
      await this.removeRefreshToken(payload.sub);
    } catch {
      // 무시 — 토큰이 유효하지 않더라도 클리어 진행
    }
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw UserException.NOT_EXISTS;
    return user;
  }

  generateCsrfToken(): string {
    return randomBytes(32).toString("hex");
  }
}
