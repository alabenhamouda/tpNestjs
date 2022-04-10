import { User } from '../user/entities/user.entity';
import { AppModule } from './../app.module';
import { NestFactory } from '@nestjs/core';
import * as faker from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const todoRepository: Repository<User> = app.get(getRepositoryToken(User));
  console.log(await todoRepository.find());
  await app.close();
}
bootstrap();
