import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { CategoryModule } from "src/module/category/category.module";
import { Todo } from "src/module/todo/entities/todo.entity";
import { TodoController } from "src/module/todo/todo.controller";
import { TodoService } from "src/module/todo/todo.service";
import { User } from "src/module/user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Todo, User]), AuthModule, CategoryModule],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
