import { Cv } from './../../cv/entities/cv.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('skill')
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  designation: string;

  @ManyToMany(() => Cv, (cv) => cv.skills)
  @JoinTable()
  cvs: Cv[];
}
