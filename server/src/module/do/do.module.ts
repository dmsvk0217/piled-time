import { Module } from '@nestjs/common';
import { DoService } from './do.service';
import { DoController } from './do.controller';

@Module({
  controllers: [DoController],
  providers: [DoService],
})
export class DoModule {}
