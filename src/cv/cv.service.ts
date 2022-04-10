import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from 'src/skill/entities/skill.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
  ) {}
  create(createCvDto: CreateCvDto) {
    const user: User = new User();
    user.id = createCvDto.userId;
    const newCv: any = { ...createCvDto, user };
    if (createCvDto.skillIds) {
      newCv.skills = createCvDto.skillIds.map((skillId) => {
        const skill: Skill = new Skill();
        skill.id = skillId;
        return skill;
      });
    }
    return this.cvRepository.save(newCv);
  }

  findAll() {
    return this.cvRepository.find();
  }

  findOne(id: string) {
    return this.cvRepository.findOne(id);
  }

  update(id: string, updateCvDto: UpdateCvDto) {
    return this.cvRepository.save({ id, ...updateCvDto });
  }

  remove(id: string) {
    return this.cvRepository.delete(id);
  }

  softRemove(id: string) {
    return this.cvRepository.softDelete(id);
  }

  restore(id: string) {
    return this.cvRepository.restore(id);
  }
}
