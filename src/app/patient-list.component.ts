import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Patient } from './patient';
import { Server } from './server.service';
import { DialogService } from './dialog.service';
import { AuthService } from './auth.service';

@Component({
	moduleId:module.id,
	templateUrl:'patient-list.component.html',
	selector:'patient-list',
	styleUrls:['patient-list.component.css']
}) export class PatientListComponent implements OnInit{
	patients: Patient[]
	set error(error:any){
		let diag=this.dialogService.show('Error','There has been an error in contacting the server. Please check your connection and try again.',[],'Close');
	}
	showSearch: boolean
	constructor(private server: Server,private router: Router,private dialogService: DialogService,public authService: AuthService){}
	ngOnInit(): void{
		this.server.getPatients().subscribe(patients=>this.patients=patients,error=>this.error=error);
	}
	onSearch(search?: string): void{
		this.server.getPatients(search).subscribe(patients=>this.patients=patients,error=>this.error=error);
	}
	editPatient(id: number): void{
		this.router.navigate(['patient',id,'profile']);
	}
	newPatient(): void{
		this.router.navigate(['patient',0,'profile']);
	}
	showForm(id: number): void{
		if(!id)return;
		this.router.navigate(['patient',id,'form']);
	}
	formsList(id: number): void{
		this.router.navigate(['patient',id,'forms-list']);
	}
	searchBack(): void{
		this.showSearch=false; 
		this.onSearch();
	}
}
