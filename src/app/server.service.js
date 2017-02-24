var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';
import { Patient } from './patient';
export var Server = (function () {
    function Server() {
        this.temppatients = [];
        this.withProfile = { id: 0, name: 'Patient', uhid: 'MM00449713', dob: '19/09/1986', bednum: '0909', profile: { weight: 100, diabetes: 'Yes' } };
        this.formsStore = [{ patientId: 3, type: 'infusion', dt: new Date(), savedBy: { id: 1, name: 'Pravin' }, values: { currentRate: 4, modifiedRate: 5, plasmaGlucose: 180 } }];
        for (var i = 0; i < 20; i++) {
            var n = new Patient();
            n.id = (i + 3);
            n.uhid = 'MM004497' + (i + 6);
            n.name = 'Patient ' + (i + 3);
            this.temppatients.push(n);
        }
    }
    Server.prototype.getPatients = function (uhid) {
        if (uhid) {
            var p = this.temppatients.find(function (pat) { return pat.uhid.toString().toLowerCase() == uhid.toString().toLowerCase(); });
            return Observable.from(p ? [[p]] : [[]]);
        }
        else
            return Observable.from([this.temppatients]);
    };
    Server.prototype.getProfile = function (id) {
        var p = this.temppatients.find(function (p) { return p.id == id; }) || new Patient();
        return Observable.from([p]);
    };
    Server.prototype.savePatient = function (patient) {
        if (!patient.id) {
            patient.id = Math.round(Math.random() * 100);
            this.temppatients.push(patient);
        }
        return Observable.from([patient]);
    };
    Server.prototype.saveForm = function (form) {
        form.dt = new Date();
        this.formsStore.push(form);
        return Observable.of('success');
    };
    Server.prototype.getForms = function (id) {
        return Observable.from([this.formsStore.filter(function (form) { return form.patientId == id; })]);
    };
    Server.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    };
    Server = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [])
    ], Server);
    return Server;
}());
//# sourceMappingURL=server.service.js.map