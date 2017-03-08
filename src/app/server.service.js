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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/from");
var Server = (function () {
    function Server(http) {
        var _this = this;
        this.http = http;
        this.dataUrl = '/data/';
        this.parseBody = function (res) {
            if (res.text() == 'fail')
                _this.handleError('Server Internal Error');
            return res.text() == 'success' ? 'success' : (res.json() || {});
        };
    }
    Server.prototype.getPatients = function (uhid) {
        return this.http.post(this.dataUrl + 'getPatients', uhid).map(this.parseBody).catch(this.handleError);
    };
    Server.prototype.getProfile = function (id) {
        return this.http.post(this.dataUrl + 'getProfile', id).map(this.parseBody).catch(this.handleError);
    };
    Server.prototype.savePatient = function (patient) {
        return this.http.post(this.dataUrl + 'savePatient', patient).map(this.parseBody).catch(this.handleError);
    };
    Server.prototype.saveForm = function (form) {
        return this.http.post(this.dataUrl + 'saveForm', form).map(this.parseBody).catch(this.handleError);
    };
    Server.prototype.getForms = function (patientid) {
        return this.http.post(this.dataUrl + 'getForms', patientid).map(this.parseBody).catch(this.handleError);
    };
    Server.prototype.getProtocol = function (type) {
        return this.http.post(this.dataUrl + 'getProtocol', type).map(this.parseBody).catch(this.handleError);
    };
    Server.prototype.saveProtocol = function (protocol) {
        return this.http.post(this.dataUrl + 'saveProtocol', protocol).map(this.parseBody).catch(this.handleError);
    };
    Server.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    return Server;
}());
Server = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], Server);
exports.Server = Server;
//# sourceMappingURL=server.service.js.map