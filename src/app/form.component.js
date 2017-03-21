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
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
const patient_provider_service_1 = require("./patient-provider.service");
const form_1 = require("./form");
const server_service_1 = require("./server.service");
const dialog_service_1 = require("./dialog.service");
let FormComponent = class FormComponent {
    constructor(pp, router, route, location, server, dialogService) {
        this.pp = pp;
        this.router = router;
        this.route = route;
        this.location = location;
        this.server = server;
        this.dialogService = dialogService;
        this.form = new form_1.Form();
    }
    ngOnInit() {
        this.route.params.do(params => this.patientId = +params['id']).switchMap(params => this.pp.getPatient(+params['id'])).subscribe(() => this.type = this.pp.patient.profile.insulinDeliveryType);
    }
    saveForm() {
        this.form.patientId = this.patientId;
        this.form.type = this.type;
        this.server.saveForm(this.form).subscribe((rs) => {
            if (rs == 'success') {
                let diag = this.dialogService.show('Saved', 'The form submitted has been successfully saved.', [], 'Close');
                diag.afterClosed().subscribe(() => this.router.navigate(['patient-list']));
            }
            else {
                this.form = new form_1.Form();
                this.form.data.dosageType = rs.dosageType;
                this.form.data.parentId = rs.parentId;
                this.type = this.type + 'Dose';
                this.recommendation = rs;
            }
        }, (e) => this.error = e);
    }
    goBack() {
        this.router.navigate(['patient-list']);
    }
    changeProfile() {
        this.router.navigate(['patient', this.patientId]);
    }
};
FormComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'form.component.html'
    }),
    __metadata("design:paramtypes", [patient_provider_service_1.PatientProvider, router_1.Router, router_1.ActivatedRoute, common_1.Location, server_service_1.Server, dialog_service_1.DialogService])
], FormComponent);
exports.FormComponent = FormComponent;
//# sourceMappingURL=form.component.js.map