"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const app_settings_1 = require("./app-settings");
const Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/toPromise");
let w = window;
let AuthService = class AuthService {
    init() {
        let u = localStorage.getItem('currentUser');
        if (u)
            this.user = JSON.parse(u);
    }
    set user(user) {
        this.currentUser = user;
        this.pages = app_settings_1.AppSettings.pages.filter(page => !page.hidden && page.access.find(role => user.role === role));
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
    get user() {
        return this.currentUser;
    }
    signIn() {
        return w.googleAuth2SignIn();
    }
    signOut() {
        localStorage.removeItem('currentUser');
        w.googleAuthDelCookie();
        delete this.currentUser;
        delete this.pages;
        return w.googleAuth2SignOut();
    }
    reload() {
        console.log('reload called');
        return w.googleAuth2Reload();
    }
    checkLogin() {
        return Observable_1.Observable.from(w.checkLogin);
    }
};
AuthService = __decorate([
    core_1.Injectable()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map