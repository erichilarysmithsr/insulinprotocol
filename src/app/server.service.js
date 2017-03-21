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
const http_1 = require("@angular/http");
const Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/from");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/retryWhen");
require("rxjs/add/operator/scan");
require("rxjs/add/operator/delay");
const auth_service_1 = require("./auth.service");
const dialog_service_1 = require("./dialog.service");
const app_settings_1 = require("./app-settings");
let Server = class Server {
    constructor(http, authService, dialogService) {
        this.http = http;
        this.authService = authService;
        this.dialogService = dialogService;
        this.dataUrl = app_settings_1.AppSettings.apiEndpoint;
    }
    getPatients(uhid) {
        return this.http.post(this.dataUrl + 'getPatients', uhid).map((res) => this.parseBody(res)).retryWhen((e) => this.retryRequest(e)).catch(this.handleError);
    }
    getProfile(id) {
        return this.http.post(this.dataUrl + 'getProfile', id).map((res) => this.parseBody(res)).retryWhen((e) => this.retryRequest(e)).catch(this.handleError);
    }
    savePatient(patient) {
        return this.http.post(this.dataUrl + 'savePatient', patient).map(res => this.parseBody(res)).retryWhen((e) => this.retryRequest(e)).catch(this.handleError);
    }
    saveForm(form) {
        return this.http.post(this.dataUrl + 'saveForm', form).map(res => this.parseBody(res)).retryWhen((e) => this.retryRequest(e)).catch(this.handleError);
    }
    getForms(patientid) {
        return this.http.post(this.dataUrl + 'getForms', patientid).map(res => this.parseBody(res)).retryWhen((e) => this.retryRequest(e)).catch(this.handleError);
    }
    getProtocol(type) {
        return this.http.post(this.dataUrl + 'getProtocol', type).map(res => this.parseBody(res)).retryWhen((e) => this.retryRequest(e)).catch(this.handleError);
    }
    saveProtocol(protocol) {
        return this.http.post(this.dataUrl + 'saveProtocol', protocol).map(res => this.parseBody(res)).retryWhen((e) => this.retryRequest(e)).catch(this.handleError);
    }
    validateProtocol(patient, forms) {
        return this.http.post(this.dataUrl + 'validateProtocol', { patient: patient, forms: forms }).map(res => this.parseBody(res)).retryWhen((e) => this.retryRequest(e)).catch(this.handleError);
    }
    getUserProfile() {
        return this.http.get(this.dataUrl + 'getUserProfile').map(res => this.parseBody(res)).retryWhen((e) => this.retryRequest(e)).do(user => this.authService.user = user).catch(this.handleError);
    }
    getTransactions() {
        return this.http.get(this.dataUrl + 'getTransactions').map(res => this.parseBody(res)).retryWhen((e) => this.retryRequest(e)).catch(this.handleError);
    }
    retryRequest(error) {
        return error.scan((count, e, index) => {
            if (e != 'Auth Fail' || index == 1)
                throw e;
            return;
        }, 0).delay(1000).switchMap(() => Observable_1.Observable.from(this.authService.reload()));
    }
    parseBody(res) {
        if (res.text() == 'fail')
            throw "Server Internal Error";
        if (res.text() == 'authFail') {
            throw "Auth Fail";
        }
        return res.text() == 'success' ? 'success' : (res.json() || {});
    }
    handleError(error) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg;
        if (error instanceof http_1.Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log('server error', errMsg);
        return Observable_1.Observable.throw(errMsg);
    }
};
Server = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, auth_service_1.AuthService, dialog_service_1.DialogService])
], Server);
exports.Server = Server;
//# sourceMappingURL=server.service.js.map