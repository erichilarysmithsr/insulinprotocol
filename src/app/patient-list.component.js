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
const server_service_1 = require("./server.service");
const dialog_service_1 = require("./dialog.service");
const auth_service_1 = require("./auth.service");
let PatientListComponent = class PatientListComponent {
    constructor(server, router, dialogService, authService) {
        this.server = server;
        this.router = router;
        this.dialogService = dialogService;
        this.authService = authService;
    }
    set error(error) {
        let diag = this.dialogService.show('Error', 'There has been an error in contacting the server. Please check your connection and try again.', [], 'Close');
    }
    ngOnInit() {
        this.server.getPatients().subscribe(patients => this.patients = patients, error => this.error = error);
    }
    onSearch(search) {
        this.server.getPatients(search).subscribe(patients => this.patients = patients, error => this.error = error);
    }
    editPatient(id) {
        this.router.navigate(['patient', id, 'profile']);
    }
    newPatient() {
        this.router.navigate(['patient', 0, 'profile']);
    }
    showForm(id) {
        if (!id)
            return;
        this.router.navigate(['patient', id, 'form']);
    }
    formsList(id) {
        this.router.navigate(['patient', id, 'forms-list']);
    }
    searchBack() {
        this.showSearch = false;
        this.onSearch();
    }
};
PatientListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'patient-list.component.html',
        selector: 'patient-list',
        styleUrls: ['patient-list.component.css']
    }),
    __metadata("design:paramtypes", [server_service_1.Server, router_1.Router, dialog_service_1.DialogService, auth_service_1.AuthService])
], PatientListComponent);
exports.PatientListComponent = PatientListComponent;
//# sourceMappingURL=patient-list.component.js.map