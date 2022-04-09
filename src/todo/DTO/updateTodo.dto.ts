import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { TodoStatusEnum } from '../enums/todo-status.enum';
import { CreateTodoDTO } from './createTodo.dto';

export class UpdateTodoDTO extends PartialType(CreateTodoDTO) {
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status?: TodoStatusEnum;
}
