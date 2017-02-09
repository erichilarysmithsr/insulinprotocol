import { User } from './user';
export class Form{
	dt: Date
	savedBy: User
	patientId: number
	id?: number
	values?: Object = {}
}