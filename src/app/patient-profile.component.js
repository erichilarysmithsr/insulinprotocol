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
const common_1 = require("@angular/common");
const patient_provider_service_1 = require("./patient-provider.service");
const server_service_1 = require("./server.service");
const app_settings_1 = require("./app-settings");
let PatientProfileComponent = class PatientProfileComponent {
    constructor(pp, router, route, location, server) {
        this.pp = pp;
        this.router = router;
        this.route = route;
        this.location = location;
        this.server = server;
    }
    getOptions(type) {
        let conf = app_settings_1.AppSettings[type];
        return conf.filter((r) => r.k.match(/col/));
    }
    ngOnInit() {
        let id = +this.route.snapshot.params['id'];
        this.pp.getPatient(id);
    }
    saveProfile() {
        this.server.busy = this.pp.savePatient().subscribe(patient => { this.router.navigate(['patient-list']); }, error => this.error = error);
    }
    goBack() {
        this.router.navigate(['patient-list']);
    }
};
PatientProfileComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'patient-profile.component.html'
    }),
    __metadata("design:paramtypes", [patient_provider_service_1.PatientProvider, router_1.Router, router_1.ActivatedRoute, common_1.Location, server_service_1.Server])
], PatientProfileComponent);
exports.PatientProfileComponent = PatientProfileComponent;
//# sourceMappingURL=patient-profile.component.js.map