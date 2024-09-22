import { Module } from '@nestjs/common';
import { MemoService } from './memo.service';
import { MemoController } from './memo.controller';

@Module({
  controllers: [MemoController],
  providers: [MemoService],
})
export class MemoModule {}
