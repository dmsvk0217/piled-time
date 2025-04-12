import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { CategoryService } from "src/module/category/category.service";
import { TodoCreateRequest, TodoResponse, TodoUpdateRequest } from "src/module/Todo/dto";
import { Todo } from "src/module/Todo/entities/Todo.entity";
import { TodoException } from "src/module/Todo/errors/Todo.exception";
import { User } from "src/module/user/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,

    private readonly categoryService: CategoryService
  ) {}

  async create(request: TodoCreateRequest, user: User): Promise<TodoResponse> {
    const category = await this.categoryService.findById(request.categoryId, user);
    const todo = this.todoRepository.create({ ...request, user, category });
    const result = await this.todoRepository.save(todo);
    return plainToInstance(TodoResponse, result);
  }

  async findAll(user: User): Promise<TodoResponse[]> {
    const todos = await this.todoRepository.find({
      where: { user: { id: user.id } },
    });
    return todos.map((todo) => plainToInstance(TodoResponse, todo));
  }

  async findOne(id: number, user: User): Promise<TodoResponse> {
    const result = await this.findById(id, user);
    return plainToInstance(TodoResponse, result);
  }

  async update(id: number, request: TodoUpdateRequest, user: User): Promise<TodoResponse> {
    const todo = await this.findById(id, user);
    this.todoRepository.merge(todo, request);
    const result = await this.todoRepository.save(todo);
    return plainToInstance(TodoResponse, result);
  }

  async remove(id: number, user: User): Promise<void> {
    const todo = await this.findById(id, user);
    await this.todoRepository.softRemove(todo);
  }

  async findById(id: number, user: User): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!todo) throw TodoException.NOT_EXISTS;
    return todo;
  }

  async findDetailById(id: number, user: User): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: { id, user: { id: user.id } },
      relations: ["plans", "actions"],
    });
    if (!todo) throw TodoException.NOT_EXISTS;
    return todo;
  }
}
