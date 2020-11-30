import { Injectable } from '@angular/core';
import {Patient} from "../objects/patient.model";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import {registerPatient} from "../gql/mutation";
import {patientInfo} from "../gql/query";
import { Variable } from '@angular/compiler/src/render3/r3_ast';
@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private apollo: Apollo) { }

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

patientInfo(id:number): void{
  this.apollo.watchQuery({
    query: patientInfo,
    variables:{
      id:id
    }
  })
}

}

