import { OmitType } from "@nestjs/swagger";
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
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Matches(/^01[016789]-\d{3,4}-\d{4}$/, {
    message: "휴대폰 번호 형식이 올바르지 않습니다",
  })
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
