import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import {Patient} from '../objects/patient.model'
import { CustomMessageService } from '../services/message.service';
import { timeStamp } from 'console';


@Component({
  selector: 'app-consultpatient',
  templateUrl: './consultpatient.component.html',
  styleUrls: ['./consultpatient.component.css']
})

export class ConsultpatientComponent implements OnInit {
  patient: Patient ;
  id:number;
  submitted:boolean;

  constructor(private patientserice: PatientService,private customMessageService: CustomMessageService ) {

  }
  ngOnInit() {
  }

  findPatient(): void{
   this.patientserice.patientInfo(this.id).valueChanges.subscribe({
      next: data => {
        const x = data.data['patientInfo'];
        let jsonObj: any = JSON.parse(JSON.stringify(x));
        this.patient = <Patient>jsonObj;
        if (this.patient!=null) {
          this.customMessageService.setSuccess("Here is the file of  "+this.patient.firstName);  
          this.submitted=true; 
          
        }
        else {
          this.customMessageService.setError("Coulnd't find this patient");
          this.submitted=false;
         
        }
      },
      error: err => { console.error('Patient search error:' + err);
     this.customMessageService.setError("Coulnd't find this patient");
     this.submitted=false;
   

    }
    });;
  }


}
