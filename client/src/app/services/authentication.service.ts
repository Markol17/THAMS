import { variable } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import {StaffMember} from "../objects/staff-member.model";
import {Patient} from "../objects/patient.model";
import {registerStaff} from "../gql/mutation";
import {registerPatient, loginStaff} from "../gql/mutation";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private apollo: Apollo) {}


  registerStaff(staffmember: StaffMember): void{
      this.apollo.mutate({
          mutation: registerStaff,
          variables:{
            staff: staffmember
          }
        }).subscribe(
          (error) => {
            console.log('there was an registering this staffMember', error);}
        );

  }
  registerPatient(patient: Patient): void{
    this.apollo.mutate({
        mutation: registerPatient,
        variables:{
          patient: patient
        }
      }).subscribe(
        (error) => {
          console.log('there was an error registering this patient', error);}
      );
}

  loginStaff(email:String, password:String): void{
    this.apollo.mutate({
      mutation: loginStaff,
      variables:{
        username: email,
        password: password
      }
    }).subscribe(
      (error) => {
        console.log('There was an error login as a staff', error);}
    );
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
