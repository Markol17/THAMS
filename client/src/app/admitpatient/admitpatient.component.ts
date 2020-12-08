import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Division } from '../objects/division.model';
import { Patient } from '../objects/patient.model';
import { AdmissionserviceService } from '../services/admissionservice.service';
import { CustomMessageService } from '../services/message.service';

@Component({
  selector: 'app-admitpatient',
  templateUrl: './admitpatient.component.html',
  styleUrls: ['./admitpatient.component.css']
})
export class AdmitpatientComponent implements OnInit {

  divisionId: number;
  patientList: Patient[];
  division: Division;

  constructor(private admission : AdmissionserviceService, private customMessageService: CustomMessageService) { }

  ngOnInit() {
    this.patientList = [];
  }

  getRequestList(){
    /*this.patientList =*/ this.admission.requestList(this.divisionId);
    console.log("patientList: "+this.patientList);
  }

  admit(id :number){

    this.admission.divisionInfo(this.divisionId).valueChanges.subscribe({ next: data => {
      this.division = null;
      console.log(data);
      const x = data.data['divisionInfo'];
      console.log(x);
      let jsonObj: any = JSON.parse(JSON.stringify(x));
      this.division = <Division>jsonObj;
      console.log(this.division);
      if(!this.division.isComplete){
        this.admission.admitPatient(id,this.divisionId,this.division);
      }else{
        console.log("No more space in the division")
        this.customMessageService.setError("No more space in the division");
      }
    },
    error: err => {
      console.error('Error admiting patient: ' + err);
      this.customMessageService.setError(err);
    } } );
    
  }

}
