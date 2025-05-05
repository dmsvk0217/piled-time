import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import {
  DailyPlannerQueryDto,
  PlannerResponse,
  PlannerWeekdayResponse,
  PlannerWeekResponse,
  WeekdayPlannerQueryDto,
  WeeklyPlannerQueryDto,
} from "src/module/planner/dto";
import { Weekday } from "src/module/planner/type/weekday.enum";
import { User } from "src/module/user/entities/user.entity";
import { Between, Repository } from "typeorm";
import { Todo } from "../todo/entities/todo.entity";

@Injectable()
export class PlannerService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>
  ) {}
  async getDailyPlanner(user: User, query: DailyPlannerQueryDto): Promise<PlannerResponse> {
    const startDate = new Date(query.date);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const todos = await this.todoRepository.find({
      where: {
        user: { id: user.id },
        date: Between(startDate, endDate),
      },
      relations: {
        category: true,
        plans: true,
        actions: true,
      },
    });

    return plainToInstance(PlannerResponse, {
      todos,
    });
  }

  async getWeeklyPlanner(user: User, query: WeeklyPlannerQueryDto): Promise<PlannerWeekResponse> {
    const startDate = new Date(query.start);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    const todos = await this.todoRepository.find({
      where: { user: { id: user.id }, date: Between(startDate, endDate) },
      relations: {
        category: true,
        plans: true,
        actions: true,
      },
    });
    return plainToInstance(PlannerWeekResponse, { start: startDate, end: endDate, todos });
  }

  async getWeekdayPlanner(
    user: User,
    query: WeekdayPlannerQueryDto
  ): Promise<PlannerWeekdayResponse> {
    const weekday = query.weekday;
    const weekdayIndex = this.getWeekdayIndex(weekday);
    const todos = await this.todoRepository
      .createQueryBuilder("todo")
      .where("todo.user_id = :userId", { userId: user.id })
      .andWhere("WEEKDAY(todo.date) = :weekdayIndex", { weekdayIndex })
      .leftJoinAndSelect("todo.category", "category")
      .leftJoinAndSelect("todo.plans", "plans")
      .leftJoinAndSelect("todo.actions", "actions")
      .getMany();

    console.log("🚀 ~ PlannerService ~ todos:", todos);
    return plainToInstance(PlannerWeekdayResponse, { weekday, todos });
  }

  private getWeekdayIndex(weekday: Weekday): number {
    const map: Record<Weekday, number> = {
      MONDAY: 0,
      TUESDAY: 1,
      WEDNESDAY: 2,
      THURSDAY: 3,
      FRIDAY: 4,
      SATURDAY: 5,
      SUNDAY: 6,
    };
    return map[weekday];
  }
}
