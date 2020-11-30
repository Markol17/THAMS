import { Component, OnInit } from '@angular/core';
import { Patient } from '../objects/patient.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registerpatient',
  templateUrl: './registerpatient.component.html',
  styleUrls: ['./registerpatient.component.css']
})
export class RegisterpatientComponent implements OnInit {

  genders = ["male" , "Female", "I would rater say"];

  martialStatus = ["single","married","widowed","divorced","separated","registered partnership"];

  model = new Patient();

  submitted = false;

  constructor() { }

  ngOnInit() {
  }
  
  onSubmit() { this.submitted = true; }
}