import { Component,ViewChild,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSidenav } from '@angular/material';

import { AuthService } from './auth.service';
import { Server } from './server.service';

@Component({
  selector: 'my-app',
  moduleId:module.id,
  templateUrl:'app.component.html'
})
export class AppComponent implements AfterViewInit { 
	@ViewChild(MdSidenav) public sideNav: MdSidenav;
	constructor(public authService: AuthService,private router: Router,public server:Server){
		this.authService.init();
	}
	ngAfterViewInit(): void{
		this.authService.sideNav = this.sideNav;
	}
	sideNavHandler(page: any):void{
		this.sideNav.close();
		this.router.navigate(page.route);
	}
}
