import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { TodoStatusEnum } from '../enums/todo-status.enum';
export class SearchTodoDto {
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;

  @IsOptional()
  criteria?: string;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  page?: number;
}
