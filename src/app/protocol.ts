import { User } from './user';
export class Protocol{
	id: number
	type: string
	savedBy: User
	data: Object
}