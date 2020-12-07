import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { admitPatient, requestPatientAdmission } from '../gql/mutation';
import { divisioinInfo } from '../gql/query';
import { CustomMessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class AdmissionserviceService {

  constructor(private apollo: Apollo, private customMessageService: CustomMessageService) { }

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
      
    });
    return this.divisionComplete;
  }

  //Les messages doit regarder si un patient est retourner
  admitPatient(pId: number, dId:number): void {
    var response = null;
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
        response = data.data['admitPatient'];
        console.log(response);
      },
      error: err => {
        console.error('Error admiting patient: ' + err);
        this.customMessageService.setError("Patient could not be added to the division");
      },
      complete: () => {
        console.log(response);
        if(this.divisionComplete == null){
          this.customMessageService.setError("The division was not found");
        }
        else if(response){
          this.customMessageService.setSuccess("Patient was admitted to the division");
        }
        
        else{
          this.customMessageService.setError("Patient could not be added to the division");
        }
      },


    });
  }

  requestPatientAdmission(pId: number, dId:number): void {
    var response =null;
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
        response = data.data['requestPatientAdmission'];
        console.log(response);
      },
      error: err => {
        console.error('Error adding patient to admit list: ' + err);
        this.customMessageService.setError("Patient could not be added to the division admit list");
      },
      complete: () => {
        console.log(response);
        if(this.divisionComplete == null){
          this.customMessageService.setError("The division was not found");
        }
        else if(response){
          this.customMessageService.setSuccess("Patient was added to the division admit list");
        }
        
        else{
          this.customMessageService.setError("Patient could not be added to the division admit list");
        }
      },
      


    });
  }

}
