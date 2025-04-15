import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetUser } from "src/common/decorators/user.decorator";
import { PlannerResponse } from "src/module/planner/dto";
import { PlannerService } from "src/module/planner/planner.service";
import { User } from "src/module/user/entities/user.entity";

@ApiTags("Planner")
@UseGuards(JwtAuthGuard)
@Controller("planner")
export class PlannerController {
  constructor(private readonly plannerService: PlannerService) {}

  @Get("daily")
  async getDailyPlanner(
    @GetUser() user: User,
    @Query("date") date: string
  ): Promise<PlannerResponse> {
    console.log("🚀 ~ PlannerController ~ date:", date);
    return this.plannerService.getDailyPlanner(user, new Date(date));
  }
}
