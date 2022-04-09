import { IsString } from "class-validator";

export class CreateTodoDTO {
	@IsString()
	name: string;
	@IsString()
	description: string;
}
