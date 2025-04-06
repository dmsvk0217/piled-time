import { PartialType } from "@nestjs/swagger";
import { FeedbackCreateRequest } from "src/module/feedback/dto";

export class FeedbackUpdateRequest extends PartialType(FeedbackCreateRequest) {}
