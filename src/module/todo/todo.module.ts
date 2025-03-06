import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todo } from "src/module/todo/todo.entity";

@Module({ imports: [TypeOrmModule.forFeature([Todo])] })
export class TodoModule {}
