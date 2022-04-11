import { Skill } from '../../skill/entities/skill.entity';
import { User } from '../../user/entities/user.entity';
import { Cv } from './../../cv/entities/cv.entity';
import { Repository } from 'typeorm';
import Helper from './helper';
import { faker } from '@faker-js/faker';
export default class CvHelper extends Helper {
  constructor(cvRepository: Repository<Cv>) {
    super(cvRepository);
  }
  create(user: User | (() => User), skills?: Skill[] | (() => Skill[])): Cv {
    const cv = new Cv();
    cv.firstname = faker.name.firstName();
    cv.name = faker.name.lastName();
    cv.age = faker.datatype.number({ min: 18, max: 60 });
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    cv.cin = faker.random.arrayElements(digits, 8).join('');
    cv.job = faker.lorem.word();
    cv.path = faker.system.filePath();
    if (user instanceof Function) {
      cv.user = user();
    } else {
      cv.user = user;
    }
    if (skills) {
      if (skills instanceof Function) {
        cv.skills = skills();
      } else {
        cv.skills = skills;
      }
    }
    return cv;
  }
}
