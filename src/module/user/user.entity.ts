import { BaseEntity } from "src/common/database/entities/base.entity";
import { Column } from "typeorm";

export class User extends BaseEntity {
  // @OneToMany(() => Category, (category) => category.user)
  // categorys: Category[];

  // @OneToMany(() => Memo, (memo) => memo.user)
  // memos: Memo[];

  // @OneToMany(() => TodoList, (todoList) => todoList.user)
  // todoLists: TodoList[];

  // @OneToMany(() => DailyFeedback, (dailyFeedback) => dailyFeedback.user)
  // dailyFeedbacks: DailyFeedback[];

  // @OneToMany(() => WeeklyFeedback, (weeklyFeedback) => weeklyFeedback.user)
  // weeklyFeedbacks: WeeklyFeedback[];

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar" })
  phone: string;

  @Column({ type: "varchar" })
  password: string;
}
