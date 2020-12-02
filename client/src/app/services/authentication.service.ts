import { variable } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { StaffMember } from "../objects/staff-member.model";
import { Patient } from "../objects/patient.model";
import { registerStaff, registerPatient, loginStaff } from "../gql/mutation";
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private apollo: Apollo,private router: Router) { }

  private currentUser: StaffMember;
  isLoggedIn:boolean=false;
  role:string;

  logStatus():boolean{
    return this.isLoggedIn;
  }

  getRole():string{
    return this.currentUser.type;
  }
  
  registerStaff(staffmember: StaffMember): void {
    this.apollo.mutate({
      mutation: registerStaff,
      variables: {
        staff: staffmember
      }
    }).subscribe(
      (error) => {
        console.log('there was an registering this staffMember', error);
      }
    );

  }
  registerPatient(patient: Patient): void {
    this.apollo.mutate({
      mutation: registerPatient,
      variables: {
        patient: patient
      }
    }).subscribe(
      (error) => {
        console.log('there was an error registering this patient', error);
      }
    );
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
      complete: () =>{
        if(this.currentUser){
          console.log("Login complete");
          this.isLoggedIn=true;
          this.router.navigate(['app-consultpatient']);
  
        }
        else{
          console.log("Login failed");

        }

      },


    });


  };


  /*
  logoutStaff(): void{
    this.apollo.mutate({
      mutation: logoutStaff
    }).subscribe(
      (error) => {
        console.log('There was an error logout as a staff', error);}
    );
  };*/

}
