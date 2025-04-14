import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@ApiTags("Planner")
@UseGuards(JwtAuthGuard)
@Controller("planner")
export class PlannerController {
  constructor() {}
}
