import { SearchTodoDto } from './../../DTO/search-todo.dto';
import { UpdateTodoDTO } from './../../DTO/updateTodo.dto';
import { CreateTodoDTO } from './../../DTO/createTodo.dto';
import { TodoEntity } from './../../entity/todo.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { TodoService } from 'src/todo/interfaces/todo-service.interface';
import { TodoStatusEnum } from 'src/todo/enums/todo-status.enum';

@Injectable()
export class TodoDbService implements TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}
  getTodos(queryParams: SearchTodoDto): Promise<TodoEntity[]> {
    const options = [];
    if (queryParams.status) {
      options.push({ status: queryParams.status });
    }
    if (queryParams.criteria) {
      options.push({ name: Like(`%${queryParams.criteria}%`) });
      options.push({ description: Like(`%${queryParams.criteria}%`) });
    }
    return this.todoRepository.find({ where: options });
  }
  async getTodoById(id: string) {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) {
      throw new BadRequestException('Todo not found');
    }
    return todo;
  }
  addTodo(todo: CreateTodoDTO): Promise<TodoEntity> {
    return this.todoRepository.save(todo);
  }
  updateTodo(id: string, todo: UpdateTodoDTO): Promise<TodoEntity> {
    return this.todoRepository.save({ ...todo, id });
  }
  deleteTodo(id: string) {
    return this.todoRepository.delete(id);
  }
  softDeleteTodo(id: string) {
    return this.todoRepository.softDelete(id);
  }
  restoreTodo(id: string) {
    return this.todoRepository.restore(id);
  }
  getCountByStatus(status: TodoStatusEnum): Promise<number> {
    return this.todoRepository.count({ status });
  }
  getCount(): Promise<number> {
    return this.todoRepository.count();
  }
}
