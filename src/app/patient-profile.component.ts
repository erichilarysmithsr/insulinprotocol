import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { PatientProvider } from './patient-provider.service';
import { Server } from './server.service';
import { Patient } from './patient';
import { AppSettings } from './app-settings';

@Component({
	moduleId:module.id,
	templateUrl:'patient-profile.component.html'
}) export class PatientProfileComponent implements OnInit{
	error: any;
	constructor(public pp: PatientProvider, private router: Router,private route: ActivatedRoute,private location: Location,private server: Server){}
	getOptions(type: string): any{
		let conf = AppSettings[type]; return conf.filter((r: any) => r.k.match(/col/));
	}
	ngOnInit(): void{
		let id=+this.route.snapshot.params['id'];
		this.pp.getPatient(id);
	}
	saveProfile(): void{
		this.server.busy=this.pp.savePatient().subscribe(patient=>{this.router.navigate(['patient-list'])},error=>this.error=error);
	}
	goBack(): void{
		this.router.navigate(['patient-list']);
	}
}
