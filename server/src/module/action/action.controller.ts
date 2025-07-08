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
import { ActionService } from "src/module/action/action.service";
import { ActionDocs } from "src/module/action/decorator/swagger";
import {
  ActionCreateRequest,
  ActionResponse,
  ActionUpdateRequest,
} from "src/module/action/dto";
import { User } from "src/module/user/entities/user.entity";

@ApiTags("Action")
@UseGuards(JwtAuthGuard)
@Controller("actions")
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @CrudDocs.create(ActionDocs.create)
  @Post()
  create(
    @Body() request: ActionCreateRequest,
    @GetUser() user: User,
  ): Promise<ActionResponse> {
    return this.actionService.create(request, user);
  }

  @CrudDocs.findAll(ActionDocs.findAll)
  @Get()
  findAll(@GetUser() user: User): Promise<ActionResponse[]> {
    return this.actionService.findAll(user);
  }

  @CrudDocs.findOne(ActionDocs.findOne)
  @Get(":id")
  findOne(
    @Param("id") id: number,
    @GetUser() user: User,
  ): Promise<ActionResponse> {
    return this.actionService.findOne(id, user);
  }

  @CrudDocs.update(ActionDocs.update)
  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body() request: ActionUpdateRequest,
    @GetUser() user: User,
  ): Promise<ActionResponse> {
    return this.actionService.update(id, request, user);
  }

  @HttpCode(204)
  @CrudDocs.remove(ActionDocs.remove)
  @Delete(":id")
  remove(@Param("id") id: number, @GetUser() user: User): Promise<void> {
    return this.actionService.remove(id, user);
  }
}
