import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import {Patient} from '../objects/patient.model'

@Component({
  selector: 'app-consultpatient',
  templateUrl: './consultpatient.component.html',
  styleUrls: ['./consultpatient.component.css']
})

export class ConsultpatientComponent implements OnInit {
  id:number;
  patient: Patient;

  constructor(private patientserice: PatientService) {
    this.patient=null;
  }
  ngOnInit() {
  }

  findPatient(): void{
    console.log(this.id);
    this.patientserice.patientInfo(this.id)
    
    /* .subscribe(
      (data) => this.patient=data,
     (error) => console.log("could not find patient")
    )*/
  }


}
