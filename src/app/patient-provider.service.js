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
//This service is a caching method to allow multiple components to use the same patient without requesting each time
const core_1 = require("@angular/core");
const server_service_1 = require("./server.service");
const patient_1 = require("./patient");
let PatientProvider = class PatientProvider {
    constructor(server) {
        this.server = server;
        this.patient = new patient_1.Patient();
    }
    ;
    getPatient(id) {
        if (!this.patient || this.patient.id != id)
            return new Promise((resolve, reject) => {
                this.server.busy = this.server.getProfile(id).subscribe(patient => {
                    this.patient = patient;
                    resolve();
                }, e => reject());
            });
        else
            return Promise.resolve();
    }
    savePatient() {
        return this.server.savePatient(this.patient);
    }
};
PatientProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [server_service_1.Server])
], PatientProvider);
exports.PatientProvider = PatientProvider;
//# sourceMappingURL=patient-provider.service.js.map