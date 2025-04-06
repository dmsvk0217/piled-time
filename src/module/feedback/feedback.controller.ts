import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  FeedbackCreateRequest,
  FeedbackResponse,
  FeedbackUpdateRequest,
} from "src/module/feedback/dto";
import { FeedbackService } from "src/module/feedback/feedback.service";
import { CreateDocs, FindAllDocs, FindOneDocs, RemoveDocs, UpdateDocs } from "./decorator/swagger";

@ApiTags("feedback")
@Controller("feedbacks")
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @CreateDocs()
  @Post()
  create(@Body() request: FeedbackCreateRequest): Promise<FeedbackResponse> {
    return this.feedbackService.create(request);
  }

  @FindAllDocs()
  @Get()
  findAll(): Promise<FeedbackResponse[]> {
    return this.feedbackService.findAll();
  }

  @FindOneDocs()
  @Get(":id")
  findOne(@Param("id") id: number): Promise<FeedbackResponse> {
    return this.feedbackService.findOne(id);
  }

  @UpdateDocs()
  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body() request: FeedbackUpdateRequest
  ): Promise<FeedbackResponse> {
    return this.feedbackService.update(id, request);
  }

  @HttpCode(204)
  @RemoveDocs()
  @Delete(":id")
  remove(@Param("id") id: number): Promise<void> {
    return this.feedbackService.remove(id);
  }
}
