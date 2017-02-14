import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { PatientProvider } from './patient-provider.service';
import { Patient } from './patient';

@Component({
	moduleId:module.id,
	templateUrl:'patient-profile.component.html'
}) export class PatientProfileComponent implements OnInit{
	error: any;
	constructor(private pp: PatientProvider, private router: Router,private route: ActivatedRoute,private location: Location){}
	ngOnInit(): void{
		let id=+this.route.snapshot.params['id'];
		this.pp.getPatient(id).subscribe(()=>{
			let uhid=this.route.snapshot.queryParams['uhid'];if(uhid)this.pp.patient.uhid=uhid;
		},error=>this.error=error);
	}
	saveProfile(): void{
		this.pp.savePatient().subscribe(patient=>{this.router.navigate(['patient-list'])},error=>this.error=error);
	}
	goBack(): void{
		this.router.navigate(['patient-list']);
	}
}
