import { Timestamp } from './../../util/entities/timestamp';
import { TodoStatusEnum } from './../enums/todo-status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Mixin } from 'ts-mixer';

@Entity("todo")
export class TodoEntity extends Mixin(Timestamp) {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	@Column()
	name: string;
	@Column()
	description: string;
	@Column({
		type: 'enum',
		enum: TodoStatusEnum,
		default: TodoStatusEnum.waiting,
	})
	status: TodoStatusEnum;
}