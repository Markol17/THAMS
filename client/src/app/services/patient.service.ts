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
  Patient: any;

  constructor(private apollo: Apollo) { }

patientInfo(patientid:number): any{
  
  this.apollo.watchQuery<any>({
    query: patientInfo,
    variables:{
      patientid:patientid
    }
  }).valueChanges.subscribe(({ data }) => {
    this.Patient = data.Patient;
  });
  return this.Patient;
}

}

