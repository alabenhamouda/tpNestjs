import faker from '@faker-js/faker';
import { Skill } from '../../skill/entities/skill.entity';
import { Repository } from 'typeorm';
import Helper from './helper';

export default class SkillHelper extends Helper {
  constructor(skillRepository: Repository<Skill>) {
    super(skillRepository);
  }
  create() {
    const skill = new Skill();
    skill.designation = faker.lorem.word();
    return skill;
  }
}
