import { Injectable } from '@angular/core';
import { MdSidenav } from '@angular/material';

import { User } from './user';
import { AppSettings } from './app-settings';

import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

let w: any = window;
@Injectable() export class AuthService{
	sideNav: MdSidenav
	private currentUser: User
	pages: any[]
	init(): void{
		let u = localStorage.getItem('currentUser');if(u)this.user=JSON.parse(u);
	}
	set user(user: User){
		this.currentUser=user;this.pages = AppSettings.pages.filter(page => !page.hidden && page.access.find(role => user.role===role));
		localStorage.setItem('currentUser', JSON.stringify(user));
	}
	get user(): User{
		return this.currentUser;
	}
	signIn(): Promise<any>{
		return w.googleAuth2SignIn();
	}
	signOut(): Promise<any>{
		localStorage.removeItem('currentUser');w.googleAuthDelCookie();delete this.currentUser;delete this.pages;
		return w.googleAuth2SignOut();
	}
	reload(): Promise<any>{
		console.log('reload called');
		return w.googleAuth2Reload();
	}
	checkLogin(): Observable<any>{
		return Observable.from(w.checkLogin);
	}
}