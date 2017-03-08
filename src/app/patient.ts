import { Profile } from './profile';
export class Patient{
	id: number;
	name: string;
	uhid: string;
	dob: Date;
	bednum: string;
	profile?: Profile = new Profile();
	//add other optional properties diabetes type, etc
}