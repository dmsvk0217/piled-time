import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CrudDocs } from "src/common/docs/crud-docs.decorator";
import { MemoDocs } from "src/module/memo/decorator/swagger";
import { MemoCreateRequest, MemoResponse, MemoUpdateRequest } from "src/module/memo/dto";
import { MemoService } from "src/module/memo/memo.service";

@ApiTags("memo")
@Controller("memos")
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @CrudDocs.create(MemoDocs.create)
  @Post()
  create(@Body() request: MemoCreateRequest): Promise<MemoResponse> {
    return this.memoService.create(request);
  }

  @CrudDocs.findAll(MemoDocs.findAll)
  @Get()
  findAll(): Promise<MemoResponse[]> {
    return this.memoService.findAll();
  }

  @CrudDocs.findOne(MemoDocs.findOne)
  @Get(":id")
  findOne(@Param("id") id: number): Promise<MemoResponse> {
    return this.memoService.findOne(id);
  }

  @CrudDocs.update(MemoDocs.update)
  @Patch(":id")
  update(@Param("id") id: number, @Body() request: MemoUpdateRequest): Promise<MemoResponse> {
    return this.memoService.update(id, request);
  }

  @HttpCode(204)
  @CrudDocs.remove(MemoDocs.remove)
  @Delete(":id")
  remove(@Param("id") id: number): Promise<void> {
    return this.memoService.remove(id);
  }
}
