import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';
import { Server } from './server.service';

import { Observable } from 'rxjs/Observable';
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
			Observable.from(this.authService.signOut().then(()=>this.router.navigate(['login']),(e)=>{console.log(e);this.router.navigate(['login'])})).subscribe();
		});
		this.route.url.filter(url=>url.find(urlSeg=>urlSeg.path==='login')?true:false)
		.subscribe(()=>{
			this.server.busy=this.authService.checkLogin()
			.switchMap(()=>this.server.getUserProfile())
			.subscribe((user)=>{
				if(user.role)this.router.navigate(['patient-list']);
				else this.router.navigate(['patient-list']);//add the account type choosing screen here
			},e=>{});	
		})
		
	}
	signIn(): void{
		this.authService.signIn();
	}	
}