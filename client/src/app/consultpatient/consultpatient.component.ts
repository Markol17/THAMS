import { Component, OnInit } from "@angular/core";
import { PatientService } from "../services/patient.service";
import { Patient } from "../objects/patient.model";
import { CustomMessageService } from "../services/message.service";
import { AuthenticationService } from "../services/authentication.service";
import { SelectItem } from "primeng/api";
import { UpdatePatient } from "../objects/update-patient.model";

@Component({
  selector: "app-consultpatient",
  templateUrl: "./consultpatient.component.html",
  styleUrls: ["./consultpatient.component.css"],
})
export class ConsultpatientComponent implements OnInit {
  patient: Patient;
  updatePatient: UpdatePatient;
  id: number;
  submitted: boolean;
  edit: boolean = false;
  role: string;
  maritals: SelectItem[];
  genders: SelectItem[];

  constructor(
    private patientserice: PatientService,
    private customMessageService: CustomMessageService,
    private authservice: AuthenticationService
  ) {
    this.updatePatient = new UpdatePatient();
    this.genders = [
      { label: "male", value: "Male" },
      { label: "female", value: "Female" },
      { label: "I would rather not say", value: "I would rather not say" },
    ];

    this.maritals = [
      { label: "single", value: "single" },
      { label: "married", value: "married" },
      { label: "widowed", value: "widowed" },
      { label: "divorced", value: "divorced" },
      { label: "separated", value: "separated" },
      { label: "registered partnership", value: "registered partnership" },
    ];
  }
  ngOnInit() {
    this.role = this.authservice.getRole();
  }

  isNurseAndAdmitted(): boolean {
    if (this.role == "ChargeNurse" && this.patient.isAdmitted) {
      return true;
    }
    return false;
  }

  isDoctor(): boolean {
    return this.role == "Doctor";
  }

  findPatient(): void {
    this.patientserice.patientInfo(this.id).valueChanges.subscribe({
      next: (data) => {
        console.log(data);
        const x = data.data["patientInfo"];
        let jsonObj: any = JSON.parse(JSON.stringify(x["patient"]));
        this.patient = <Patient>jsonObj;
        if (this.patient != null) {
          this.customMessageService.setSuccess(
            "Here is the file of  " + this.patient.firstName
          );
          this.updatePatient.patientId = this.patient.id;
          this.updatePatient.address = this.patient.address;
          this.updatePatient.phoneNumber = this.patient.phoneNumber;
          this.updatePatient.maritalStatus = this.patient.maritalStatus;
          this.updatePatient.gender = this.patient.gender;
          this.updatePatient.nextOfKin = this.patient.nextOfKin;
          this.updatePatient.privateInsuranceNumber = this.patient.privateInsuranceNumber;
          this.submitted = true;
        } else {
          this.customMessageService.setError("Coulnd't find this patient");
          this.submitted = false;
        }
      },
      error: (err) => {
        console.error("Patient search error:" + err);
        this.customMessageService.setError("Coulnd't find this patient");
        this.submitted = false;
      },
    });
  }

  updatePatientInfo(): void {
    if (Object.values(this.updatePatient).every((o) => o != "")) {
      this.patientserice.updatePatient(this.updatePatient).subscribe({
        next: (data) => {},
        error: (err) => {
          console.error("Error updating Patient: " + err);
          this.customMessageService.setError(
            "There was an error updating this patient"
          );
        },
        complete: () => {
          this.customMessageService.setSuccess("Patient file updated");
          this.edit = false;
        },
      });
    } else {
      this.customMessageService.setError(
        "One of the field you editted is empty"
      );
    }
  }
}
