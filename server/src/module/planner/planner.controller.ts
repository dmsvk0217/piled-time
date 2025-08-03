import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetUser } from "src/common/decorators/user.decorator";
import {
  DailyPlannerQueryDto,
  PlannerResponse,
  PlannerWeekdayResponse,
  PlannerWeekResponse,
  WeekdayPlannerQueryDto,
  WeeklyPlannerQueryDto,
} from "src/module/planner/dto";
import { PlannerService } from "src/module/planner/planner.service";
import { User } from "src/module/user/entities/user.entity";

@ApiTags("Planner")
@Controller("planner")
@UseGuards(JwtAuthGuard)
export class PlannerController {
  constructor(private readonly plannerService: PlannerService) {}

  @Get("daily")
  @ApiOperation({ summary: "일간 플래너 조회" })
  getDailyPlanner(
    @GetUser() user: User,
    @Query() query: DailyPlannerQueryDto
  ): Promise<PlannerResponse> {
    return this.plannerService.getDailyPlanner(user, query);
  }

  @Get("weekly")
  @ApiOperation({ summary: "주간 플래너 조회" })
  getWeeklyPlanner(
    @GetUser() user: User,
    @Query() query: WeeklyPlannerQueryDto
  ): Promise<PlannerWeekResponse[]> {
    return this.plannerService.getWeeklyPlannerData(user, query);
  }

  @Get("weekday")
  @ApiOperation({ summary: "요일별 플래너 조회" })
  getWeekdayPlanner(
    @GetUser() user: User,
    @Query() query: WeekdayPlannerQueryDto
  ): Promise<PlannerWeekdayResponse> {
    return this.plannerService.getWeekdayPlanner(user, query);
  }
}
