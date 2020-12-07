import { Component, OnInit } from '@angular/core';
import { AdmissionserviceService } from '../services/admissionservice.service';

@Component({
  selector: 'app-requestpatient',
  templateUrl: './requestpatient.component.html',
  styleUrls: ['./requestpatient.component.css']
})
export class RequestpatientComponent implements OnInit {

  patientId:number;
  divisionId:number;

  constructor(private admission: AdmissionserviceService) { }

  ngOnInit(): void {
  }

  addToRequestList(){
    const isFull = this.admission.divisionInfo(this.divisionId);
    if(!isFull){
      this.admission.admitPatient(this.patientId,this.divisionId);
    }
    else{
      this.admission.requestPatientAdmission(this.patientId,this.divisionId);
    }
  }

}

