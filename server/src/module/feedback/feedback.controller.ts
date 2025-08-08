import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetUser } from "src/common/decorators/user.decorator";
import { CrudDocs } from "src/common/docs/crud-docs.decorator";
import { FeedbackDocs, FeedbackDocsOptions } from "src/module/feedback/decorator/swagger";
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

  @CrudDocs.create(FeedbackDocsOptions.create)
  @Post()
  create(@Body() request: FeedbackCreateRequest, @GetUser() user: User): Promise<FeedbackResponse> {
    return this.feedbackService.create(request, user);
  }

  @CrudDocs.findAll(FeedbackDocsOptions.findAll)
  @Get()
  findAll(
    @GetUser() user: User,
    @Query("type") type?: string,
    @Query("date") date?: string
  ): Promise<FeedbackResponse[]> {
    return this.feedbackService.findAll(user, type, date);
  }

  @FeedbackDocs.getDaily()
  @Get("daily")
  getDaily(@GetUser() user: User, @Query("date") date: string): Promise<FeedbackResponse> {
    return this.feedbackService.findDailyByDate(user, date);
  }

  @FeedbackDocs.getWeekly()
  @Get("weekly")
  getWeekly(@GetUser() user: User, @Query("date") date: string): Promise<FeedbackResponse> {
    return this.feedbackService.findWeeklyByDate(user, date);
  }

  @FeedbackDocs.getWeekly()
  @Get("monthly")
  getMonthly(@GetUser() user: User, @Query("date") date: string): Promise<FeedbackResponse> {
    return this.feedbackService.findMonthlyByDate(user, date);
  }

  @FeedbackDocs.getDailyOfWeek()
  @Get("daily/weekly")
  getDailyFeedbacksOfWeek(
    @GetUser() user: User,
    @Query("date") date: string
  ): Promise<FeedbackResponse[]> {
    return this.feedbackService.findDailyFeedbacksInWeek(user, date);
  }

  @CrudDocs.findOne(FeedbackDocsOptions.findOne)
  @Get(":id")
  findOne(@Param("id") id: number, @GetUser() user: User): Promise<FeedbackResponse> {
    return this.feedbackService.findOne(id, user);
  }

  @CrudDocs.update(FeedbackDocsOptions.update)
  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body() request: FeedbackUpdateRequest,
    @GetUser() user: User
  ): Promise<FeedbackResponse> {
    return this.feedbackService.update(id, request, user);
  }

  @HttpCode(204)
  @CrudDocs.remove(FeedbackDocsOptions.remove)
  @Delete(":id")
  remove(@Param("id") id: number, @GetUser() user: User): Promise<void> {
    return this.feedbackService.remove(id, user);
  }
}
