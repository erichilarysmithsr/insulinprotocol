"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const material_1 = require("@angular/material");
const auth_service_1 = require("./auth.service");
const server_service_1 = require("./server.service");
let AppComponent = class AppComponent {
    constructor(authService, router, server) {
        this.authService = authService;
        this.router = router;
        this.server = server;
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
    core_1.ViewChild(material_1.MdSidenav),
    __metadata("design:type", material_1.MdSidenav)
], AppComponent.prototype, "sideNav", void 0);
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        moduleId: module.id,
        templateUrl: 'app.component.html'
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router, server_service_1.Server])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map