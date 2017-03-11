import { User } from './user';
export class Form{
	id?: number
	type: string
	dt: Date
	savedBy: User
	patientId: number
	data?: any = {}
}