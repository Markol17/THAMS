import { Component, OnInit } from "@angular/core";
import { BackendError } from '../objects/backend-error.model';
import { Division } from "../objects/division.model";
import { Patient } from "../objects/patient.model";
import { AdmissionserviceService } from "../services/admissionservice.service";
import { CustomMessageService } from "../services/message.service";

@Component({
  selector: "app-admitpatient",
  templateUrl: "./admitpatient.component.html",
  styleUrls: ["./admitpatient.component.css"],
})
export class AdmitpatientComponent implements OnInit {
  divisionId: number;
  patientList: Patient[];
  division: Division;

  constructor(
    private admission: AdmissionserviceService,
    private customMessageService: CustomMessageService
  ) {}

  ngOnInit() {
    this.patientList = [];
  }

  getRequestList() {
    this.admission.requestList(this.divisionId).valueChanges.subscribe({
      next: (data) => {
        var errors;
        var x = data.data["requestList"];
        var temp2 = x["patients"];
        this.patientList.splice(0, this.patientList.length);
        temp2.forEach((element) => {
          let jsonObj: any = JSON.parse(JSON.stringify(element));
          let currentPatient = <Patient>jsonObj;
          this.patientList.push(currentPatient);
        });
        let jsonError: any = JSON.parse(JSON.stringify(x["errors"]));
        errors = <BackendError[]>jsonError;
        if(errors != null && errors.length != 0){
          errors.forEach(element => {
            this.customMessageService.setError(element.message);
          });
        }
        else if (this.patientList && this.patientList.length == 0) {
          this.customMessageService.setError(
            "No patient in the division admit list or the divsion does not exist"
          );
        }
        
      },
      error: (err) => {
        console.error("Error getting request list: " + err);
        this.customMessageService.setError(
          "Could not get the request list beacause of " + err
        );
      },
    });
  }

  admit(id: number) {
    this.admission.divisionInfo(this.divisionId).valueChanges.subscribe({
      next: (data) => {
        var errors;
        this.division = null;
        const x = data.data["divisionInfo"];
        let jsonObj: any = JSON.parse(JSON.stringify(x));
        this.division = <Division>jsonObj;
        let jsonError: any = JSON.parse(JSON.stringify(x["errors"]));
        errors = <BackendError[]>jsonError;
        if(errors != null && errors.length != 0){
          errors.forEach(element => {
            this.customMessageService.setError(element.message);
          });
        }
        else {
          this.admission.admitPatient(id, this.divisionId, this.division);
          this.getRequestList();
        } 
      },
      error: (err) => {
        console.error("Error admiting patient: " + err);
        this.customMessageService.setError(err);
      },
    });
  }
}
