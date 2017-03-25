//This service is a caching method to allow multiple components to use the same patient without requesting each time
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Server } from './server.service';
import { Patient } from './patient';

@Injectable() export class PatientProvider{
	patient: Patient = new Patient();
	constructor(private server: Server){};
	getPatient(id: number): Promise<any>{
		if(!this.patient||this.patient.id!=id)return new Promise((resolve,reject)=>{
			this.server.busy=this.server.getProfile(id).subscribe(patient=>{
				this.patient=patient;resolve();
			},e=>reject());
		}) 
		else return Promise.resolve();
	}
	savePatient(): Observable<Patient>{
		return this.server.savePatient(this.patient);
	}
}