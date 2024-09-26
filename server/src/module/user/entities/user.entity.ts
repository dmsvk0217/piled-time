import { Category } from 'src/module/category/entities/category.entity';
import { DailyFeedback } from 'src/module/daily-feedback/entities/daily-feedback.entity';
import { Memo } from 'src/module/memo/entities/memo.entity';
import { TodoList } from 'src/module/todo-list/entities/todo-list.entity';
import { WeeklyFeedback } from 'src/module/weekly-feedback/entities/weekly-feedback.entity';
import { BaseEntity, Column, OneToMany } from 'typeorm';

export class User extends BaseEntity {
  @OneToMany(() => Category, (category) => category.user)
  categorys: Category[];

  @OneToMany(() => Memo, (memo) => memo.user)
  memos: Memo[];

  @OneToMany(() => TodoList, (todoList) => todoList.user)
  todoLists: TodoList[];

  @OneToMany(() => DailyFeedback, (dailyFeedback) => dailyFeedback.user)
  dailyFeedbacks: DailyFeedback[];

  @OneToMany(() => WeeklyFeedback, (weeklyFeedback) => weeklyFeedback.user)
  weeklyFeedbacks: WeeklyFeedback[];

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  password: string;
}
