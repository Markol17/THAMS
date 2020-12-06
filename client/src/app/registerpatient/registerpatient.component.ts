import { Component, OnInit } from '@angular/core';
import { Patient } from '../objects/patient.model';
import { FormControl, FormGroup, PatternValidator } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-registerpatient',
  templateUrl: './registerpatient.component.html',
  styleUrls: ['./registerpatient.component.css']
})
export class RegisterpatientComponent implements OnInit {

  genders = ["male" , "Female", "I would rater say"];

  maritalsStatus = ["single","married","widowed","divorced","separated","registered partnership"];

  model = new Patient();

  submitted = false;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }
  
  onSubmit() { 
    console.log(this.model);
    this.auth.registerPatient(this.model);
  }
}