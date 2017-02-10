import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';

import { Patient } from './patient';
import { Form } from './form';


@Injectable() export class Server{
	private temppatients: Patient[] = [{id:1,name:'Patient 1',uhid:'MM00449710',dob:'19/09/1986',bednum:'0909'},{id:2,name:'Patient 2',uhid:'MM00449712',dob:'19/09/1986',bednum:'0909'}]
	private withProfile: Patient = {id:3,name:'Patient 3',uhid:'MM00449713',dob:'19/09/1986',bednum:'0909',profile:{weight:100,diabetes:'Yes'}};
	private formsStore: Form[] = []
	getPatients(uhid? :string): Observable<Patient[]>{
		return Observable.from(uhid?[[]]:[this.temppatients]);
	}
	getProfile(id :number): Observable<Patient>{
		this.withProfile.id=id;
		return Observable.from([this.withProfile]);
	}
	savePatient(patient: Patient): Observable<Patient>{
		if(!patient.id)patient.id=Math.round(Math.random()*100);
		this.temppatients.push(patient);
		return Observable.from([patient]);
	}
	saveForm(form: Form): Observable<string>{
		this.formsStore.push(form);
		return Observable.of('success');
	}
	private handleError (error: Response | any) {
		// In a real world app, we might use a remote logging infrastructure
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}
}