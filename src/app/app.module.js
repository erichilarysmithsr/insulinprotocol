"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
const material_1 = require("@angular/material");
const material_2 = require("@angular/material");
const app_component_1 = require("./app.component");
const patient_list_component_1 = require("./patient-list.component");
const patient_component_1 = require("./patient.component");
const patient_profile_component_1 = require("./patient-profile.component");
const form_component_1 = require("./form.component");
const forms_list_component_1 = require("./forms-list.component");
const manage_protocol_component_1 = require("./manage-protocol.component");
const validate_protocol_component_1 = require("./validate-protocol.component");
const page_not_found_component_1 = require("./page-not-found.component");
const dialog_component_1 = require("./dialog.component");
const login_component_1 = require("./login.component");
const server_service_1 = require("./server.service");
const dialog_service_1 = require("./dialog.service");
const auth_service_1 = require("./auth.service");
const auth_guard_service_1 = require("./auth-guard.service");
const patient_provider_service_1 = require("./patient-provider.service");
const appRoutes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'logout', component: login_component_1.LoginComponent },
    { path: '', pathMatch: 'full', redirectTo: '/patient-list' },
    { path: 'patient-list', component: patient_list_component_1.PatientListComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    {
        path: 'patient', component: patient_component_1.PatientComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: '0/profile' },
            { path: ':id', pathMatch: 'full', redirectTo: ':id/profile' },
            { path: ':id/profile', component: patient_profile_component_1.PatientProfileComponent },
            { path: ':id/forms-list', component: forms_list_component_1.FormsListComponent },
            { path: ':id/form', component: form_component_1.FormComponent },
            { path: ':id/form/:type', component: form_component_1.FormComponent },
            { path: '**', component: page_not_found_component_1.PageNotFoundComponent }
        ],
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    { path: 'transactions', component: forms_list_component_1.FormsListComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'manage-protocol', component: manage_protocol_component_1.ManageProtocolComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'validate-protocol', component: validate_protocol_component_1.ValidateProtocolComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: '**', component: page_not_found_component_1.PageNotFoundComponent }
];
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, router_1.RouterModule.forRoot(appRoutes), material_1.MaterialModule.forRoot(), material_2.MdDialogModule.forRoot()],
        declarations: [app_component_1.AppComponent, patient_list_component_1.PatientListComponent, patient_profile_component_1.PatientProfileComponent, page_not_found_component_1.PageNotFoundComponent, form_component_1.FormComponent, patient_component_1.PatientComponent, dialog_component_1.DialogComponent, forms_list_component_1.FormsListComponent, manage_protocol_component_1.ManageProtocolComponent, validate_protocol_component_1.ValidateProtocolComponent, login_component_1.LoginComponent],
        providers: [server_service_1.Server, patient_provider_service_1.PatientProvider, dialog_service_1.DialogService, auth_service_1.AuthService, auth_guard_service_1.AuthGuard],
        bootstrap: [app_component_1.AppComponent],
        entryComponents: [dialog_component_1.DialogComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map