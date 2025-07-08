import { OmitType, PartialType } from "@nestjs/swagger";
import { PlanCreateRequest } from "src/module/plan/dto/request/plan.create-request";

export class PlanUpdateRequest extends PartialType(
  OmitType(PlanCreateRequest, ["todoId"] as const),
) {}
