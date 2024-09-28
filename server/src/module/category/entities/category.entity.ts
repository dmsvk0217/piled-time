import { BaseEntity } from 'src/common/database/entities/base.entity';
import { TodoList } from 'src/module/todo-list/entities/todo-list.entity';
import { User } from 'src/module/user/entities/user.entity';
import { Column, ManyToOne } from 'typeorm';

export class Category extends BaseEntity {
  @ManyToOne(() => User, (user) => user.categorys)
  user: User;

  @ManyToOne(() => TodoList, (todoList) => todoList.category)
  todoLists: TodoList[];

  @Column({ type: 'varchar' })
  name: string;

  @Column({
    type: 'varchar',
    length: 7,
  })
  color: string;
}
