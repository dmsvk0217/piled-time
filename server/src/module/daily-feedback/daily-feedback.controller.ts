import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DailyFeedbackService } from './daily-feedback.service';
import { CreateDailyFeedbackDto } from './dto/create-daily-feedback.dto';
import { UpdateDailyFeedbackDto } from './dto/update-daily-feedback.dto';

@Controller('daily-feedback')
export class DailyFeedbackController {
  constructor(private readonly dailyFeedbackService: DailyFeedbackService) {}

  @Post()
  create(@Body() createDailyFeedbackDto: CreateDailyFeedbackDto) {
    return this.dailyFeedbackService.create(createDailyFeedbackDto);
  }

  @Get()
  findAll() {
    return this.dailyFeedbackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dailyFeedbackService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDailyFeedbackDto: UpdateDailyFeedbackDto) {
    return this.dailyFeedbackService.update(+id, updateDailyFeedbackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyFeedbackService.remove(+id);
  }
}
