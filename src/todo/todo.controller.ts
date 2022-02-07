import { TodoStatusEnum } from './enums/todo-status.enum';
import { Todo } from './Model/todo.model';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Controller('todo')
export class TodoController {
  todos: Todo[] = [
    new Todo(
      '0',
      'Todo 1',
      'Description 1',
      new Date(),
      TodoStatusEnum.waiting,
    ),
    new Todo(
      '1',
      'Todo 2',
      'Description 2',
      new Date(),
      TodoStatusEnum.waiting,
    ),
  ];
  @Get()
  getTodos() {
    return this.todos;
  }
  @Post()
  addTodo(@Body() todo: any) {
    let newTodo = new Todo(uuid());
    newTodo = { ...newTodo, ...todo };
    this.todos.push(newTodo);
    return newTodo;
  }
}
