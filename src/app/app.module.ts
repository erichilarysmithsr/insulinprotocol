import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { MdDialogModule } from '@angular/material';

import { AppComponent }  from './app.component';
import { PatientListComponent } from './patient-list.component';
import { PatientComponent } from './patient.component';
import { DialogDisplay } from './dialog.component';

import { PatientProfileComponent } from './patient-profile.component';
import { FormComponent } from './form.component';
import { FormsListComponent } from './forms-list.component';

import { PageNotFoundComponent } from './page-not-found.component';

import { Server } from './server.service';

const appRoutes: Routes=[
	{path:'',pathMatch:'full',redirectTo:'/patient-list'},
	{path:'patient-list',component:PatientListComponent},
	{
		path:'patient',component:PatientComponent,
		children:[
			{path:'',pathMatch:'full',redirectTo:'0/profile'},
			{path:':id',pathMatch:'full',redirectTo:':id/profile'},
			{path:':id/profile',component:PatientProfileComponent},
			{path:':id/forms-list',component:FormsListComponent},
			{path:':id/form/:type',component:FormComponent},
			{path:'**',component:PageNotFoundComponent}
		]
	},
	{ path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports:      [ BrowserModule,FormsModule,RouterModule.forRoot(appRoutes),MaterialModule.forRoot(),MdDialogModule.forRoot()],
  declarations: [ AppComponent,PatientListComponent,PatientProfileComponent,PageNotFoundComponent,FormComponent,PatientComponent,DialogDisplay,FormsListComponent ],
  providers: [ Server ],
  bootstrap:    [ AppComponent ],
  entryComponents:[DialogDisplay]
})
export class AppModule { }
