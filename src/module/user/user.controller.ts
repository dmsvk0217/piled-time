import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { User } from "src/module/user/user.entity";
import { UserService } from "src/module/user/user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Put(":id")
  update(@Param("id") id: number, @Body() user: Partial<User>) {
    return this.userService.update(id, user);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.userService.remove(id);
  }
}
