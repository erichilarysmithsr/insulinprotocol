import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/delay';

import { AuthService } from './auth.service';
import { DialogService } from './dialog.service';

import { Patient } from './patient';
import { Form } from './form';
import { Protocol } from './protocol';
import { User } from './user';
import { AppSettings } from './app-settings';


@Injectable() export class Server{
	private dataUrl=AppSettings.apiEndpoint
	constructor(private http: Http,private authService: AuthService,private dialogService: DialogService){

	}
	private isBusy: boolean
	set busy(sub:Subscription){
		if(!sub)this.isBusy=false;
		else {
			this.isBusy=true;console.log('wait started');
			sub.add(()=>{this.isBusy=false;console.log('wait stopped');});
		}
	}
	getPatients(uhid? :string): Observable<Patient[]>{
		return this.http.post(this.dataUrl+'getPatients',uhid).map((res)=>this.parseBody(res)).retryWhen((e)=>this.retryRequest(e)).catch(this.handleError);
	}
	getProfile(id :number): Observable<Patient>{
		return this.http.post(this.dataUrl+'getProfile',id).map((res)=>this.parseBody(res)).retryWhen((e)=>this.retryRequest(e)).catch(this.handleError);
	}
	savePatient(patient: Patient): Observable<Patient>{		
		return this.http.post(this.dataUrl+'savePatient',patient).map(res=>this.parseBody(res)).retryWhen((e)=>this.retryRequest(e)).catch(this.handleError);
	}
	saveForm(form: Form): Observable<string>{
		return this.http.post(this.dataUrl+'saveForm',form).map(res=>this.parseBody(res)).retryWhen((e)=>this.retryRequest(e)).catch(this.handleError);
	}
	getForms(patientid: number): Observable<Form[]>{
		return this.http.post(this.dataUrl+'getForms',patientid).map(res=>this.parseBody(res)).retryWhen((e)=>this.retryRequest(e)).catch(this.handleError);
	}
	getProtocol(type: string): Observable<Protocol>{
		return this.http.post(this.dataUrl+'getProtocol',type).map(res=>this.parseBody(res)).retryWhen((e)=>this.retryRequest(e)).catch(this.handleError);
	}
	saveProtocol(protocol: Protocol): Observable<Protocol>{		
		return this.http.post(this.dataUrl+'saveProtocol',protocol).map(res=>this.parseBody(res)).retryWhen((e)=>this.retryRequest(e)).catch(this.handleError);
	}
	validateProtocol(patient: any,forms: any[]): Observable<any>{
		return this.http.post(this.dataUrl+'validateProtocol',{patient:patient,forms:forms}).map(res=>this.parseBody(res)).retryWhen((e)=>this.retryRequest(e)).catch(this.handleError);
	}
	getUserProfile(): Observable<User>{
		return this.http.get(this.dataUrl+'getUserProfile').map(res=>this.parseBody(res)).retryWhen((e)=>this.retryRequest(e)).do(user=>this.authService.user=user).catch(this.handleError);
	}
	getTransactions(): Observable<Form[]>{
		return this.http.get(this.dataUrl+'getTransactions').map(res=>this.parseBody(res)).retryWhen((e)=>this.retryRequest(e)).catch(this.handleError);
	}
	retryRequest(error: Observable<any>): Observable<any>{
		return error.scan((count,e,index)=>{
			if(e!='Auth Fail'||index==1)throw e;
			return;
		},0).delay(1000).switchMap(()=>Observable.from(this.authService.reload()));
	}
	private parseBody(res: Response){
		if(res.text()=='fail')throw "Server Internal Error";
		if(res.text()=='authFail'){throw "Auth Fail";}
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
		console.log('server error',errMsg);
		return Observable.throw(errMsg);
	}
}