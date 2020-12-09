import { Component, OnInit } from "@angular/core";
import { Division } from "../objects/division.model";
import { CustomMessageService } from "../services/message.service";
import { PatientService } from "../services/patient.service";

@Component({
  selector: "app-divisionlist",
  templateUrl: "./divisionlist.component.html",
  styleUrls: ["./divisionlist.component.css"],
})
export class DivisionlistComponent implements OnInit {
  divisions: Division[];
  constructor(
    private patientserice: PatientService,
    private customMessageService: CustomMessageService
  ) {}

  ngOnInit(): void {
    this.getDivisions();
  }

  getDivisions() {
    this.patientserice.getDivisions().valueChanges.subscribe({
      next: (data) => {
        const x = data.data["divisions"];
        let jsonObj: any = JSON.parse(JSON.stringify(x["divisions"]));
        this.divisions = <Division[]>jsonObj;
        this.patientserice.reloadDivisions();
      },
      error: (err) => {
        console.error("Divisions list error:" + err);
        this.customMessageService.setError("Divisions list could not load");
      },
    });
  }

  reloadDivisions() {
    this.getDivisions();
  }
}
