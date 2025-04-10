import { ApiProperty, IntersectionType, OmitType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { BaseResponseDto } from "src/common/database/dto/base-response.dto";
import { User } from "src/module/user/entities/user.entity";

export class UserResponse extends IntersectionType(
  OmitType(User, ["categories", "feedbacks", "memos", "todolists", "password"] as const),
  BaseResponseDto
) {
  @ApiProperty({ example: "name", description: "유저 이름" })
  @Expose()
  name: string;

  @ApiProperty({ example: "test@gmail.com", description: "이메일" })
  @Expose()
  email: string;

  @ApiProperty({ example: "google", description: "provider" })
  @Expose()
  provider: string;

  @ApiProperty({ example: "010-1111-1111", description: "전화번호" })
  @Expose()
  phone: string;
}
