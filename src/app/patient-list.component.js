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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var server_service_1 = require("./server.service");
var PatientListComponent = (function () {
    function PatientListComponent(server, router) {
        this.server = server;
        this.router = router;
    }
    PatientListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.server.getPatients().subscribe(function (patients) { return _this.patients = patients; }, function (error) { return _this.error = error; });
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
        this.router.navigate(['patient', id, 'form', type]);
    };
    PatientListComponent.prototype.formsList = function (id) {
        this.router.navigate(['patient', id, 'forms-list']);
    };
    return PatientListComponent;
}());
PatientListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'patient-list.component.html',
        selector: 'patient-list',
        styleUrls: ['patient-list.component.css']
    }),
    __metadata("design:paramtypes", [server_service_1.Server, router_1.Router])
], PatientListComponent);
exports.PatientListComponent = PatientListComponent;
//# sourceMappingURL=patient-list.component.js.map