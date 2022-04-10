import { IsString } from 'class-validator';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsNumberString,
  IsUUID,
  Length,
  IsOptional,
} from 'class-validator';

export class CreateCvDto {
  @IsString()
  name: string;

  @IsString()
  firstname: string;

  @Type(() => Number)
  @IsNumber()
  age: number;

  @IsNumberString()
  @Length(8, 8)
  cin: string;

  @IsString()
  job: string;

  @IsString()
  path: string;

  @IsUUID()
  userId: string;

  @IsOptional()
  @IsUUID('all', { each: true })
  skillIds: string[];
}
