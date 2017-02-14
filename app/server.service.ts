import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';

import { Patient } from './patient';
import { Form } from './form';


@Injectable() export class Server{
	private temppatients: Patient[] = []
	private withProfile: Patient = {id:0,name:'Patient',uhid:'MM00449713',dob:'19/09/1986',bednum:'0909',profile:{weight:100,diabetes:'Yes'}};
	private formsStore: Form[] = [{patientId:3,type:'infusion',dt:new Date(),savedBy:{id:1,name:'Pravin'},values:{currentRate:4,modifiedRate:5,plasmaGlucose:180}}]
	constructor(){
		for(var i=0;i<20;i++){let n=new Patient();n.id=(i+3);n.uhid='MM004497'+(i+6);n.name='Patient '+(i+3);this.temppatients.push(n);}
	}
	getPatients(uhid? :string): Observable<Patient[]>{
		if(uhid){
			var p=this.temppatients.find(pat=>pat.uhid.toString().toLowerCase()==uhid.toString().toLowerCase());
			return Observable.from(p?[[p]]:[[]]);
		}else return Observable.from([this.temppatients]);
	}
	getProfile(id :number): Observable<Patient>{
		let p=this.temppatients.find(p=>p.id==id)||new Patient();
		return Observable.from([p]);
	}
	savePatient(patient: Patient): Observable<Patient>{
		if(!patient.id){
			patient.id=Math.round(Math.random()*100);
			this.temppatients.push(patient);
		}
		return Observable.from([patient]);
	}
	saveForm(form: Form): Observable<string>{
		form.dt=new Date();
		this.formsStore.push(form);
		return Observable.of('success');
	}
	getForms(id: number): Observable<Form[]>{
		return Observable.from([this.formsStore.filter(form=>form.patientId==id)]);
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