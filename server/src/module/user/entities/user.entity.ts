import { BaseEntity } from "src/common/database/entities/base.entity";
import { Category } from "src/module/category/entities/category.entity";
import { Feedback } from "src/module/feedback/entities/feedback.entity";
import { Memo } from "src/module/memo/entities/memo.entity";
import { Todo } from "src/module/todo/entities/todo.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedbacks: Feedback[];

  @OneToMany(() => Memo, (memo) => memo.user)
  memos: Memo[];

  @OneToMany(() => Todo, (todolist) => todolist.user)
  todolists: Todo[];

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar" })
  provider: string; // 'google'

  @Column({ type: "varchar", nullable: true })
  phone?: string;

  @Column({ type: "varchar", nullable: true })
  password?: string;
}
