import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MemoService } from './memo.service';
import { CreateMemoDto } from './dto/create-memo.dto';
import { UpdateMemoDto } from './dto/update-memo.dto';

@Controller('memo')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @Post()
  create(@Body() createMemoDto: CreateMemoDto) {
    return this.memoService.create(createMemoDto);
  }

  @Get()
  findAll() {
    return this.memoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemoDto: UpdateMemoDto) {
    return this.memoService.update(+id, updateMemoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memoService.remove(+id);
  }
}
