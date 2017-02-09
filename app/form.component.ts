import { Component , OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PatientProvider } from './patient-provider.service';
import { Form } from './form';
import { Server } from './server.service';

@Component({
	moduleId:module.id,
	templateUrl:'form.component.html'
})export class FormComponent{
	private error: any
	private type: string
	form = new Form()
	private values: Object = {}
	private patientId: number
	constructor(private pp: PatientProvider, private router: Router,private route: ActivatedRoute,private location: Location,private server: Server){}
	ngOnInit(): void{
		this.patientId=+this.route.snapshot.params['id'];if(!this.patientId)return;
		this.pp.getPatient(this.patientId).subscribe();
		this.type=this.route.snapshot.params['type'];
	}
	saveForm(): void{
		this.form.patientId=this.patientId;
		this.server.saveForm(this.form).subscribe();
	}
	goBack(): void{
		this.location.back();
	}
}