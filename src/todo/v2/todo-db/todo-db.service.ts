import { SharedConstants } from './../../../util/shared/shared-constants';
import { SearchTodoDto } from './../../DTO/search-todo.dto';
import { UpdateTodoDTO } from './../../DTO/updateTodo.dto';
import { CreateTodoDTO } from './../../DTO/createTodo.dto';
import { TodoEntity } from './../../entity/todo.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Like, Repository } from 'typeorm';
import { TodoService } from 'src/todo/interfaces/todo-service.interface';
import { TodoStatusEnum } from 'src/todo/enums/todo-status.enum';
import { StatInputDto } from 'src/todo/DTO/stat-input.dto';
import { stat } from 'fs';

@Injectable()
export class TodoDbService implements TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}
  getTodos(queryParams: SearchTodoDto): Promise<TodoEntity[]> {
    // first version
    // const options = [];
    // if (queryParams.status) {
    //   options.push({ status: queryParams.status });
    // }
    // if (queryParams.criteria) {
    //   options.push({ name: Like(`%${queryParams.criteria}%`) });
    //   options.push({ description: Like(`%${queryParams.criteria}%`) });
    // }
    // return this.todoRepository.find({ where: options });

    // second version
    const qb = this.todoRepository.createQueryBuilder('todo');
    if (queryParams.status) {
      qb.where('todo.status = :status', { status: queryParams.status });
    }
    if (queryParams.criteria) {
      // qb.andWhere(
      //   '(todo.name LIKE :criteria OR todo.description LIKE :criteria)',
      //   { criteria: `%${queryParams.criteria}%` },
      // );
      qb.andWhere(
        new Brackets((bqb) => {
          bqb.where('todo.name LIKE :criteria', {
            criteria: `%${queryParams.criteria}%`,
          });
          bqb.orWhere('todo.description LIKE :criteria', {
            criteria: `%${queryParams.criteria}%`,
          });
        }),
      );
    }

    // add pagination
    if (queryParams.page) {
      qb.offset((queryParams.page - 1) * SharedConstants.PAGE_LENGTH);
      qb.limit(SharedConstants.PAGE_LENGTH);
    }

    return qb.getMany();
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
  batchAddTodo(todos: CreateTodoDTO[]): Promise<TodoEntity[]> {
    return this.todoRepository.save(todos);
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
  getStats(statInput: StatInputDto): Promise<any> {
    const qb = this.todoRepository.createQueryBuilder('todo');
    qb.select('todo.status', 'status')
      .addSelect('COUNT(todo.id)', 'count')
      .groupBy('todo.status');
    if (statInput.startDate) {
      qb.where('todo.createdAt >= :startDate', {
        startDate: statInput.startDate,
      });
    }
    if (statInput.endDate)
      qb.andWhere('todo.createdAt <= :endDate', { endDate: statInput.endDate });

    return qb.getRawMany();
  }
}
