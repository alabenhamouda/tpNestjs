import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}
  create(createSkillDto: CreateSkillDto) {
    return this.skillRepository.save(createSkillDto);
  }

  findAll() {
    return this.skillRepository.find();
  }

  findOne(id: string) {
    return this.skillRepository.findOne(id);
  }

  update(id: string, updateSkillDto: UpdateSkillDto) {
    return this.skillRepository.save({ id, ...updateSkillDto });
  }

  remove(id: string) {
    return this.skillRepository.delete(id);
  }
}
