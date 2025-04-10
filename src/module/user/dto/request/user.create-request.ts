import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { User } from "src/module/user/entities/user.entity";

export class UserCreateRequest extends OmitType(User, [
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "categories",
  "feedbacks",
  "memos",
  "todolists",
]) {
  @ApiProperty({ example: "name", description: "유저 이름" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "test@gmail.com", description: "이메일" })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "010-1111-1111", description: "전화번호" })
  @IsString()
  @Matches(/^01[016789]-\d{3,4}-\d{4}$/, {
    message: "휴대폰 번호 형식이 올바르지 않습니다",
  })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: "password", description: "비밀번호" })
  @IsString()
  @IsNotEmpty()
  password: string;
}
