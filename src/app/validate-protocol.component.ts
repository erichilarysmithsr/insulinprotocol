import { Component } from '@angular/core';

import { Patient } from './patient';
import { Form } from './form';
import { Server } from './server.service';
import { AuthService } from './auth.service';

import { AppSettings } from './app-settings';
declare var date: any;

@Component({
	moduleId:module.id,
	templateUrl:'validate-protocol.component.html'
})export class ValidateProtocolComponent{
	resp: any
	patient: Patient = {name:'Pravin',id:3,dob:new Date(),profile:{diabetes:'Known Case',insulinDeliveryType:'subcutaneous',preTransplantDose:40,weight:80},bednum:'123',uhid:'1234'};
	order = ['Before Breakfast','10:00 AM','Before Lunch','Before Evening Snack','Before Dinner','Bedtime']
	data: any[] = []
	config = [{k:'dt',t:'Date'},{k:'dosageType',t:'Dosage Type'},{k:'plasmaGlucose',t:'Plasma Glucose',type:'number'},{k:'insulinDose',t:'Insulin Dose',type:'number'}]
	recommendation: any = {}
	constructor(private server: Server,public authService: AuthService){
		for(var i=0;i<this.order.length;i++)this.data.push({dt:date.format(date.addDays(new Date(),-1),'DD MMM YYYY'),dosageType:this.order[i],plasmaGlucose:90+Math.round(Math.random()*100),insulinDose:10+Math.round(Math.random()*10)})
		for(var i=0;i<this.order.length;i++)this.data.push({dt:date.format(new Date(),'DD MMM YYYY'),dosageType:this.order[i]})
	}	
	submit(page: any): void{
		delete this.recommendation;
		let forms :any[] = [];
		for(var i = 0;i<this.data.length;i++){
			let r = this.data[i];
			if(r.plasmaGlucose)forms.push({type:'subcutaneous',dt:r.dt,data:{plasmaGlucose:r.plasmaGlucose,dosageType:r.dosageType}})
			if(r.insulinDose)forms.push({type:'subcutaneousDose',dt:r.dt,data:{insulinDose:r.insulinDose,dosageType:r.dosageType}})
		}
		this.server.busy=this.server.validateProtocol(this.patient,forms).subscribe((rs)=>{this.recommendation=rs;setImmediate(function(){page.scrollTop=page.scrollHeight;});});
	}
}