import { Component, OnInit } from '@angular/core';
import { Division } from '../objects/division.model';
import { AdmissionserviceService } from '../services/admissionservice.service';
import { CustomMessageService } from '../services/message.service';

@Component({
  selector: 'app-requestpatient',
  templateUrl: './requestpatient.component.html',
  styleUrls: ['./requestpatient.component.css']
})
export class RequestpatientComponent implements OnInit {

  patientId:number;
  divisionId:number;
  division:Division;

  constructor(private admission: AdmissionserviceService, private customMessageService: CustomMessageService) { }

  ngOnInit(): void {
  }

  addToRequestList(){
    this.admission.divisionInfo(this.divisionId).valueChanges.subscribe({ next: data => {
      this.division = null;
      console.log(data);
      const x = data.data['divisionInfo'];
      console.log(x);
      let jsonObj: any = JSON.parse(JSON.stringify(x));
      this.division = <Division>jsonObj;
      console.log(this.division);
      if(/**!this.division.isComplete*/ false){
        this.admission.admitPatient(this.patientId,this.divisionId,this.division);
      }else{
        this.admission.requestPatientAdmission(this.patientId,this.divisionId,this.division);
      }
    },
    error: err => {
      console.error('Error admiting patient: ' + err);
      this.customMessageService.setError(err);
    } } );

  }

}

