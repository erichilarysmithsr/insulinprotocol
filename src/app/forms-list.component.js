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
import { ActivatedRoute } from '@angular/router';
import { PatientProvider } from './patient-provider.service';
import { Server } from './server.service';
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
    Component({
        moduleId: module.id,
        templateUrl: 'forms-list.component.html'
    }),
    __metadata("design:paramtypes", [PatientProvider, ActivatedRoute, Server])
], FormsListComponent);
export { FormsListComponent };
//# sourceMappingURL=forms-list.component.js.map