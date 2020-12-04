import { variable } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { StaffMember } from "../objects/staff-member.model";
import { Patient } from "../objects/patient.model";
import { registerStaff, registerPatient, loginStaff, logout } from "../gql/mutation";
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private apollo: Apollo, private router: Router) { }

  private currentUser: StaffMember;
  isLoggedIn: boolean = false;
  role: string;

  logStatus(): boolean {
    return this.isLoggedIn;
  }

  getRole(): string {
    return this.currentUser.type;
  }

  registerStaff(staff: StaffMember): void {
    this.apollo.mutate({
      mutation: registerStaff,
      variables: {
        staff: staff
      }
    }).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => console.error('Error Registering: ' + err),
      complete: () => {
        console.log("done");
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
        console.log(data);
      },
      error: err => console.error('Error Registering Patient: ' + err),
      complete: () => {
        console.log("done");
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
        console.log(this.currentUser)
      },
      error: err => console.error('Error logging in: ' + err),
      complete: () => {
        if (this.currentUser) {
          console.log("Login complete");
          this.isLoggedIn = true;
          this.router.navigate(['home']);

        }
        else {
          console.log("Login failed");

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
      error: err => console.error('Error Logging out: ' + err),
      complete: () => {
        console.log("Logout completed");
        this.apollo.client.resetStore();
      },

    });
  };

}
