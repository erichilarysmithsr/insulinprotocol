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
var PatientProfileComponent = (function () {
    function PatientProfileComponent(pp, router, route, location) {
        this.pp = pp;
        this.router = router;
        this.route = route;
        this.location = location;
    }
    PatientProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = +this.route.snapshot.params['id'];
        this.pp.getPatient(id).subscribe(function () {
            var uhid = _this.route.snapshot.queryParams['uhid'];
            if (uhid)
                _this.pp.patient.uhid = uhid;
        }, function (error) { return _this.error = error; });
    };
    PatientProfileComponent.prototype.saveProfile = function () {
        var _this = this;
        this.pp.savePatient().subscribe(function (patient) { _this.router.navigate(['patient-list']); }, function (error) { return _this.error = error; });
    };
    PatientProfileComponent.prototype.goBack = function () {
        this.router.navigate(['patient-list']);
    };
    return PatientProfileComponent;
}());
PatientProfileComponent = __decorate([
    Component({
        moduleId: module.id,
        templateUrl: 'patient-profile.component.html'
    }),
    __metadata("design:paramtypes", [PatientProvider, Router, ActivatedRoute, Location])
], PatientProfileComponent);
export { PatientProfileComponent };
//# sourceMappingURL=patient-profile.component.js.map