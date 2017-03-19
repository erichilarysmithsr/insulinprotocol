import { Component,ViewChild,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSidenav } from '@angular/material';

import { AuthService } from './auth.service';

@Component({
  selector: 'my-app',
  moduleId:module.id,
  templateUrl:'app.component.html'
})
export class AppComponent implements AfterViewInit { 
	@ViewChild(MdSidenav) private sideNav: MdSidenav;
	constructor(private authService: AuthService,private router: Router){
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
