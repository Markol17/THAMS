import { Component, OnInit } from "@angular/core";
import { BackendError } from '../objects/backend-error.model';
import { Division } from "../objects/division.model";
import { AdmissionserviceService } from "../services/admissionservice.service";
import { CustomMessageService } from "../services/message.service";
import { PatientService } from "../services/patient.service";

@Component({
  selector: "app-division",
  templateUrl: "./division.component.html",
  styleUrls: ["./division.component.css"],
})
export class DivisionComponent implements OnInit {
  division: Division;
  id: number;

  constructor(
    private admission: AdmissionserviceService,
    private customMessageService: CustomMessageService
  ) {
  }

  ngOnInit() {}

  getDivision() {
    this.admission.divisionInfo(this.id).valueChanges.subscribe({
      next: (data) => {
        this.division = null;
        var errors;
        const x = data.data["divisionInfo"];
        let jsonObj: any = JSON.parse(JSON.stringify(x["division"]));
        this.division = <Division>jsonObj;
        let jsonError: any = JSON.parse(JSON.stringify(x["errors"]));
        errors = <BackendError[]>jsonError;
        if(errors != null && errors.length != 0){
          errors.forEach(element => {
            this.customMessageService.setError(element.message);
          });
        }
      },
      error: (err) => {
        console.error("Error admiting patient: " + err);
        this.customMessageService.setError(err);
      },
    });
  }
}
