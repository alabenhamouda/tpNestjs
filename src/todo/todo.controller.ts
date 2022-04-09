import { TodoService } from './todo.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { Todo } from './Model/todo.model';
import { CreateTodoDTO } from './DTO/createTodo.dto';
import { UpdateTodoDTO } from './DTO/updateTodo.dto';
import { AllTodo } from './DTO/allTodo.dto';
import { RequestDurationInterceptor } from './interceptors/request-duration.interceptor';

@UseInterceptors(RequestDurationInterceptor)
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get()
  getTodos(): Todo[] {
    return this.todoService.getTodos();
  }
  @Get('/:id')
  getTodoById(@Param('id') id: string): AllTodo {
    return <AllTodo>this.todoService.getTodoById(id);
  }
  @Post()
  addTodo(@Body() newTodoData: CreateTodoDTO): AllTodo {
    return this.todoService.addTodo(newTodoData);
  }
  @Put('/:id')
  updateTodo(
    @Param('id') id: string,
    @Body() newTodoData: UpdateTodoDTO,
  ): Todo {
    return this.todoService.updateTodo(id, newTodoData);
  }
  @Delete('/:id')
  deleteTodo(@Param('id') id: string): boolean {
    return this.todoService.deleteTodo(id);
  }
}
