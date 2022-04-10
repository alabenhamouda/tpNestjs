import { TodoEntity } from './../todo/entity/todo.entity';
import { CreateTodoDTO } from './../todo/DTO/createTodo.dto';
import { TodoDbService } from './../todo/v2/todo-db/todo-db.service';
import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

@Injectable()
export class FakeDataService {
  constructor(private todoService: TodoDbService) {}
  fakeTodo(): CreateTodoDTO {
    return {
      name: faker.lorem.words(3),
      description: faker.lorem.sentence(),
    };
  }
  fake(): Promise<TodoEntity[]> {
    const length = 37;
    const todos = [];
    for (let i = 0; i < length; i++) {
      todos.push(this.fakeTodo());
    }
    return this.todoService.batchAddTodo(todos);
  }
}
