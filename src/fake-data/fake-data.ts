import { Skill } from '../skill/entities/skill.entity';
import { User } from '../user/entities/user.entity';
import { AppModule } from './../app.module';
import { NestFactory } from '@nestjs/core';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cv } from '../cv/entities/cv.entity';
import UserHelper from './helpers/user-helper';
import CvHelper from './helpers/cv-helper';
import SkillHelper from './helpers/skill-helper';
import faker from '@faker-js/faker';
function getRandomNumber() {
  return faker.datatype.number({ min: 10, max: 20 });
}
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userRepository: Repository<User> = app.get(getRepositoryToken(User));
  const cvRepository: Repository<Cv> = app.get(getRepositoryToken(Cv));
  const skillRepository: Repository<Skill> = app.get(getRepositoryToken(Skill));
  const userHelper = new UserHelper(userRepository);
  const cvHelper = new CvHelper(cvRepository);
  const skillHelper = new SkillHelper(skillRepository);
  // delete data
  await userHelper.deleteAll();
  await cvHelper.deleteAll();
  await skillHelper.deleteAll();

  // create users
  let users = userHelper.createMany(getRandomNumber());
  users = await userHelper.save(users);

  // create multiple skills
  let skills = skillHelper.createMany(getRandomNumber());
  skills = await skillHelper.save(skills);

  // create multiple cvs
  function getRandomUser() {
    return faker.random.arrayElement(users);
  }
  function getRandomSkills() {
    return faker.random.arrayElements(skills);
  }
  let cvs = cvHelper.createMany(
    getRandomNumber(),
    getRandomUser,
    getRandomSkills,
  );
  cvs = await cvHelper.save(cvs);

  console.log('Fake data created successfully');

  await app.close();
}
bootstrap();
