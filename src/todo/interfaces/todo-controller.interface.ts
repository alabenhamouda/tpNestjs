import { SearchTodoDto } from './../DTO/search-todo.dto';
import { CreateTodoDTO } from '../DTO/createTodo.dto';
import { UpdateTodoDTO } from '../DTO/updateTodo.dto';

export interface TodoController {
  getTodos(queryParams: SearchTodoDto);
  getTodoById(id: string);
  addTodo(newTodoData: CreateTodoDTO);
  updateTodo(id: string, newTodoData: UpdateTodoDTO);
  deleteTodo(id: string);
  softDeleteTodo(id: string);
  restoreTodo(id: string);
}
