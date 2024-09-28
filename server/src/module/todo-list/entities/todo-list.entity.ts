import { BaseEntity } from 'src/common/database/entities/base.entity';
import { Category } from 'src/module/category/entities/category.entity';
import { Do } from 'src/module/do/entities/do.entity';
import { Plan } from 'src/module/plan/entities/plan.entity';
import { User } from 'src/module/user/entities/user.entity';
import { Column, ManyToOne, OneToOne } from 'typeorm';

export class TodoList extends BaseEntity {
  @ManyToOne(() => User, (user) => user.categorys)
  user: User;

  @ManyToOne(() => Category, (category) => category.todoLists)
  category: Category;

  @OneToOne(() => Plan, (plan) => plan.todolist, {
    nullable: true,
  })
  plan: Plan | null;

  @OneToOne(() => Do, (entity) => entity.todolist, {
    nullable: true,
  })
  do: Do | null;

  @Column({ type: 'varchar' })
  contents: string;

  @Column({ type: 'int' })
  estimatedTime: number;

  @Column({ type: 'int' })
  achievementRate: number;
}
