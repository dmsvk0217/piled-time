import { PartialType } from "@nestjs/swagger";
import { UserCreateRequest } from "src/module/user/dto";

export class UserUpdateRequest extends PartialType(UserCreateRequest) {}
