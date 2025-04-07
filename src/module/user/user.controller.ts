import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserCreateRequest, UserResponse, UserUpdateRequest } from "src/module/user/dto";
import { UserService } from "src/module/user/user.service";
import { CreateDocs, FindAllDocs, FindOneDocs, RemoveDocs, UpdateDocs } from "./decorator/swagger";

@ApiTags("user")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @CreateDocs()
  @Post()
  create(@Body() request: UserCreateRequest): Promise<UserResponse> {
    return this.userService.create(request);
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
