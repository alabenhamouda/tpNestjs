import { User } from '../../user/entities/user.entity';
import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import Helper from './helper';
export default class UserHelper extends Helper {
  constructor(userRepository: Repository<User>) {
    super(userRepository);
  }
  create() {
    const user = new User();
    user.username = faker.internet.userName();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    return user;
  }
}
