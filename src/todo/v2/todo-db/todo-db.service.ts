import { UpdateTodoDTO } from './../../DTO/updateTodo.dto';
import { CreateTodoDTO } from './../../DTO/createTodo.dto';
import { TodoEntity } from './../../entity/todo.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoDbService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}
  async getTodos(): Promise<TodoEntity[]> {
    return await this.todoRepository.find();
  }
  async addTodo(todo: CreateTodoDTO): Promise<TodoEntity> {
    return await this.todoRepository.save(todo);
  }
  async updateTodo(id: string, todo: UpdateTodoDTO): Promise<TodoEntity> {
    return await this.todoRepository.save({ ...todo, id });
  }
}
