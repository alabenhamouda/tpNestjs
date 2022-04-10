import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.save({
      ...createUserDto,
      password: await this.hashPassword(createUserDto.password),
    });
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.save({ id, ...updateUserDto });
  }

  delete(id: string) {
    return this.userRepository.delete(id);
  }

  softDelete(id: string) {
    return this.userRepository.softDelete(id);
  }

  restore(id: string) {
    return this.userRepository.restore(id);
  }
}
