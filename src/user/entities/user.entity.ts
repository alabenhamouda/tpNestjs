import { Timestamp } from './../../util/entities/timestamp';
import { Mixin } from 'ts-mixer';
import { Cv } from './../../cv/entities/cv.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User extends Mixin(Timestamp) {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Cv, (cv) => cv.user)
  cvs: Cv[];
}
