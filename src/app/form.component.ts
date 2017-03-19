import { Component , OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PatientProvider } from './patient-provider.service';
import { Form } from './form';
import { Server } from './server.service';

import { DialogService } from './dialog.service';

@Component({
	moduleId:module.id,
	templateUrl:'form.component.html'
})export class FormComponent{
	error: any
	form = new Form()
	patientId: number
	type: string
	recommendation: string
	constructor(public pp: PatientProvider, private router: Router,private route: ActivatedRoute,private location: Location,private server: Server,private dialogService: DialogService){}
	ngOnInit(): void{
		this.route.params.do(params=>this.patientId=+params['id']).switchMap(params=>this.pp.getPatient(+params['id'])).subscribe(()=>this.type=this.pp.patient.profile.insulinDeliveryType);
	}
	saveForm(): void{
		this.form.patientId=this.patientId;this.form.type=this.type;
		this.server.saveForm(this.form).subscribe((rs: any)=>{
			if(rs=='success'){
				let diag=this.dialogService.show('Saved','The form submitted has been successfully saved.',[],'Close');
				diag.afterClosed().subscribe(()=>this.router.navigate(['patient-list']));
			}else{
				this.form = new Form(); this.form.data.dosageType = rs.dosageType; this.form.data.parentId = rs.parentId;
				this.type = this.type+'Dose'; this.recommendation = rs;
			}			
		},(e)=>this.error=e);		
	}
	goBack(): void{
		this.router.navigate(['patient-list']);
	}
	changeProfile(): void{
		this.router.navigate(['patient',this.patientId]);
	}
}