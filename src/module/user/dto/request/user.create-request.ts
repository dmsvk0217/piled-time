import { OmitType } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { User } from "src/module/user/user.entity";

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
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  color: string;
}
