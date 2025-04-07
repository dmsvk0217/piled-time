import { BaseEntity } from "src/common/database/entities/base.entity";
import { FeedbackType } from "src/module/feedback/enum/feedback.enum";
import { User } from "src/module/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Feedback extends BaseEntity {
  @ManyToOne(() => User, (user) => user.feedbacks)
  user: User;

  @Column({ type: "enum", enum: FeedbackType })
  type: FeedbackType;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @Column({ type: "varchar", nullable: true })
  goodPoint: string;

  @Column({ type: "varchar", nullable: true })
  badPoint: string;

  @Column({ type: "varchar", nullable: true })
  comment: string;
}
