import { Injectable } from '@angular/core';
import { Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';
import { AppSettings } from './app-settings';

@Injectable()
export class AuthGuard implements CanActivate{
	constructor(private authService: AuthService,private router: Router){}
	canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean{
		let status = false, role = this.authService.user?this.authService.user.role:null,path = route.url.length?route.url[0].path: null, pages = AppSettings.pages;
		let page = pages.find(page=>page.route.length?page.route[0]===path:null);
		if(path&&page&&role&&page.access.find(r=>r===role))status = true;
		else this.router.navigate(['login']);
		return status;
	}
}