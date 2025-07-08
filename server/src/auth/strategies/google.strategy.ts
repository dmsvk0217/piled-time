import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {
  Strategy as GoogleStrategyBase,
  Profile,
} from "passport-google-oauth20";
import { User } from "src/module/user/entities/user.entity";
import { UserService } from "src/module/user/user.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  GoogleStrategyBase,
  "google",
) {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.OAUTH_REDIRECT_URL,
      scope: ["email", "profile"],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const email = profile.emails?.[0]?.value;
    const name = profile.displayName;

    let user: User | null = await this.userService.findByEmail(email);

    if (!user) {
      user = await this.userService.create({
        email,
        name,
        provider: "google",
      });
    }

    return user;
  }
}
