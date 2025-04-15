import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { PlannerResponse } from "src/module/planner/dto";
import { User } from "src/module/user/entities/user.entity";
import { Repository } from "typeorm";
import { Action } from "../action/entities/action.entity";
import { Feedback } from "../feedback/entities/feedback.entity";
import { Plan } from "../plan/entities/plan.entity";
import { Todo } from "../todo/entities/todo.entity";

@Injectable()
export class PlannerService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepo: Repository<Todo>,
    @InjectRepository(Plan)
    private readonly planRepo: Repository<Plan>,
    @InjectRepository(Action)
    private readonly actionRepo: Repository<Action>,
    @InjectRepository(Feedback)
    private readonly feedbackRepo: Repository<Feedback>
  ) {}

  async getDailyPlanner2(user: User, date: Date): Promise<PlannerResponse> {
    const [todos, plans, actions, feedbacks] = await Promise.all([
      this.todoRepo.find({
        where: { user: { id: user.id }, date },
        relations: ["category"],
      }),
      this.planRepo.find({
        where: { todo: { user: { id: user.id } }, startAt: date },
        relations: ["todo"],
      }),
      this.actionRepo.find({
        where: { todo: { user: { id: user.id } }, startAt: date },
        relations: ["todo"],
      }),
      this.feedbackRepo.findOne({
        where: { user: { id: user.id }, date },
      }),
    ]);

    return plainToInstance(PlannerResponse, {
      date,
      todos,
      plans,
      actions,
      feedback: feedbacks,
    });
  }

  async getDailyPlanner(user: User, date: Date): Promise<PlannerResponse> {
    const todos = await this.todoRepo.find({
      where: { user: { id: user.id }, date },
      relations: {
        category: true,
        plans: true,
        actions: true,
      },
    });
    console.log("🚀 ~ PlannerService ~ getDailyPlanner ~ todos:", todos);
    return plainToInstance(PlannerResponse, {
      todos,
    });
  }
}
