import { Injectable } from '@angular/core';
import {Patient} from "../objects/patient.model";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import {registerPatient} from "../gql/mutation";
import {patientInfo} from "../gql/query";
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { PatientIdInput } from '../objects/patient-id-input.model';
import { CustomMessageService } from './message.service';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patient: Patient;
  pId: PatientIdInput;
  viewPatient:boolean;
  constructor(private apollo: Apollo, private customMessageService: CustomMessageService) { }

patientInfo(id:number): any{
  this.pId = new PatientIdInput;
  this.pId.patientId= id;

  return this.apollo.watchQuery<any>({
    query: patientInfo,
    variables:{
      patient: this.pId
    }
  })
 
}

}

