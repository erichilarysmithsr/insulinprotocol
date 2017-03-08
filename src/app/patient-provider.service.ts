//This service is a caching method to allow multiple components to use the same patient without requesting each time
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Server } from './server.service';
import { Patient } from './patient';

@Injectable() export class PatientProvider{
	patient: Patient = new Patient();
	constructor(private server: Server){};
	getPatient(id: number): Observable<Patient>{
		if(this.patient&&this.patient.id==id)return Observable.from([this.patient]);
		else return this.server.getProfile(id).do(patient =>{this.patient=patient});
	}
	savePatient(): Observable<Patient>{
		return this.server.savePatient(this.patient);
	}
}