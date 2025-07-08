import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetUser } from "src/common/decorators/user.decorator";
import { CrudDocs } from "src/common/docs/crud-docs.decorator";
import { PlanDocs } from "src/module/plan/decorator/swagger";
import {
  PlanCreateRequest,
  PlanResponse,
  PlanUpdateRequest,
} from "src/module/plan/dto";
import { PlanService } from "src/module/plan/plan.service";
import { User } from "src/module/user/entities/user.entity";

@ApiTags("Plan")
@UseGuards(JwtAuthGuard)
@Controller("plans")
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @CrudDocs.create(PlanDocs.create)
  @Post()
  create(
    @Body() request: PlanCreateRequest,
    @GetUser() user: User,
  ): Promise<PlanResponse> {
    return this.planService.create(request, user);
  }

  @CrudDocs.findAll(PlanDocs.findAll)
  @Get()
  findAll(@GetUser() user: User): Promise<PlanResponse[]> {
    return this.planService.findAll(user);
  }

  @CrudDocs.findOne(PlanDocs.findOne)
  @Get(":id")
  findOne(
    @Param("id") id: number,
    @GetUser() user: User,
  ): Promise<PlanResponse> {
    return this.planService.findOne(id, user);
  }

  @CrudDocs.update(PlanDocs.update)
  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body() request: PlanUpdateRequest,
    @GetUser() user: User,
  ): Promise<PlanResponse> {
    return this.planService.update(id, request, user);
  }

  @HttpCode(204)
  @CrudDocs.remove(PlanDocs.remove)
  @Delete(":id")
  remove(@Param("id") id: number, @GetUser() user: User): Promise<void> {
    return this.planService.remove(id, user);
  }
}
