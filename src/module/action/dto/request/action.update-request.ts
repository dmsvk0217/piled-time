import { OmitType, PartialType } from "@nestjs/swagger";
import { ActionCreateRequest } from "src/module/action/dto/request/action.create-request";

export class ActionUpdateRequest extends PartialType(
  OmitType(ActionCreateRequest, ["todoId"] as const)
) {}
