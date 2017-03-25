import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { MdDialogModule } from '@angular/material';

import { AppComponent }  from './app.component';
import { PatientListComponent } from './patient-list.component';
import { PatientComponent } from './patient.component';


import { PatientProfileComponent } from './patient-profile.component';
import { FormComponent } from './form.component';
import { FormsListComponent } from './forms-list.component';
import { ManageProtocolComponent } from './manage-protocol.component';
import { ValidateProtocolComponent } from './validate-protocol.component';

import { PageNotFoundComponent } from './page-not-found.component';
import { DialogComponent } from './dialog.component';
import { LoginComponent } from './login.component';

import { Server } from './server.service';
import { DialogService } from './dialog.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { PatientProvider } from './patient-provider.service';

import { Http, RequestOptions } from '@angular/http';
	
const appRoutes: Routes=[
	{path:'login',component:LoginComponent},
	{path:'logout',component:LoginComponent},
	{path:'',pathMatch:'full',redirectTo:'/patient-list'},
	{path:'patient-list',component:PatientListComponent,canActivate:[AuthGuard]},
	{
		path:'patient',component:PatientComponent,
		children:[
			{path:'',pathMatch:'full',redirectTo:'0/profile'},
			{path:':id',pathMatch:'full',redirectTo:':id/profile'},
			{path:':id/profile',component:PatientProfileComponent},
			{path:':id/forms-list',component:FormsListComponent},
			{path:':id/form',component:FormComponent},
			{path:':id/form/:type',component:FormComponent},
			{path:'**',component:PageNotFoundComponent}
		]
		,canActivate:[AuthGuard]
	},
	{path:'transactions',component:FormsListComponent,canActivate:[AuthGuard]},
	{path:'manage-protocol',component:ManageProtocolComponent,canActivate:[AuthGuard]},
	{path:'validate-protocol',component:ValidateProtocolComponent,canActivate:[AuthGuard]},
	{ path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports:      [ BrowserModule,FormsModule,RouterModule.forRoot(appRoutes),MaterialModule.forRoot(),MdDialogModule.forRoot() ],
  declarations: [ AppComponent,PatientListComponent,PatientProfileComponent,PageNotFoundComponent,FormComponent,PatientComponent,DialogComponent,FormsListComponent,ManageProtocolComponent,ValidateProtocolComponent,LoginComponent ],
  providers: [ Server,PatientProvider,DialogService,AuthService,AuthGuard ],
  bootstrap:    [ AppComponent ],
  entryComponents:[DialogComponent]
})
export class AppModule { }