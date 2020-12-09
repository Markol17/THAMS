import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { AddPrescriptionInput } from "../objects/add-prescription-input.model";
import { BackendError } from '../objects/backend-error.model';
import { CustomMessageService } from "../services/message.service";
import { PrescriptionService } from "../services/prescription.service";

@Component({
  selector: "prescription",
  templateUrl: "./prescription.component.html",
  styleUrls: ["./prescription.component.css"],
})
export class PrescriptionComponent implements OnInit {
  prescription;
  finalPrescription;
  constructor(
    private fb: FormBuilder,
    private prescriptionService: PrescriptionService,
    private customMessageService: CustomMessageService
  ) {}

  ngOnInit(): void {
    this.prescription = this.fb.group({
      name: ["", Validators.required],
      unitsPerDay: ["", Validators.required],
      numAdministrationsPerDay: ["", Validators.required],
      methodOfAdministration: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      patientId: [""],
    });
  }
  addPrescription() {
    this.finalPrescription = new AddPrescriptionInput(this.prescription.value);
    this.prescriptionService.addPrescription(this.finalPrescription).subscribe({
      next: (data) => {
        var errors;
        const x = data.data["addPrescription"];
        let jsonError: any = JSON.parse(JSON.stringify(x["errors"]));
        errors = <BackendError[]>jsonError;
        console.log(x);
        console.log(errors);
        if(errors != null && errors.length != 0){
          errors.forEach(element => {
            this.customMessageService.setError(element.message);
          });
        }
        else{
          this.customMessageService.setSuccess("Prescription added");
        }
      },
      error: (err) => {
        this.customMessageService.setError(
          "Could not add this prescription" + err
        );
      },
    });
  }
}
