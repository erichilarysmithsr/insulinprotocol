var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientProvider } from './patient-provider.service';
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
    Component({
        moduleId: module.id,
        template: `
		<md-toolbar color="primary">
			<i class="material-icons" (click)="goBack()">arrow_back</i>
			<span>{{pp.patient.id?pp.patient.name:'New Patient'}}</span>
		</md-toolbar>
		<router-outlet></router-outlet>
	`,
        providers: [PatientProvider]
    }),
    __metadata("design:paramtypes", [PatientProvider, ActivatedRoute, Router])
], PatientComponent);
export { PatientComponent };
//# sourceMappingURL=patient.component.js.map