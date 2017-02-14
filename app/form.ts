import { User } from './user';
export class Form{
	type: string
	dt: Date
	savedBy: User
	patientId: number
	id?: number
	values?: Object = {}
}