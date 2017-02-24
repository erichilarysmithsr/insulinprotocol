import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Patient } from './patient';
import { PatientProvider } from './patient-provider.service';

@Component({
	moduleId:module.id,
	template:`
		<md-toolbar style="margin:0 0 10px 0;" color="primary">
			<span>{{pp.patient.id?pp.patient.name:'New Patient'}}</span>
		</md-toolbar>
		<router-outlet></router-outlet>
	`,
	providers:[PatientProvider]
}) export class PatientComponent implements OnInit{
	error: any
	constructor(public pp: PatientProvider,private route: ActivatedRoute){
	}
	ngOnInit(): void{
		let id=+this.route.snapshot.params['id'];if(!id)return;
		this.pp.getPatient(id).subscribe( patient => {} );	
	}
}