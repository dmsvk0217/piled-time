import { BaseEntity } from "src/common/database/entities/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Category extends BaseEntity {
  @ManyToOne(() => User, (user) => user.categorys)
  user: User;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  color: string;
}
