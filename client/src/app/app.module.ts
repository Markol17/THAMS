import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ConsultpatientComponent } from './consultpatient/consultpatient.component';
import { RequestpatientComponent } from './requestpatient/requestpatient.component';
import { DivisionComponent } from './division/division.component';
import { AdmitpatientComponent } from './admitpatient/admitpatient.component';
import { LoginpageComponent } from './loginpage/loginpage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConsultpatientComponent,
    RequestpatientComponent,
    DivisionComponent,
    AdmitpatientComponent,
    LoginpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
