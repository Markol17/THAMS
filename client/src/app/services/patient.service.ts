import { Injectable } from '@angular/core';
import { Patient } from "../objects/patient.model";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { registerPatient, updatePatient } from "../gql/mutation";
import { patientInfo, patients } from "../gql/query";
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { PatientIdInput } from '../objects/patient-id-input.model';
import { CustomMessageService } from './message.service';
import { UpdatePatient } from '../objects/update-patient.model';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patient: Patient;
  pId: PatientIdInput;
  viewPatient: boolean;
  reloadPatient: boolean;
  constructor(private apollo: Apollo, private customMessageService: CustomMessageService) { }

  patientInfo(id: number): any {
    this.pId = new PatientIdInput;
    this.pId.patientId = id;

    return this.apollo.watchQuery<any>({
      query: patientInfo,
      variables: {
        patient: this.pId
      }
    })

  }

  updatePatient(patient: UpdatePatient) {
    this.apollo.mutate({
      mutation: updatePatient,
      variables: {
        patient: patient
      }
    }).subscribe({
      next: data => {
        console.log(data);

      },
      error: err => {
        console.error('Error updating Patient: ' + err);
        this.customMessageService.setError("There was an error updating this patient");
      },
      complete: () => { },


    });

  }

  getPatients(): any {
    return this.apollo.watchQuery<any>({
      query: patients,
      pollInterval: 10000
    })

  }

  reload() {
    this.reloadPatient = this.reloadPatient!;
  }

}

