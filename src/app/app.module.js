var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
import { DialogDisplay } from './dialog.component';
import { PatientProfileComponent } from './patient-profile.component';
import { FormComponent } from './form.component';
import { FormsListComponent } from './forms-list.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { Server } from './server.service';
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
            { path: ':id/form/:type', component: FormComponent },
            { path: '**', component: PageNotFoundComponent }
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes), MaterialModule.forRoot(), MdDialogModule.forRoot()],
            declarations: [AppComponent, PatientListComponent, PatientProfileComponent, PageNotFoundComponent, FormComponent, PatientComponent, DialogDisplay, FormsListComponent],
            providers: [Server],
            bootstrap: [AppComponent],
            entryComponents: [DialogDisplay]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map