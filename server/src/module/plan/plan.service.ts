import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import {
  PlanCreateRequest,
  PlanResponse,
  PlanUpdateRequest,
} from "src/module/plan/dto";
import { Plan } from "src/module/plan/entities/plan.entity";
import { PlanException } from "src/module/plan/errors/plan.exception";
import { TodoService } from "src/module/todo/todo.service";
import { User } from "src/module/user/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,

    private readonly todoService: TodoService,
  ) {}

  async create(request: PlanCreateRequest, user: User): Promise<PlanResponse> {
    const todo = await this.todoService.findDetailById(request.todoId, user);
    if (todo.plans.length) throw PlanException.ALREADY_EXISTS;
    const plan = this.planRepository.create({ ...request, todo });
    const result = await this.planRepository.save(plan);
    return plainToInstance(PlanResponse, result);
  }

  async findAll(user: User): Promise<PlanResponse[]> {
    const plans = await this.planRepository.find({
      where: { todo: { user: { id: user.id } } },
    });
    return plans.map((plan) => plainToInstance(PlanResponse, plan));
  }

  async findOne(id: number, user: User): Promise<PlanResponse> {
    const result = await this.findById(id, user);
    return plainToInstance(PlanResponse, result);
  }

  async update(
    id: number,
    request: PlanUpdateRequest,
    user: User,
  ): Promise<PlanResponse> {
    const plan = await this.findById(id, user);
    this.planRepository.merge(plan, request);
    const result = await this.planRepository.save(plan);
    return plainToInstance(PlanResponse, result);
  }

  async remove(id: number, user: User): Promise<void> {
    const plan = await this.findById(id, user);
    await this.planRepository.softRemove(plan);
  }

  private async findById(id: number, user: User): Promise<Plan> {
    const plan = await this.planRepository.findOne({
      where: { id, todo: { user: { id: user.id } } },
    });
    if (!plan) throw PlanException.NOT_EXISTS;
    return plan;
  }
}
