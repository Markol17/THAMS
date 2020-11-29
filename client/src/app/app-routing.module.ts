import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmitpatientComponent } from './admitpatient/admitpatient.component';
import {ConsultpatientComponent } from './consultpatient/consultpatient.component'
import { DivisionComponent } from './division/division.component';
import { RegisterpatientComponent } from './registerpatient/registerpatient.component';
import { RequestpatientComponent } from './requestpatient/requestpatient.component';


const routes: Routes = [
  { path: 'app-consultpatient', component: ConsultpatientComponent },
  { path: 'app-registerpatient', component: RegisterpatientComponent },
  { path: 'app-requestpatient', component: RequestpatientComponent },
  { path: 'app-admitpatient', component: AdmitpatientComponent },
  { path: 'app-division', component: DivisionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
