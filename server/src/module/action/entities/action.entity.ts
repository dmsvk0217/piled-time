import { BaseEntity } from "src/common/database/entities/base.entity";
import { Todo } from "src/module/todo/entities/todo.entity";
import { Column, Entity, OneToOne } from "typeorm";

@Entity()
export class Action extends BaseEntity {
  @OneToOne(() => Todo, (todo) => todo.action)
  todo: Todo;

  @Column({ type: "datetime" })
  startAt: Date;

  @Column({ type: "integer" })
  duration: number;
}
