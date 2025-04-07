import { IntersectionType, OmitType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { BaseResponseDto } from "src/common/database/dto/base-response.dto";
import { User } from "src/module/user/entities/user.entity";

export class UserResponse extends IntersectionType(
  OmitType(User, ["categories", "feedbacks", "memos", "todolists", "password"] as const),
  BaseResponseDto
) {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;
}
