import { Component, OnInit } from "@angular/core";
import { BackendError } from '../objects/backend-error.model';
import { Division } from "../objects/division.model";
import { AdmissionserviceService } from "../services/admissionservice.service";
import { CustomMessageService } from "../services/message.service";

@Component({
  selector: "app-requestpatient",
  templateUrl: "./requestpatient.component.html",
  styleUrls: ["./requestpatient.component.css"],
})
export class RequestpatientComponent implements OnInit {
  patientId: number;
  divisionId: number;
  division: Division;

  constructor(
    private admission: AdmissionserviceService,
    private customMessageService: CustomMessageService
  ) {}

  ngOnInit(): void {}

  addToRequestList() {
    this.admission.divisionInfo(this.divisionId).valueChanges.subscribe({
      next: (data) => {
        var errors;
        this.division = null;
        const x = data.data["divisionInfo"];
        let jsonObj: any = JSON.parse(JSON.stringify(x["division"]));
        this.division = <Division>jsonObj;
        let jsonError: any = JSON.parse(JSON.stringify(x["errors"]));
        errors = <BackendError[]>jsonError;
        console.log(errors);
        if(errors != null && errors.length != 0){
          errors.forEach(element => {
            this.customMessageService.setError(element.message);
          });
        }
        else if (!this.division.isComplete) {
          this.admission.admitPatient(
            this.patientId,
            this.divisionId,
            this.division
          );
        } else {
          this.admission.requestPatientAdmission(
            this.patientId,
            this.divisionId,
            this.division
          );
        }
      },
      error: (err) => {
        console.error("Error admiting patient: " + err);
        this.customMessageService.setError(err);
      },
    });
  }
}
