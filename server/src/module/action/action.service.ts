import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { ActionCreateRequest, ActionResponse, ActionUpdateRequest } from "src/module/action/dto";
import { Action } from "src/module/action/entities/action.entity";
import { ActionException } from "src/module/action/errors/action.exception";
import { TodoService } from "src/module/todo/todo.service";
import { User } from "src/module/user/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(Action)
    private readonly actionRepository: Repository<Action>,

    private readonly todoService: TodoService
  ) {}

  async create(request: ActionCreateRequest, user: User): Promise<ActionResponse> {
    const todo = await this.todoService.findDetailById(request.todoId, user);
    if (todo.action) throw ActionException.ALREADY_EXISTS;
    const action = this.actionRepository.create({ ...request, todo });
    const result = await this.actionRepository.save(action);
    return plainToInstance(ActionResponse, result);
  }

  async findAll(user: User): Promise<ActionResponse[]> {
    const actions = await this.actionRepository.find({
      where: { todo: { user: { id: user.id } } },
    });
    return actions.map((action) => plainToInstance(ActionResponse, action));
  }

  async findOne(id: number, user: User): Promise<ActionResponse> {
    const result = await this.findById(id, user);
    return plainToInstance(ActionResponse, result);
  }

  async update(id: number, request: ActionUpdateRequest, user: User): Promise<ActionResponse> {
    const action = await this.findById(id, user);
    this.actionRepository.merge(action, request);
    const result = await this.actionRepository.save(action);
    return plainToInstance(ActionResponse, result);
  }

  async remove(id: number, user: User): Promise<void> {
    const action = await this.findById(id, user);
    await this.actionRepository.softRemove(action);
  }

  private async findById(id: number, user: User): Promise<Action> {
    const action = await this.actionRepository.findOne({
      where: { id, todo: { user: { id: user.id } } },
    });
    if (!action) throw ActionException.NOT_EXISTS;
    return action;
  }
}
