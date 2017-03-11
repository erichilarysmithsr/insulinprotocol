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
import { Location } from '@angular/common';
import { PatientProvider } from './patient-provider.service';
import { Form } from './form';
import { Server } from './server.service';
import { DialogService } from './dialog.service';
var FormComponent = (function () {
    function FormComponent(pp, router, route, location, server, dialog) {
        this.pp = pp;
        this.router = router;
        this.route = route;
        this.location = location;
        this.server = server;
        this.dialog = dialog;
        this.form = new Form();
    }
    FormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.patientId = +this.route.snapshot.params['id'];
        if (!this.patientId)
            return;
        this.pp.getPatient(this.patientId).subscribe(function () { return _this.type = _this.pp.patient.profile.insulinDeliveryType; });
    };
    FormComponent.prototype.saveForm = function () {
        var _this = this;
        this.form.patientId = this.patientId;
        this.form.type = this.type;
        this.server.saveForm(this.form).subscribe(function (rs) {
            if (rs == 'success') {
                var diag = _this.dialog.show('Saved', 'The form submitted has been successfully saved.', [], 'Close');
                diag.afterClosed().subscribe(function () { return _this.router.navigate(['patient-list']); });
            }
            else {
                _this.form = new Form();
                _this.form.data.dosageType = rs.dosageType;
                _this.form.data.parentId = rs.id;
                _this.type = _this.type + 'Dose';
                _this.recommendation = rs;
            }
        }, function (e) { return _this.error = e; });
    };
    FormComponent.prototype.goBack = function () {
        this.router.navigate(['patient-list']);
    };
    FormComponent.prototype.changeProfile = function () {
        this.router.navigate(['patient', this.patientId]);
    };
    return FormComponent;
}());
FormComponent = __decorate([
    Component({
        moduleId: module.id,
        templateUrl: 'form.component.html'
    }),
    __metadata("design:paramtypes", [PatientProvider, Router, ActivatedRoute, Location, Server, DialogService])
], FormComponent);
export { FormComponent };
//# sourceMappingURL=form.component.js.map