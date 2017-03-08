import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';

import { Patient } from './patient';
import { Form } from './form';
import { Protocol } from './protocol';


@Injectable() export class Server{
	private dataUrl='/data/';
	constructor(private http: Http){}
	getPatients(uhid? :string): Observable<Patient[]>{
		return this.http.post(this.dataUrl+'getPatients',uhid).map(this.parseBody).catch(this.handleError);
	}
	getProfile(id :number): Observable<Patient>{
		return this.http.post(this.dataUrl+'getProfile',id).map(this.parseBody).catch(this.handleError);
	}
	savePatient(patient: Patient): Observable<Patient>{		
		return this.http.post(this.dataUrl+'savePatient',patient).map(this.parseBody).catch(this.handleError);
	}
	saveForm(form: Form): Observable<string>{
		return this.http.post(this.dataUrl+'saveForm',form).map(this.parseBody).catch(this.handleError);
	}
	getForms(patientid: number): Observable<Form[]>{
		return this.http.post(this.dataUrl+'getForms',patientid).map(this.parseBody).catch(this.handleError);
	}
	getProtocol(type: string): Observable<Protocol>{
		return this.http.post(this.dataUrl+'getProtocol',type).map(this.parseBody).catch(this.handleError);
	}
	saveProtocol(protocol: Protocol): Observable<Protocol>{		
		return this.http.post(this.dataUrl+'saveProtocol',protocol).map(this.parseBody).catch(this.handleError);
	}
	private parseBody = (res: Response)=>{
		if(res.text()=='fail')this.handleError('Server Internal Error');
		return res.text()=='success'?'success':(res.json()||{});
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