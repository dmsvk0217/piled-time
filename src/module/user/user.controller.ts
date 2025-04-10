import { Body, Controller, Delete, Get, HttpCode, Param, Patch, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetUser } from "src/common/decorators/user.decorator";
import { UserResponse, UserUpdateRequest } from "src/module/user/dto";
import { User } from "src/module/user/entities/user.entity";
import { UserService } from "src/module/user/user.service";
import { FindAllDocs, FindOneDocs, RemoveDocs, UpdateDocs } from "./decorator/swagger";

@ApiTags("user")
@UseGuards(JwtAuthGuard)
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/profile")
  getProfile(@GetUser() user: User) {
    return plainToInstance(UserResponse, user);
  }

  @FindAllDocs()
  @Get()
  findAll(): Promise<UserResponse[]> {
    return this.userService.findAll();
  }

  @FindOneDocs()
  @Get(":id")
  findOne(@Param("id") id: number): Promise<UserResponse> {
    return this.userService.findOne(id);
  }

  @UpdateDocs()
  @Patch(":id")
  update(@Param("id") id: number, @Body() request: UserUpdateRequest): Promise<UserResponse> {
    return this.userService.update(id, request);
  }

  @HttpCode(204)
  @RemoveDocs()
  @Delete(":id")
  remove(@Param("id") id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
