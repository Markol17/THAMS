import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requestpatient',
  templateUrl: './requestpatient.component.html',
  styleUrls: ['./requestpatient.component.css']
})
export class RequestpatientComponent implements OnInit {

  patientId:number;
  divisionId:number;

  constructor() { }

  ngOnInit(): void {
  }

  addToRequestList(){

  }

}

