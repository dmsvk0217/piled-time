import { BaseEntity } from "src/common/database/entities/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Category } from "../category/category.entity";
import { Feedback } from "../feedback/feedback.entity";

@Entity()
export class User extends BaseEntity {
  @OneToMany(() => Category, (category) => category.user)
  categorys: Category[];

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedbacks: Feedback[];

  // @OneToMany(() => Memo, (memo) => memo.user)
  // memos: Memo[];

  // @OneToMany(() => TodoList, (todoList) => todoList.user)
  // todoLists: TodoList[];

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar" })
  phone: string;

  @Column({ type: "varchar" })
  password: string;
}
