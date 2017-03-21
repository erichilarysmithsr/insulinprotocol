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
const patient_provider_service_1 = require("./patient-provider.service");
let PatientComponent = class PatientComponent {
    constructor(pp, route, router) {
        this.pp = pp;
        this.route = route;
        this.router = router;
    }
    ngOnInit() {
        let id = +this.route.snapshot.params['id'];
        if (!id)
            return;
        this.pp.getPatient(id).subscribe(patient => { });
    }
    goBack() {
        this.router.navigate(['patient-list']);
    }
};
PatientComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        template: `
		<md-toolbar color="primary">
			<i class="material-icons" (click)="goBack()">arrow_back</i>
			<span>{{pp.patient.id?pp.patient.name:'New Patient'}}</span>
		</md-toolbar>
		<router-outlet></router-outlet>
	`
    }),
    __metadata("design:paramtypes", [patient_provider_service_1.PatientProvider, router_1.ActivatedRoute, router_1.Router])
], PatientComponent);
exports.PatientComponent = PatientComponent;
//# sourceMappingURL=patient.component.js.map