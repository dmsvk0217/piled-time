import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { addDays, format } from "date-fns";
import { getDayRange, getMonthRange, getWeekRange } from "src/common/utils/date.utils";
import {
  PlannerQueryDto,
  PlannerResponse,
  PlannerWeekdayResponse,
  WeekdayPlannerQueryDto,
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
  async getDailyPlanner(user: User, query: PlannerQueryDto): Promise<PlannerResponse> {
    const { start, end } = getDayRange(query.date);

    const todos = await this.todoRepository.find({
      where: {
        user: { id: user.id },
        date: Between(start, end),
      },
      relations: {
        category: true,
        plan: true,
        action: true,
      },
    });

    return plainToInstance(PlannerResponse, {
      date: start,
      todos,
    });
  }

  async getWeeklyPlannerData(user: User, query: PlannerQueryDto): Promise<PlannerResponse[]> {
    const { start, end } = getWeekRange(query.date);

    const todos = await this.findTodosInRange(user.id, start, end);

    const results = this.buildPlannerArray(start, 7, todos);
    return results.map((result) => plainToInstance(PlannerResponse, result));
  }

  async getMonthlyPlannerData(user: User, query: PlannerQueryDto): Promise<PlannerResponse[]> {
    const { start, end } = getMonthRange(query.date);
    const monthDays = end.getDate();

    const todos = await this.findTodosInRange(user.id, start, end);

    const results = this.buildPlannerArray(start, monthDays, todos);
    return results.map((result) => plainToInstance(PlannerResponse, result));
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
      .leftJoinAndSelect("todo.plan", "plan")
      .leftJoinAndSelect("todo.action", "action")
      .getMany();

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

  private async findTodosInRange(userId: number, start: Date, end: Date) {
    return this.todoRepository.find({
      where: {
        user: { id: userId },
        date: Between(start, end),
      },
      relations: {
        category: true,
        plan: true,
        action: true,
      },
    });
  }

  private buildPlannerArray(
    start: Date,
    days: number,
    todos: Todo[]
  ): { date: string; todos: Todo[] }[] {
    const dateMap: Record<string, any[]> = {};
    for (let i = 0; i < days; i++) {
      const day = format(addDays(start, i), "yyyy-MM-dd");
      dateMap[day] = [];
    }

    for (const todo of todos) {
      const dayKey = format(new Date(todo.date), "yyyy-MM-dd");
      if (dateMap[dayKey]) {
        dateMap[dayKey].push(todo);
      }
    }

    return Object.entries(dateMap).map(([date, todos]) => ({
      date,
      todos,
    }));
  }
}
