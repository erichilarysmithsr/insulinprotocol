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
const auth_service_1 = require("./auth.service");
const server_service_1 = require("./server.service");
require("rxjs/operator/switchMap");
require("rxjs/operator/filter");
let LoginComponent = class LoginComponent {
    constructor(authService, router, route, server) {
        this.authService = authService;
        this.router = router;
        this.route = route;
        this.server = server;
    }
    ngOnInit() {
        this.route.url.filter(url => url.find(urlSeg => urlSeg.path === 'logout') ? true : false).subscribe(params => {
            this.authService.signOut().then(() => this.router.navigate(['login']), (e) => { console.log(e); this.router.navigate(['login']); });
        });
        this.route.url.filter(url => url.find(urlSeg => urlSeg.path === 'login') ? true : false).switchMap(() => this.authService.checkLogin()).switchMap(() => this.server.getUserProfile()).subscribe((user) => {
            if (user.role)
                this.router.navigate(['patient-list']);
            else
                this.router.navigate(['patient-list']); //add the account type choosing screen here
        });
    }
    signIn() {
        this.authService.signIn();
    }
};
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'login.component.html'
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router, router_1.ActivatedRoute, server_service_1.Server])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map