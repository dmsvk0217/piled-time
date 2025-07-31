import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { Memo } from "src/module/memo/entities/memo.entity";
import { MemoController } from "src/module/memo/memo.controller";
import { MemoService } from "src/module/memo/memo.service";

@Module({
  imports: [TypeOrmModule.forFeature([Memo]), AuthModule],
  controllers: [MemoController],
  providers: [MemoService],
})
export class MemoModule {}
