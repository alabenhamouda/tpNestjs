import { UpdateTodoDTO } from './../../DTO/updateTodo.dto';
import { TodoEntity } from './../../entity/todo.entity';
import { CreateTodoDTO } from './../../DTO/createTodo.dto';
import { AllTodo } from './../../DTO/allTodo.dto';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TodoDbService } from './todo-db.service';

@Controller({
  path: 'todos',
  version: '2',
})
export class TodoDbController {
  constructor(private todoDbService: TodoDbService) {}
  @Get('')
  async getTodos(): Promise<TodoEntity[]> {
    return await this.todoDbService.getTodos();
  }

  @Post()
  async addTodo(@Body() todo: CreateTodoDTO): Promise<TodoEntity> {
    return await this.todoDbService.addTodo(todo);
  }

  @Put(':id')
  async updateTodo(@Param('id') id: string, @Body() todo: UpdateTodoDTO) {
    return await this.todoDbService.updateTodo(id, todo);
  }
}
