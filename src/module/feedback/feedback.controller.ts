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
import { FeedbackDocs } from "src/module/feedback/decorator/swagger";
import {
  FeedbackCreateRequest,
  FeedbackResponse,
  FeedbackUpdateRequest,
} from "src/module/feedback/dto";
import { FeedbackService } from "src/module/feedback/feedback.service";
import { User } from "src/module/user/entities/user.entity";

@ApiTags("Feedback")
@UseGuards(JwtAuthGuard)
@Controller("feedbacks")
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @CrudDocs.create(FeedbackDocs.create)
  @Post()
  create(@Body() request: FeedbackCreateRequest, @GetUser() user: User): Promise<FeedbackResponse> {
    return this.feedbackService.create(request, user);
  }

  @CrudDocs.findAll(FeedbackDocs.findAll)
  @Get()
  findAll(@GetUser() user: User): Promise<FeedbackResponse[]> {
    return this.feedbackService.findAll(user);
  }

  @CrudDocs.findOne(FeedbackDocs.findOne)
  @Get(":id")
  findOne(@Param("id") id: number, @GetUser() user: User): Promise<FeedbackResponse> {
    return this.feedbackService.findOne(id, user);
  }

  @CrudDocs.update(FeedbackDocs.update)
  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body() request: FeedbackUpdateRequest,
    @GetUser() user: User
  ): Promise<FeedbackResponse> {
    return this.feedbackService.update(id, request, user);
  }

  @HttpCode(204)
  @CrudDocs.remove(FeedbackDocs.remove)
  @Delete(":id")
  remove(@Param("id") id: number, @GetUser() user: User): Promise<void> {
    return this.feedbackService.remove(id, user);
  }
}
