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
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import { AuthService } from './auth.service';
import { DialogService } from './dialog.service';
import { AppSettings } from './app-settings';
let Server = class Server {
    constructor(http, authService, dialogService) {
        this.http = http;
        this.authService = authService;
        this.dialogService = dialogService;
        this.dataUrl = AppSettings.apiEndpoint;
    }
    getPatients(uhid) {
        return this.http.post(this.dataUrl + 'getPatients', uhid).map((res) => this.parseBody(res)).catch(this.handleError);
    }
    getProfile(id) {
        return this.http.post(this.dataUrl + 'getProfile', id).map((res) => this.parseBody(res)).catch(this.handleError);
    }
    savePatient(patient) {
        return this.http.post(this.dataUrl + 'savePatient', patient).map(res => this.parseBody(res)).catch(this.handleError);
    }
    saveForm(form) {
        return this.http.post(this.dataUrl + 'saveForm', form).map(res => this.parseBody(res)).catch(this.handleError);
    }
    getForms(patientid) {
        return this.http.post(this.dataUrl + 'getForms', patientid).map(res => this.parseBody(res)).catch(this.handleError);
    }
    getProtocol(type) {
        return this.http.post(this.dataUrl + 'getProtocol', type).map(res => this.parseBody(res)).catch(this.handleError);
    }
    saveProtocol(protocol) {
        return this.http.post(this.dataUrl + 'saveProtocol', protocol).map(res => this.parseBody(res)).catch(this.handleError);
    }
    validateProtocol(patient, forms) {
        return this.http.post(this.dataUrl + 'validateProtocol', { patient: patient, forms: forms }).map(res => this.parseBody(res)).catch(this.handleError);
    }
    getUserProfile() {
        return this.http.post(this.dataUrl + 'getUserProfile', '').map(res => this.parseBody(res)).do(user => this.authService.user = user).catch(this.handleError);
    }
    parseBody(res) {
        if (res.text() == 'fail')
            throw "Server Internal Error";
        if (res.text() == 'authFail') {
            this.authService.reload();
            throw "Auth Fail";
        }
        return res.text() == 'success' ? 'success' : (res.json() || {});
    }
    handleError(error) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log('server error', errMsg);
        return Observable.throw(errMsg);
    }
};
Server = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, AuthService, DialogService])
], Server);
export { Server };
//# sourceMappingURL=server.service.js.map