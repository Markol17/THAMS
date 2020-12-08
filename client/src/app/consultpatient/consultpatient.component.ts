import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import {Patient} from '../objects/patient.model'
import { CustomMessageService } from '../services/message.service';
import { timeStamp } from 'console';
import { patients } from '../gql/query';


@Component({
  selector: 'app-consultpatient',
  templateUrl: './consultpatient.component.html',
  styleUrls: ['./consultpatient.component.css']
})

export class ConsultpatientComponent implements OnInit {
  patient: Patient ;
  patients: Patient[];
  id:number;
  submitted:boolean;

  constructor(private patientserice: PatientService,private customMessageService: CustomMessageService ) {

  }
  ngOnInit() {
    this.patientserice.getPatients().valueChanges.subscribe({
      next: data => {
        const x = data.data['patients'];
        let jsonObj: any = JSON.parse(JSON.stringify(x));
        this.patients = <Patient[]>jsonObj;
        console.log(this.patients);
  
      },
      error: err => { console.error('Patient list error:' + err);
     this.customMessageService.setError("Patient list could not load");
    }
    })
  }

  findPatient(): void{
   this.patientserice.patientInfo(this.id).valueChanges.subscribe({
      next: data => {
        console.log(data);
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
