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
var common_1 = require("@angular/common");
var patient_provider_service_1 = require("./patient-provider.service");
var form_1 = require("./form");
var server_service_1 = require("./server.service");
var dialog_service_1 = require("./dialog.service");
var FormComponent = (function () {
    function FormComponent(pp, router, route, location, server, dialog) {
        this.pp = pp;
        this.router = router;
        this.route = route;
        this.location = location;
        this.server = server;
        this.dialog = dialog;
        this.form = new form_1.Form();
        this.data = {};
    }
    FormComponent.prototype.ngOnInit = function () {
        this.patientId = +this.route.snapshot.params['id'];
        if (!this.patientId)
            return;
        this.pp.getPatient(this.patientId).subscribe();
        this.type = this.route.snapshot.params['type'];
    };
    FormComponent.prototype.saveForm = function () {
        var _this = this;
        this.form.patientId = this.patientId;
        this.form.type = this.type;
        this.server.saveForm(this.form).subscribe(function () {
            var diag = _this.dialog.show('Saved', 'The form submitted has been successfully saved.', [], 'Close');
            diag.afterClosed().subscribe(function () { return _this.router.navigate(['patient-list']); });
        });
    };
    FormComponent.prototype.goBack = function () {
        this.router.navigate(['patient-list']);
    };
    return FormComponent;
}());
FormComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'form.component.html'
    }),
    __metadata("design:paramtypes", [patient_provider_service_1.PatientProvider, router_1.Router, router_1.ActivatedRoute, common_1.Location, server_service_1.Server, dialog_service_1.DialogService])
], FormComponent);
exports.FormComponent = FormComponent;
//# sourceMappingURL=form.component.js.map