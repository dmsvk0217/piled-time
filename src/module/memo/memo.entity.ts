import { BaseEntity } from "src/common/database/entities/base.entity";
import { User } from "src/module/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Memo extends BaseEntity {
  @ManyToOne(() => User, (user) => user.memos)
  user: User;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @Column({ type: "varchar" })
  content: string;
}
