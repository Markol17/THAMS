import { variable } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { StaffMember } from "../objects/staff-member.model";
import { Patient } from "../objects/patient.model";
import { registerStaff, registerPatient, loginStaff, logout } from "../gql/mutation";
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Router } from '@angular/router';
import { CustomMessageService } from './message.service';
import { PatientService } from './patient.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private patientservice: PatientService,private apollo: Apollo, private router: Router, private customMessageService:CustomMessageService) { }

  private currentPatient: Patient;
  private currentUser: StaffMember;
  isLoggedIn: boolean = false;
  role: string;

  logStatus(): boolean {
    return this.isLoggedIn;
  }

  getRole(): string {
    return this.currentUser.type;
  }

  getName(): string {
    return this.currentUser.firstName;
  }

  registerStaff(staff: StaffMember): void {
    this.apollo.mutate({
      mutation: registerStaff,
      variables: {
        staff: staff
      }
    }).subscribe({
      next: data => {
        const x = data.data['registerStaff'];
        let jsonObj: any = JSON.parse(JSON.stringify(x['staffMember']))
        this.currentUser = <StaffMember>jsonObj;
   
      },
      error: err => {console.error('Error Registering: ' + err);
      this.customMessageService.setError("There was an error registering");},
      complete: () => {
        if (this.currentUser) {
          this.customMessageService.setSuccess("Hello "+this.currentUser.firstName);
          this.isLoggedIn = true;
          this.patientservice.reload();
          this.router.navigate(['home']);
        }
        else {
        this.customMessageService.setError("There was and error registering");

        }
      },


    });
  }
  
  registerPatient(patient: Patient): void {
    this.apollo.mutate({
      mutation: registerPatient,
      variables: {
        patient: patient
      }
    }).subscribe({
      next: data => {
   
        this.currentPatient = null;
        const x = data.data['registerPatient'];
        let jsonObj: any = JSON.parse(JSON.stringify(x['patient']))
        this.currentPatient = <Patient>jsonObj;
 
      },
      error: err => {
        console.error('Error Registering Patient: ' + err);
        this.customMessageService.setError(err);
      },
      complete: () => {
        if (this.currentPatient) {
  
          this.customMessageService.setSuccess(this.currentPatient.firstName+ " " +this.currentPatient.lastName + " has been register "+ " with id :"+ this.currentPatient.id);
          this.router.navigate(['app-consultpatient']);
        }
        else {
          this.customMessageService.setError("Register patient failed");

        }

      },
    });
  }

  loginStaff(email: String, password: String): void {

    this.apollo.mutate({
      mutation: loginStaff,
      variables: {
        username: email,
        password: password
      }
      
    }).subscribe({
      next: data => {
        const x = data.data['loginStaff'];
        let jsonObj: any = JSON.parse(JSON.stringify(x['staffMember']))
        this.currentUser = <StaffMember>jsonObj;

      },
      error: err => { console.error('Error logging in: ' + err);
     this.customMessageService.setError("There was an error logging in");
    },
      complete: () => {
        if (this.currentUser) {
   
          this.customMessageService.setSuccess("Hello "+this.currentUser.firstName);
          this.isLoggedIn = true;
          this.router.navigate(['home']);

        }
        else {
        this.customMessageService.setError("There was and error logging in");
  

        }

      },


    });


  };



  logout(): void {
    this.apollo.mutate({
      mutation: logout
    }).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {console.error('Error Logging out: ' + err);
      this.customMessageService.setError("There was an error logging out");},
      complete: () => {
        console.log("Logged out");
        this.apollo.client.resetStore();
        this.isLoggedIn = false;
        this.role = null;
      },

    });
  };

}
