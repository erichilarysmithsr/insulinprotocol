import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { Form } from './form';
import { PatientProvider } from './patient-provider.service';
import { Server } from './server.service';


@Component({
	moduleId:module.id,
	templateUrl:'forms-list.component.html'
}) export class FormsListComponent implements OnInit{
	constructor(private pp: PatientProvider,private route: ActivatedRoute,private server: Server){}
	id: number
	error: any
	forms: {infusion: Form[],subcutaneous: Form[]}={infusion:[],subcutaneous:[]};
	ngOnInit(): void{
		let id=+this.route.snapshot.params['id'];
		this.pp.getPatient(id).subscribe(()=>{},error=>this.error=error);
		this.server.getForms(id).subscribe(forms=>{forms.forEach(form=>this.forms[form.type].push(form))},error=>this.error=error);
	}
}