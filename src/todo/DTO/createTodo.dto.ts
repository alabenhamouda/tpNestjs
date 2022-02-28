import { PickType } from '@nestjs/mapped-types';
import { AllTodo } from './allTodo.dto';
export class CreateTodoDTO extends PickType(AllTodo, [
  'name',
  'description',
]) {}
