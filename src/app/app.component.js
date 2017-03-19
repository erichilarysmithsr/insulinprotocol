var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MdSidenav } from '@angular/material';
import { AuthService } from './auth.service';
let AppComponent = class AppComponent {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
        this.authService.init();
    }
    ngAfterViewInit() {
        this.authService.sideNav = this.sideNav;
    }
    sideNavHandler(page) {
        this.sideNav.close();
        this.router.navigate(page.route);
    }
};
__decorate([
    ViewChild(MdSidenav),
    __metadata("design:type", MdSidenav)
], AppComponent.prototype, "sideNav", void 0);
AppComponent = __decorate([
    Component({
        selector: 'my-app',
        moduleId: module.id,
        templateUrl: 'app.component.html'
    }),
    __metadata("design:paramtypes", [AuthService, Router])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map