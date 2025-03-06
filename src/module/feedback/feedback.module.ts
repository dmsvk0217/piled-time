import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Feedback } from "./feedback.entity";

@Module({ imports: [TypeOrmModule.forFeature([Feedback])] })
export class FeedbackModule {}
