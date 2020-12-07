import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { admitPatient, requestPatientAdmission } from '../gql/mutation';
import { divisioinInfo } from '../gql/query';


@Injectable({
  providedIn: 'root'
})
export class AdmissionserviceService {

  constructor(private apollo: Apollo) { }

  divisionComplete:Boolean;

  divisionInfo(id:number): any{
    this.divisionComplete = null;
    this.apollo.watchQuery<any>({
      query: divisioinInfo,
      variables:{
        div:{
          divisionId:id
        }
      }
    }).valueChanges.subscribe(({ data }) => {
      console.log(data);
      const x = data['divisionInfo'];
      this.divisionComplete = x["isComplete"];
      console.log(this.divisionComplete);
    });
    return this.divisionComplete;
  }

  admitPatient(pId: number, dId:number): void {
    this.apollo.mutate({
      mutation: admitPatient,
      variables: {
        patientDivision: {
          patientId: pId,
          divisionId: dId
        }
      }
    }).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => console.error('Error admiting patient: ' + err),
      complete: () => {
        
      },


    });
  }

  requestPatientAdmission(pId: number, dId:number): void {
    this.apollo.mutate({
      mutation: requestPatientAdmission,
      variables: {
        patientDivision: {
          patientId: pId,
          divisionId: dId
        }
      }
    }).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => console.error('Error adding patient to admit list: ' + err),
      complete: () => {
        
      },


    });
  }

}
