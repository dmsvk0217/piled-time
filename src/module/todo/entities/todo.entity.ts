import { BaseEntity } from "src/common/database/entities/base.entity";
import { Action } from "src/module/action/action.entity";
import { Category } from "src/module/category/entities/category.entity";
import { Plan } from "src/module/plan/plan.entity";
import { User } from "src/module/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Todo extends BaseEntity {
  @ManyToOne(() => User, (user) => user.todolists)
  user: User;

  @ManyToOne(() => Category, (category) => category.todos)
  category: Category;

  @OneToMany(() => Plan, (plan) => plan.todo)
  plans: Plan[];

  @OneToMany(() => Action, (action) => action.todo)
  actions: Action[];

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @Column({ type: "varchar" })
  content: string;
}
