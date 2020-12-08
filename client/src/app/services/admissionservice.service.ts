import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { admitPatient, requestPatientAdmission } from '../gql/mutation';
import { divisioinInfo, requestList } from '../gql/query';
import { Division } from '../objects/division.model';
import { Patient } from '../objects/patient.model';
import { CustomMessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class AdmissionserviceService {

  constructor(private apollo: Apollo, private customMessageService: CustomMessageService) { }

  division:Division;
  patientList: Patient[];

  divisionInfo(id:number): any{

    return this.apollo.watchQuery<any>({
      
      fetchPolicy: 'no-cache',
      query: divisioinInfo,
      variables:{
        div:{
          divisionId:id
        }
      }
    })
  }

  //Les messages doit regarder si un patient est retourner
  admitPatient(pId: number, dId:number, division:Division): void {
    var patient;
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
        patient = null;
        console.log(data);
        const x = data.data['admitPatient'];
        let jsonObj: any = JSON.parse(JSON.stringify(x['patient']));
        patient = <Patient>jsonObj;
        console.log(patient);
      },
      error: err => {
        console.error('Error admiting patient: ' + err);
        this.customMessageService.setError("Patient could not be added to the division");
      },
      complete: () => {
        console.log(patient);
        if(division == null){
          this.customMessageService.setError("The division was not found");
        }
        else if(patient){
          this.customMessageService.setSuccess("Patient was admitted to the division");
        }
        else if(patient == null){
          this.customMessageService.setError("No patient with id " + pId +" found while trying to admit patient");
        }
        else{
          this.customMessageService.setError("Patient could not be added to the division");
        }
      },


    });
  }

  requestPatientAdmission(pId: number, dId:number, division:Division): void {
    var patient;
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
        patient = null;
        console.log(data);
        const x = data.data['requestPatientAdmission'];
        let jsonObj: any = JSON.parse(JSON.stringify(x['patient']));
        patient = <Patient>jsonObj;
      },
      error: err => {
        console.error('Error adding patient to admit list: ' + err);
        this.customMessageService.setError("Patient could not be added to the division admit list");
      },
      complete: () => {
        console.log(patient);
        if(division == null){
          this.customMessageService.setError("The division was not found");
        }
        else if(patient){
          this.customMessageService.setSuccess("Patient was added to the division admit list");
        }
        else if(patient == null){
          this.customMessageService.setError("No patient with id " + pId+" found while trying to add patient to admit list");
        }
        else{
          this.customMessageService.setError("Patient could not be added to the division admit list");
        }
      },
      


    });
  }

  requestList(id:number): any{
    return this.apollo.watchQuery<any>({
      query: requestList,
      fetchPolicy: 'no-cache',
      variables:{
        id:{
          divisionId:id
        }
      }
    })
  
  }

  getRequestList(){
    return this.patientList
  }

  getDivision(){
    return this.division
  }

}
