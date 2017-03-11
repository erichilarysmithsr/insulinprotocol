var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { MdDialogModule } from '@angular/material';
import { AppComponent } from './app.component';
import { PatientListComponent } from './patient-list.component';
import { PatientComponent } from './patient.component';
import { PatientProfileComponent } from './patient-profile.component';
import { FormComponent } from './form.component';
import { FormsListComponent } from './forms-list.component';
import { ManageProtocolComponent } from './manage-protocol.component';
import { ValidateProtocolComponent } from './validate-protocol.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { DialogComponent } from './dialog.component';
import { Server } from './server.service';
import { DialogService } from './dialog.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
export function authHttpServiceFactory(http, options) {
    return new AuthHttp(new AuthConfig({
        tokenName: 'token',
        tokenGetter: (function () { return localStorage.getItem('id_token'); }),
        globalHeaders: [],
    }), http, options);
}
var appRoutes = [
    { path: '', pathMatch: 'full', redirectTo: '/patient-list' },
    { path: 'patient-list', component: PatientListComponent },
    {
        path: 'patient', component: PatientComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: '0/profile' },
            { path: ':id', pathMatch: 'full', redirectTo: ':id/profile' },
            { path: ':id/profile', component: PatientProfileComponent },
            { path: ':id/forms-list', component: FormsListComponent },
            { path: ':id/form', component: FormComponent },
            { path: ':id/form/:type', component: FormComponent },
            { path: '**', component: PageNotFoundComponent }
        ],
        canActivate: [AuthGuard]
    },
    { path: 'manage-protocol', component: ManageProtocolComponent },
    { path: 'validate-protocol', component: ValidateProtocolComponent },
    { path: '**', component: PageNotFoundComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes), MaterialModule.forRoot(), MdDialogModule.forRoot()],
        declarations: [AppComponent, PatientListComponent, PatientProfileComponent, PageNotFoundComponent, FormComponent, PatientComponent, DialogComponent, FormsListComponent, ManageProtocolComponent, ValidateProtocolComponent],
        providers: [Server, DialogService, AuthGuard, AuthService, {
                provide: AuthHttp,
                useFactory: authHttpServiceFactory,
                deps: [Http, RequestOptions]
            }],
        bootstrap: [AppComponent],
        entryComponents: [DialogComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map