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
var patient_provider_service_1 = require("./patient-provider.service");
var server_service_1 = require("./server.service");
var FormsListComponent = (function () {
    function FormsListComponent(pp, route, server) {
        this.pp = pp;
        this.route = route;
        this.server = server;
        this.forms = { infusion: [], subcutaneous: [] };
    }
    FormsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = +this.route.snapshot.params['id'];
        this.pp.getPatient(id).subscribe(function () { }, function (error) { return _this.error = error; });
        this.server.getForms(id).subscribe(function (forms) { forms.forEach(function (form) { return _this.forms[form.type].push(form); }); }, function (error) { return _this.error = error; });
    };
    return FormsListComponent;
}());
FormsListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'forms-list.component.html'
    }),
    __metadata("design:paramtypes", [patient_provider_service_1.PatientProvider, router_1.ActivatedRoute, server_service_1.Server])
], FormsListComponent);
exports.FormsListComponent = FormsListComponent;
//# sourceMappingURL=forms-list.component.js.map