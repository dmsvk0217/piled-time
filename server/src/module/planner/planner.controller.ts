import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetUser } from "src/common/decorators/user.decorator";
import { PlannerDocs } from "src/module/planner/decorator/swagger/planner.docs";
import {
  PlannerQueryDto,
  PlannerResponse,
  PlannerWeekdayResponse,
  WeekdayPlannerQueryDto,
} from "src/module/planner/dto";
import { PlannerService } from "src/module/planner/planner.service";
import { User } from "src/module/user/entities/user.entity";

@ApiTags("Planner")
@Controller("planner")
@UseGuards(JwtAuthGuard)
export class PlannerController {
  constructor(private readonly plannerService: PlannerService) {}

  @Get("daily")
  @PlannerDocs.getDaily()
  getDailyPlanner(
    @GetUser() user: User,
    @Query() query: PlannerQueryDto
  ): Promise<PlannerResponse> {
    return this.plannerService.getDailyPlanner(user, query);
  }

  @Get("weekly")
  @PlannerDocs.getWeekly()
  getWeeklyPlanner(
    @GetUser() user: User,
    @Query() query: PlannerQueryDto
  ): Promise<PlannerResponse[]> {
    return this.plannerService.getWeeklyPlannerData(user, query);
  }

  @Get("monthly")
  @PlannerDocs.getMonthly()
  getMonthlyPlanner(
    @GetUser() user: User,
    @Query() query: PlannerQueryDto
  ): Promise<PlannerResponse[]> {
    return this.plannerService.getMonthlyPlannerData(user, query);
  }

  @Get("weekday")
  @PlannerDocs.getWeekday()
  getWeekdayPlanner(
    @GetUser() user: User,
    @Query() query: WeekdayPlannerQueryDto
  ): Promise<PlannerWeekdayResponse> {
    return this.plannerService.getWeekdayPlanner(user, query);
  }
}
