import { BaseEntity } from "src/common/database/entities/base.entity";
import { Todo } from "src/module/todo/entities/todo.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Plan extends BaseEntity {
  @ManyToOne(() => Todo, (todo) => todo.plans)
  todo: Todo;

  @Column({ type: "datetime" })
  startAt: string;

  @Column({ type: "integer" })
  duration: number;
}
