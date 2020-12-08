import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../objects/patient.model';
import { CustomMessageService } from '../services/message.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.css']
})
export class PatientlistComponent implements OnInit {
  patients: Patient[];
  
  constructor(private patientserice: PatientService,private customMessageService: CustomMessageService) {

   }

  ngOnInit(): void {
    this.patientserice.getPatients().valueChanges.subscribe({
      next: data => {
        const x = data.data['patients'];
        let jsonObj: any = JSON.parse(JSON.stringify(x['patients']));
        this.patients = <Patient[]>jsonObj;
        this.patientserice.reload();
  
      },
      error: err => { console.error('Patient list error:' + err);
     this.customMessageService.setError("Patient list could not load");
    }
    })
  }






}
