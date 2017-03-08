"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var app_component_1 = require("./app.component");
var patient_list_component_1 = require("./patient-list.component");
var patient_component_1 = require("./patient.component");
var patient_profile_component_1 = require("./patient-profile.component");
var form_component_1 = require("./form.component");
var forms_list_component_1 = require("./forms-list.component");
var manage_protocol_component_1 = require("./manage-protocol.component");
var page_not_found_component_1 = require("./page-not-found.component");
var dialog_component_1 = require("./dialog.component");
var server_service_1 = require("./server.service");
var dialog_service_1 = require("./dialog.service");
var appRoutes = [
    { path: '', pathMatch: 'full', redirectTo: '/patient-list' },
    { path: 'patient-list', component: patient_list_component_1.PatientListComponent },
    {
        path: 'patient', component: patient_component_1.PatientComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: '0/profile' },
            { path: ':id', pathMatch: 'full', redirectTo: ':id/profile' },
            { path: ':id/profile', component: patient_profile_component_1.PatientProfileComponent },
            { path: ':id/forms-list', component: forms_list_component_1.FormsListComponent },
            { path: ':id/form/:type', component: form_component_1.FormComponent },
            { path: '**', component: page_not_found_component_1.PageNotFoundComponent }
        ]
    },
    { path: 'manage-protocol', component: manage_protocol_component_1.ManageProtocolComponent },
    { path: '**', component: page_not_found_component_1.PageNotFoundComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, router_1.RouterModule.forRoot(appRoutes), material_1.MaterialModule.forRoot(), material_2.MdDialogModule.forRoot()],
        declarations: [app_component_1.AppComponent, patient_list_component_1.PatientListComponent, patient_profile_component_1.PatientProfileComponent, page_not_found_component_1.PageNotFoundComponent, form_component_1.FormComponent, patient_component_1.PatientComponent, dialog_component_1.DialogComponent, forms_list_component_1.FormsListComponent, manage_protocol_component_1.ManageProtocolComponent],
        providers: [server_service_1.Server, dialog_service_1.DialogService],
        bootstrap: [app_component_1.AppComponent],
        entryComponents: [dialog_component_1.DialogComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map