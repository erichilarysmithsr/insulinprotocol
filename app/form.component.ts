import { Component , OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PatientProvider } from './patient-provider.service';
import { Form } from './form';
import { Server } from './server.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DialogComponent } from './dialog.component';

@Component({
	moduleId:module.id,
	templateUrl:'form.component.html'
})export class FormComponent{
	private error: any
	private type: string
	form = new Form()
	private values: Object = {}
	private patientId: number
	private diag = new DialogComponent(this.dialog);
	constructor(private pp: PatientProvider, private router: Router,private route: ActivatedRoute,private location: Location,private server: Server,private dialog: MdDialog){

	}
	ngOnInit(): void{
		this.patientId=+this.route.snapshot.params['id'];if(!this.patientId)return;
		this.pp.getPatient(this.patientId).subscribe();
		this.type=this.route.snapshot.params['type'];
	}
	saveForm(): void{
		this.form.patientId=this.patientId;this.form.type=this.type;
		this.server.saveForm(this.form).subscribe(()=>{
			let diag=this.diag.show('Saved','The form submitted has been successfully saved.',[],'Close');
			diag.afterClosed().subscribe(()=>this.router.navigate(['patient-list']));
		});		
	}
	goBack(): void{
		this.router.navigate(['patient-list']);
	}
}