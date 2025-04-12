import { Body, Controller, Delete, Get, HttpCode, Param, Patch, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetUser } from "src/common/decorators/user.decorator";
import { CrudDocs } from "src/common/docs/crud-docs.decorator";
import { ProfileDocs } from "src/module/user/decorator/swagger";
import { UserDocs } from "src/module/user/decorator/swagger/user.docs";
import { UserResponse, UserUpdateRequest } from "src/module/user/dto";
import { User } from "src/module/user/entities/user.entity";
import { UserService } from "src/module/user/user.service";

@ApiTags("User")
@UseGuards(JwtAuthGuard)
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ProfileDocs()
  @Get("/profile")
  getProfile(@GetUser() user: User) {
    return plainToInstance(UserResponse, user);
  }

  @CrudDocs.findAll(UserDocs.findAll)
  @Get()
  findAll(): Promise<UserResponse[]> {
    return this.userService.findAll();
  }

  @CrudDocs.findOne(UserDocs.findOne)
  @Get(":id")
  findOne(@Param("id") id: number): Promise<UserResponse> {
    return this.userService.findOne(id);
  }

  @CrudDocs.update(UserDocs.update)
  @Patch(":id")
  update(@Param("id") id: number, @Body() request: UserUpdateRequest): Promise<UserResponse> {
    return this.userService.update(id, request);
  }

  @HttpCode(204)
  @CrudDocs.remove(UserDocs.remove)
  @Delete(":id")
  remove(@Param("id") id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
