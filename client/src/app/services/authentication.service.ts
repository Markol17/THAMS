import { variable } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import {StaffMember} from "../objects/staff-member.model";
import {Patient} from "../objects/patient.model";
import {registerStaff} from "../gql/mutation";
import {registerPatient} from "../gql/mutation";


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
          staff: patient
        }
      }).subscribe(
        (error) => {
          console.log('there was an registering this patient', error);}
      );
}
loginStaff(): void{};
logoutStaff(): void{};

}
