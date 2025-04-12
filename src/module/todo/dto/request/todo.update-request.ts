import { PartialType } from "@nestjs/swagger";
import { TodoCreateRequest } from "src/module/todo/dto/request/todo.create-request";

export class TodoUpdateRequest extends PartialType(TodoCreateRequest) {}
