import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { addDays, format } from "date-fns";
import { getDayRange, getWeekRange } from "src/common/utils/date.utils";
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
      todos,
    });
  }

  async getWeeklyPlannerData(user: User, query: WeeklyPlannerQueryDto) {
    const { start, end } = getWeekRange(query.date);

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

    const weeklyMap: Record<string, any[]> = {};
    for (let i = 0; i < 7; i++) {
      const day = format(addDays(start, i), "yyyy-MM-dd");
      weeklyMap[day] = [];
    }

    for (const todo of todos) {
      const dayKey = format(new Date(todo.date), "yyyy-MM-dd");
      if (weeklyMap[dayKey]) {
        weeklyMap[dayKey].push(todo);
      }
    }

    const result = Object.entries(weeklyMap).map(([date, todos]) => ({
      date,
      todos,
    }));

    return plainToInstance(PlannerWeekResponse, result);
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
}
