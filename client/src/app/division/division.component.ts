import { Component, OnInit } from '@angular/core';
import { Division } from '../objects/division.model';
import { AdmissionserviceService } from '../services/admissionservice.service';
import { CustomMessageService } from '../services/message.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit {

  division : Division
  id :number;
  submitted: boolean

  constructor(private admission : AdmissionserviceService, private customMessageService :CustomMessageService) {
    this.submitted = false;
   }

  ngOnInit() {
  }

  getDivision(){
    this.admission.divisionInfo(this.id).valueChanges.subscribe({ next: data => {
      this.division = null;
      console.log(data);
      const x = data.data['divisionInfo'];
      console.log(x);
      let jsonObj: any = JSON.parse(JSON.stringify(x['division']));
      this.division = <Division>jsonObj;;
      console.log("division:" );
      console.log(this.division)
      this.submitted =true;
    },
    error: err => {
      console.error('Error admiting patient: ' + err);
      this.customMessageService.setError(err);
    } } );

  }

}
