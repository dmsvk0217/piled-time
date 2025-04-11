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
import { MemoDocs } from "src/module/memo/decorator/swagger";
import { MemoCreateRequest, MemoResponse, MemoUpdateRequest } from "src/module/memo/dto";
import { MemoService } from "src/module/memo/memo.service";
import { User } from "src/module/user/entities/user.entity";

@ApiTags("memo")
@UseGuards(JwtAuthGuard)
@Controller("memos")
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @CrudDocs.create(MemoDocs.create)
  @Post()
  create(@Body() request: MemoCreateRequest, @GetUser() user: User): Promise<MemoResponse> {
    return this.memoService.create(request, user);
  }

  @CrudDocs.findAll(MemoDocs.findAll)
  @Get()
  findAll(@GetUser() user: User): Promise<MemoResponse[]> {
    return this.memoService.findAll(user);
  }

  @CrudDocs.findOne(MemoDocs.findOne)
  @Get(":id")
  findOne(@Param("id") id: number, @GetUser() user: User): Promise<MemoResponse> {
    return this.memoService.findOne(id, user);
  }

  @CrudDocs.update(MemoDocs.update)
  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body() request: MemoUpdateRequest,
    @GetUser() user: User
  ): Promise<MemoResponse> {
    return this.memoService.update(id, request, user);
  }

  @HttpCode(204)
  @CrudDocs.remove(MemoDocs.remove)
  @Delete(":id")
  remove(@Param("id") id: number, @GetUser() user: User): Promise<void> {
    return this.memoService.remove(id, user);
  }
}
