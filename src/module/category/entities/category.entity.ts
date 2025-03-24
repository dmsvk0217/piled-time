import { BaseEntity } from "src/common/database/entities/base.entity";
import { Todo } from "src/module/todo/todo.entity";
import { User } from "src/module/user/user.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Category extends BaseEntity {
  @ManyToOne(() => User, (user) => user.categorys)
  user: User;

  @OneToMany(() => Todo, (todo) => todo.category)
  todos: Todo[];

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  color: string;
}
