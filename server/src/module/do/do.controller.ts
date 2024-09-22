import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoService } from './do.service';
import { CreateDoDto } from './dto/create-do.dto';
import { UpdateDoDto } from './dto/update-do.dto';

@Controller('do')
export class DoController {
  constructor(private readonly doService: DoService) {}

  @Post()
  create(@Body() createDoDto: CreateDoDto) {
    return this.doService.create(createDoDto);
  }

  @Get()
  findAll() {
    return this.doService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoDto: UpdateDoDto) {
    return this.doService.update(+id, updateDoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doService.remove(+id);
  }
}
