import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoEntity } from './entity/todo.entity';
import { TodoDbController } from './v2/todo-db/todo-db.controller';
import { TodoDbService } from './v2/todo-db/todo-db.service';

@Module({
  controllers: [TodoController, TodoDbController],
	imports: [
		TypeOrmModule.forFeature([TodoEntity]),
	],
  providers: [TodoService, TodoDbService],
})
export class TodoModule {}
