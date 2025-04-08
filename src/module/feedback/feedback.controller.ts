import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CrudDocs } from "src/common/docs/crud-docs.decorator";
import { FeedbackDocs } from "src/module/feedback/decorator/swagger";
import {
  FeedbackCreateRequest,
  FeedbackResponse,
  FeedbackUpdateRequest,
} from "src/module/feedback/dto";
import { FeedbackService } from "src/module/feedback/feedback.service";

@ApiTags("feedback")
@Controller("feedbacks")
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @CrudDocs.create(FeedbackDocs.create)
  @Post()
  create(@Body() request: FeedbackCreateRequest): Promise<FeedbackResponse> {
    return this.feedbackService.create(request);
  }

  @CrudDocs.findAll(FeedbackDocs.findAll)
  @Get()
  findAll(): Promise<FeedbackResponse[]> {
    return this.feedbackService.findAll();
  }

  @CrudDocs.findOne(FeedbackDocs.findOne)
  @Get(":id")
  findOne(@Param("id") id: number): Promise<FeedbackResponse> {
    return this.feedbackService.findOne(id);
  }

  @CrudDocs.update(FeedbackDocs.update)
  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body() request: FeedbackUpdateRequest
  ): Promise<FeedbackResponse> {
    return this.feedbackService.update(id, request);
  }

  @HttpCode(204)
  @CrudDocs.remove(FeedbackDocs.remove)
  @Delete(":id")
  remove(@Param("id") id: number): Promise<void> {
    return this.feedbackService.remove(id);
  }
}
