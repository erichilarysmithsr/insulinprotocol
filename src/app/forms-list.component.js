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
import { Router, ActivatedRoute } from '@angular/router';
import { PatientProvider } from './patient-provider.service';
import { Server } from './server.service';
let FormsListComponent = class FormsListComponent {
    constructor(pp, route, router, server) {
        this.pp = pp;
        this.route = route;
        this.router = router;
        this.server = server;
        this.forms = [];
    }
    ngOnInit() {
        this.route.params.switchMap(params => this.pp.getPatient(+params['id'])).subscribe(() => { }, e => this.error = e);
        this.route.params.switchMap(params => this.server.getForms(+params['id'])).subscribe(forms => this.processForms(forms), e => this.error = e);
    }
    goBack() {
        this.router.navigate(['patient-list']);
    }
    processForms(forms) {
        let h = {};
        for (var i = 0; i < forms.length; i++) {
            let f = forms[i], parentId = f.data.parentId;
            if (parentId && h[parentId]) {
                if (f.data.dose)
                    h[parentId].data.dose = f.data.dose;
                if (f.data.insulinDose)
                    h[parentId].data.insulinDose = f.data.insulinDose;
            }
            else
                h[f.id] = f;
        }
        for (var t in h)
            this.forms.push(h[t]);
        this.forms.reverse();
    }
};
FormsListComponent = __decorate([
    Component({
        moduleId: module.id,
        templateUrl: 'forms-list.component.html'
    }),
    __metadata("design:paramtypes", [PatientProvider, ActivatedRoute, Router, Server])
], FormsListComponent);
export { FormsListComponent };
//# sourceMappingURL=forms-list.component.js.map