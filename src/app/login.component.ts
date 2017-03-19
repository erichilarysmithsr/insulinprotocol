import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';
import { Server } from './server.service';

import 'rxjs/operator/switchMap'
import 'rxjs/operator/filter';

@Component({
	moduleId:module.id,
	templateUrl:'login.component.html'
}) export class LoginComponent implements OnInit{
	selectedRole: string
	constructor(private authService: AuthService,private router: Router,private route: ActivatedRoute,private server: Server){
		
	}
	ngOnInit(): void{
		this.route.url.filter(url=>url.find(urlSeg=>urlSeg.path==='logout')?true:false).subscribe(params=>{
			this.authService.signOut().then(()=>this.router.navigate(['login']),(e)=>{console.log(e);this.router.navigate(['login'])});
		});
		this.route.url.filter(url=>url.find(urlSeg=>urlSeg.path==='login')?true:false).switchMap(()=>this.authService.checkLogin()).switchMap(()=>this.server.getUserProfile()).subscribe((user)=>{
			if(user.role)this.router.navigate(['patient-list']);
			else this.router.navigate(['patient-list']);//add the account type choosing screen here
		});
	}
	signIn(): void{
		this.authService.signIn();
	}	
}