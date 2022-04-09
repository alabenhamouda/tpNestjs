import { SearchTodoDto } from './../../DTO/search-todo.dto';
import { TodoStatusEnum } from './../../enums/todo-status.enum';
import { UpdateTodoDTO } from './../../DTO/updateTodo.dto';
import { TodoEntity } from './../../entity/todo.entity';
import { CreateTodoDTO } from './../../DTO/createTodo.dto';
import { AllTodo } from './../../DTO/allTodo.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TodoDbService } from './todo-db.service';
import { TodoController } from 'src/todo/interfaces/todo-controller.interface';
import { CountByStatusQueryParamsDTO } from 'src/todo/DTO/count-by-status-param.dto';

@Controller({
  path: 'todos',
  version: '2',
})
export class TodoDbController implements TodoController {
  constructor(private todoDbService: TodoDbService) {}
  @Get('')
  getTodos(@Query() queryParams: SearchTodoDto): Promise<TodoEntity[]> {
    return this.todoDbService.getTodos(queryParams);
  }

  @Get('count')
  async getCountByStatus(
    @Query() queryParams: CountByStatusQueryParamsDTO,
  ): Promise<number | Object> {
    if (queryParams.status === undefined) {
      const res = {};
      for (const todoStatus in TodoStatusEnum) {
        if (isNaN(Number(todoStatus))) {
          res[todoStatus] = await this.todoDbService.getCountByStatus(
            TodoStatusEnum[todoStatus],
          );
        }
      }
      return res;
    }
    return this.todoDbService.getCountByStatus(queryParams.status);
  }

  @Get('/:id')
  getTodoById(@Param('id') id: string) {
    return this.todoDbService.getTodoById(id);
  }

  @Post()
  addTodo(@Body() todo: CreateTodoDTO): Promise<TodoEntity> {
    return this.todoDbService.addTodo(todo);
  }

  @Put(':id')
  updateTodo(@Param('id') id: string, @Body() todo: UpdateTodoDTO) {
    return this.todoDbService.updateTodo(id, todo);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todoDbService.deleteTodo(id);
  }

  @Delete(':id/soft')
  softDeleteTodo(@Param('id') id: string) {
    return this.todoDbService.softDeleteTodo(id);
  }

  @Delete(':id/restore')
  restoreTodo(@Param('id') id: string) {
    return this.todoDbService.restoreTodo(id);
  }
}
