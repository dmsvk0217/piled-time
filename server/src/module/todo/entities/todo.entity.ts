import { BaseEntity } from "src/common/database/entities/base.entity";
import { Action } from "src/module/action/entities/action.entity";
import { Category } from "src/module/category/entities/category.entity";
import { Plan } from "src/module/plan/entities/plan.entity";
import { User } from "src/module/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class Todo extends BaseEntity {
  @ManyToOne(() => User, (user) => user.todolists)
  user: User;

  @ManyToOne(() => Category, (category) => category.todos)
  category: Category;

  @OneToOne(() => Plan, (plan) => plan.todo)
  @JoinColumn()
  plan: Plan;

  @OneToOne(() => Action, (action) => action.todo)
  @JoinColumn()
  action: Action;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @Column({ type: "varchar" })
  content: string;

  @Column({ type: "int", default: 0 })
  percent?: number;
}
