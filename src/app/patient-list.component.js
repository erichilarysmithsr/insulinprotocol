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
import { Router } from '@angular/router';
import { Server } from './server.service';
import { AuthService } from './auth.service';
var PatientListComponent = (function () {
    function PatientListComponent(server, router, authService) {
        this.server = server;
        this.router = router;
        this.authService = authService;
    }
    PatientListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.login().then(function () { return _this.server.getPatients().subscribe(function (patients) { return _this.patients = patients; }, function (error) { return _this.error = error; }); });
    };
    PatientListComponent.prototype.onSearch = function (search) {
        var _this = this;
        this.server.getPatients(search).subscribe(function (patients) { return _this.patients = patients; }, function (error) { return _this.error = error; });
    };
    PatientListComponent.prototype.editPatient = function (id) {
        this.router.navigate(['patient', id, 'profile']);
    };
    PatientListComponent.prototype.newPatient = function (uhid) {
        this.router.navigate(['patient', 0, 'profile'], { queryParams: { "uhid": uhid } });
    };
    PatientListComponent.prototype.showForm = function (id, type) {
        if (!id)
            return;
        this.router.navigate(['patient', id, 'form']);
    };
    PatientListComponent.prototype.formsList = function (id) {
        this.router.navigate(['patient', id, 'forms-list']);
    };
    return PatientListComponent;
}());
PatientListComponent = __decorate([
    Component({
        moduleId: module.id,
        templateUrl: 'patient-list.component.html',
        selector: 'patient-list',
        styleUrls: ['patient-list.component.css']
    }),
    __metadata("design:paramtypes", [Server, Router, AuthService])
], PatientListComponent);
export { PatientListComponent };
//# sourceMappingURL=patient-list.component.js.map