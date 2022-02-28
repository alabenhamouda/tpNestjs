import { OmitType, PartialType } from '@nestjs/mapped-types';
import { TodoStatusEnum } from '../enums/todo-status.enum';
import { CreateTodoDTO } from './createTodo.dto';

export class UpdateTodoDTO extends PartialType(CreateTodoDTO) {
	status: TodoStatusEnum
}
