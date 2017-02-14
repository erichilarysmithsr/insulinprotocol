import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Patient } from './patient';
import { Server } from './server.service';

@Component({
	moduleId:module.id,
	templateUrl:'patient-list.component.html',
	selector:'patient-list',
	styleUrls:['patient-list.component.css']
}) export class PatientListComponent implements OnInit{
	patients: Patient[]
	error: any
	constructor(private server: Server,private router: Router){}
	ngOnInit(): void{
		this.server.getPatients().subscribe(patients=>this.patients=patients,error=>this.error=error);
	}
	onSearch(search: string): void{
		this.server.getPatients(search).subscribe(patients=>this.patients=patients,error=>this.error=error);
	}
	editPatient(id: number): void{
		this.router.navigate(['patient',id,'profile']);
	}
	newPatient(uhid: string): void{
		this.router.navigate(['patient',0,'profile'],{queryParams:{"uhid":uhid}});
	}
	showForm(id: number,type: string): void{
		if(!id)return;
		this.router.navigate(['patient',id,'form',type]);
	}
	formsList(id: number): void{
		this.router.navigate(['patient',id,'forms-list']);
	}
}
