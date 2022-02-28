import { Todo } from './Model/todo.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTodoDTO } from './DTO/createTodo.dto';
import { UpdateTodoDTO } from './DTO/updateTodo.dto';
import { AllTodo } from './DTO/allTodo.dto';

@Injectable()
export class TodoService {
  static todos: AllTodo[] = [new Todo('1', 'Sport', 'Faire du sport')];

  getTodos(): AllTodo[] {
    return TodoService.todos;
  }

  addTodo(newTodoData: CreateTodoDTO): AllTodo {
    let todo = new Todo();
    // const { name, description} = newTodoData;
    todo.id = uuidv4();
    todo = { ...todo, ...newTodoData };
    TodoService.todos.push(todo);
    return todo;
  }

  getTodoById(id: string): AllTodo | NotFoundException {
    const todo = TodoService.todos.find((todo) => todo.id === id);
    if (!todo) {
      return new NotFoundException('Todo not found');
    }
    return todo;
  }

  updateTodo(id: string, newTodoData: UpdateTodoDTO): AllTodo {
    const todo = <AllTodo>this.getTodoById(id);
    todo.name = newTodoData.name ?? todo.name;
    todo.name = newTodoData.description ?? todo.description;
    todo.name = newTodoData.status ?? todo.status;
    return todo;
  }

  deleteTodo(id: string): boolean {
    const todoIndex = TodoService.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      return false;
    }
    TodoService.todos.splice(todoIndex, 1);
    return true;
  }
}
