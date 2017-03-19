var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//This service is a caching method to allow multiple components to use the same patient without requesting each time
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Server } from './server.service';
import { Patient } from './patient';
let PatientProvider = class PatientProvider {
    constructor(server) {
        this.server = server;
        this.patient = new Patient();
    }
    ;
    getPatient(id) {
        if (this.patient && this.patient.id == id)
            return Observable.from([this.patient]);
        else
            return this.server.getProfile(id).do(patient => { this.patient = patient; });
    }
    savePatient() {
        return this.server.savePatient(this.patient);
    }
};
PatientProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Server])
], PatientProvider);
export { PatientProvider };
//# sourceMappingURL=patient-provider.service.js.map