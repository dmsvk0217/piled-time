import { BaseEntity } from 'src/common/database/entities/base.entity';
import { User } from 'src/module/user/entities/user.entity';
import { Column, ManyToOne } from 'typeorm';

export class Memo extends BaseEntity {
  @ManyToOne(() => User, (user) => user.memos)
  user: User;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ type: 'varchar' })
  memo: Date;
}
