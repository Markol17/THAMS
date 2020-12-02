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
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { RegisterpatientComponent } from './registerpatient/registerpatient.component';
import { FormsModule } from '@angular/forms';

import {InputMaskModule} from 'primeng/inputmask';


import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {PasswordModule} from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConsultpatientComponent,
    RequestpatientComponent,
    DivisionComponent,
    AdmitpatientComponent,
    LoginpageComponent,
    HeaderComponent,
    RegisterpatientComponent
  ],
  imports: [
    InputMaskModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    InputTextModule,
    RippleModule,
    PasswordModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
