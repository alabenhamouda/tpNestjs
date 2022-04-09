import { IsEnum, IsOptional } from 'class-validator';
import { TodoStatusEnum } from '../enums/todo-status.enum';

export class CountByStatusQueryParamsDTO {
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status?: TodoStatusEnum;
}
