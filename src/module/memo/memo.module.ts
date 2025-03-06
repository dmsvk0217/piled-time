import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Memo } from "src/module/memo/memo.entity";

@Module({ imports: [TypeOrmModule.forFeature([Memo])] })
export class MemoModule {}
