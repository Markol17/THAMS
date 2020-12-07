import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmitpatientComponent } from './admitpatient/admitpatient.component';
import {ConsultpatientComponent } from './consultpatient/consultpatient.component'
import { DivisionComponent } from './division/division.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegisterpatientComponent } from './registerpatient/registerpatient.component';
import { RequestpatientComponent } from './requestpatient/requestpatient.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard]},
  { path: 'app-consultpatient', component: ConsultpatientComponent,canActivate:[AuthGuard]},
  { path: 'app-registerpatient', component: RegisterpatientComponent,canActivate:[AuthGuard]},
  { path: 'app-requestpatient', component: RequestpatientComponent,canActivate:[AuthGuard],data:{
    role:'ChargeNurse'
  }   },
  { path: 'app-admitpatient', component: AdmitpatientComponent,canActivate:[AuthGuard],data:{
    role:'ChargeNurse'
  }   },
  { path: 'app-division', component: DivisionComponent,canActivate:[AuthGuard],data:{
    role:'ChargeNurse'
  }  },
  {path: '**', redirectTo: 'loginpage'},
  { path: '', redirectTo: 'loginpage', pathMatch: 'full'},
  {path: 'loginpage',   component: LoginpageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
