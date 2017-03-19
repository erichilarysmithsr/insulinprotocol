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
import { Location } from '@angular/common';
import { PatientProvider } from './patient-provider.service';
import { AppSettings } from './app-settings';
let PatientProfileComponent = class PatientProfileComponent {
    constructor(pp, router, route, location) {
        this.pp = pp;
        this.router = router;
        this.route = route;
        this.location = location;
    }
    getOptions(type) {
        let conf = AppSettings[type];
        return conf.filter((r) => r.k.match(/col/));
    }
    ngOnInit() {
        let id = +this.route.snapshot.params['id'];
        this.pp.getPatient(id).subscribe(() => {
            let uhid = this.route.snapshot.queryParams['uhid'];
            if (uhid)
                this.pp.patient.uhid = uhid;
        }, error => this.error = error);
    }
    saveProfile() {
        this.pp.savePatient().subscribe(patient => { this.router.navigate(['patient-list']); }, error => this.error = error);
    }
    goBack() {
        this.router.navigate(['patient-list']);
    }
};
PatientProfileComponent = __decorate([
    Component({
        moduleId: module.id,
        templateUrl: 'patient-profile.component.html'
    }),
    __metadata("design:paramtypes", [PatientProvider, Router, ActivatedRoute, Location])
], PatientProfileComponent);
export { PatientProfileComponent };
//# sourceMappingURL=patient-profile.component.js.map