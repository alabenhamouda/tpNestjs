import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class StatInputDto {
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @Type(() => Date)
  @IsOptional()
  @IsDate()
  endDate?: Date;
}
