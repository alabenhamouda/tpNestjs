import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Todo } from './Model/todo.model';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
@Controller('todo')
export class TodoController {
  constructor() {
    this.todos = [new Todo('1', 'Sport', 'Faire du sport')];
  }
  todos: Todo[] = [];
  @Get()
  getTodos(@Req() request: Request): Todo[] {
    // console.log(request);
    return this.todos;
  }
  @Post()
  addTodo(@Body() newTodoData: Todo): Todo {
    let todo = new Todo();
    // const { name, description} = newTodoData;
    todo.id = uuidv4();
    todo = { ...todo, ...newTodoData };
    this.todos.push(todo);
    return todo;
  }
}
