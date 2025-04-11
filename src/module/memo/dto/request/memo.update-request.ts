import { PartialType } from "@nestjs/swagger";
import { MemoCreateRequest } from "src/module/memo/dto";

export class MemoUpdateRequest extends PartialType(MemoCreateRequest) {}
