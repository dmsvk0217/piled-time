import { BaseEntity } from 'src/common/database/entities/base.entity';
import { TodoList } from 'src/module/todo-list/entities/todo-list.entity';
import { Column, JoinColumn, OneToOne } from 'typeorm';

export class Do extends BaseEntity {
  @OneToOne(() => TodoList, (todolist) => todolist.do)
  @JoinColumn()
  todolist: TodoList;

  @Column({ type: 'datetime' })
  startAt: Date;

  @Column({ type: 'datetime' })
  endAt: Date;
}
