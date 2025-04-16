import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetUser } from "src/common/decorators/user.decorator";
import { CrudDocs } from "src/common/docs/crud-docs.decorator";
import { TodoDocs } from "src/module/todo/decorator/swagger";
import { TodoCreateRequest, TodoResponse, TodoUpdateRequest } from "src/module/todo/dto";
import { TodoService } from "src/module/todo/todo.service";
import { User } from "src/module/user/entities/user.entity";

@ApiTags("Todo")
@UseGuards(JwtAuthGuard)
@Controller("todos")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @CrudDocs.create(TodoDocs.create)
  @Post()
  create(@Body() request: TodoCreateRequest, @GetUser() user: User): Promise<TodoResponse> {
    return this.todoService.create(request, user);
  }

  @CrudDocs.findAll(TodoDocs.findAll)
  @Get()
  findAll(@GetUser() user: User): Promise<TodoResponse[]> {
    return this.todoService.findAll(user);
  }

  @CrudDocs.findOne(TodoDocs.findOne)
  @Get(":id")
  findOne(@Param("id") id: number, @GetUser() user: User): Promise<TodoResponse> {
    return this.todoService.findOne(id, user);
  }

  @CrudDocs.update(TodoDocs.update)
  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body() request: TodoUpdateRequest,
    @GetUser() user: User
  ): Promise<TodoResponse> {
    return this.todoService.update(id, request, user);
  }

  @HttpCode(204)
  @CrudDocs.remove(TodoDocs.remove)
  @Delete(":id")
  remove(@Param("id") id: number, @GetUser() user: User): Promise<void> {
    return this.todoService.remove(id, user);
  }
}
