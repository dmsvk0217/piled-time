import { BaseEntity } from 'src/common/database/entities/base.entity';
import { User } from 'src/module/user/entities/user.entity';
import { Column, ManyToOne } from 'typeorm';

export class DailyFeedback extends BaseEntity {
  @ManyToOne(() => User, (user) => user.dailyFeedbacks)
  user: User;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ type: 'varchar' })
  goodPoint: string;

  @Column({ type: 'varchar' })
  badPoint: string;

  @Column({ type: 'varchar' })
  feedback: string;
}
