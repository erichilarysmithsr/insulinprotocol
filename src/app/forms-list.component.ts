import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,UrlSegment } from '@angular/router';

import { Form } from './form';
import { PatientProvider } from './patient-provider.service';
import { Server } from './server.service';


@Component({
	moduleId:module.id,
	templateUrl:'forms-list.component.html'
}) export class FormsListComponent implements OnInit{
	constructor(private pp: PatientProvider,private route: ActivatedRoute,private router: Router,private server: Server){}
	id: number
	error: any
	forms: Form[] = []
	ngOnInit(): void{
		if(this.route.snapshot.url[0].path=='transactions'){
			this.route.params.switchMap(params=>this.server.getTransactions()).subscribe(forms=>this.processForms(forms),e=>this.error=e);	
		}else{
			this.route.params.switchMap(params=>this.pp.getPatient(+params['id'])).subscribe(()=>{},e=>this.error=e);
			this.route.params.switchMap(params=>this.server.getForms(+params['id'])).subscribe(forms=>this.processForms(forms),e=>this.error=e);
		}		
	}
	goBack(): void{
		this.router.navigate(['patient-list']);
	}
	private processForms(forms: Form[]): void{
		let h = {};
		forms.sort((f1,f2)=>f1.id-f2.id);
		for(var i=0;i<forms.length;i++){
			let f=forms[i],parentId = f.data.parentId;
			if(parentId&&h[parentId]){
				if(f.data.dose)h[parentId].data.dose=f.data.dose;
				if(f.data.insulinDose)h[parentId].data.insulinDose=f.data.insulinDose;
			}else h[f.id]=f;
		}
		for(var t in h)this.forms.push(h[t]);this.forms.reverse();
	}
}