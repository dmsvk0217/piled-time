import { BaseEntity } from "src/common/database/entities/base.entity";
import { Action } from "src/module/action/action.entity";
import { Category } from "src/module/category/category.entity";
import { Plan } from "src/module/plan/plan.entity";
import { User } from "src/module/user/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Todo extends BaseEntity {
  @ManyToOne(() => User, (user) => user.todolists)
  user: User;

  @ManyToOne(() => Category, (category) => category.todos)
  category: Category;

  @ManyToOne(() => Plan, (plan) => plan.todo)
  plans: Plan[];

  @ManyToOne(() => Action, (action) => action.todo)
  actions: Action[];

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  date: string;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "varchar" })
  content: string;
}
