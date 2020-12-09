import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { AddPrescriptionInput } from "../objects/add-prescription-input.model";
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
        console.log(data);
      },
      error: (err) => {
        console.log(err);
        this.customMessageService.setError(
          "Could not add this prescription" + err
        );
      },
      complete: () => {
        this.customMessageService.setSuccess("Prescription added");
      },
    });
  }
}
