import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeeklyFeedbackService } from './weekly-feedback.service';
import { CreateWeeklyFeedbackDto } from './dto/create-weekly-feedback.dto';
import { UpdateWeeklyFeedbackDto } from './dto/update-weekly-feedback.dto';

@Controller('weekly-feedback')
export class WeeklyFeedbackController {
  constructor(private readonly weeklyFeedbackService: WeeklyFeedbackService) {}

  @Post()
  create(@Body() createWeeklyFeedbackDto: CreateWeeklyFeedbackDto) {
    return this.weeklyFeedbackService.create(createWeeklyFeedbackDto);
  }

  @Get()
  findAll() {
    return this.weeklyFeedbackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weeklyFeedbackService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeeklyFeedbackDto: UpdateWeeklyFeedbackDto) {
    return this.weeklyFeedbackService.update(+id, updateWeeklyFeedbackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weeklyFeedbackService.remove(+id);
  }
}
