import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { addPrescription } from "../gql/mutation";
import { patientPrescriptions } from "../gql/query";
import { AddPrescriptionInput } from "../objects/add-prescription-input.model";
import { PatientIdInput } from "../objects/patient-id-input.model";
@Injectable({
  providedIn: "root",
})
export class PrescriptionService {
  constructor(private apollo: Apollo) {}
  pId: PatientIdInput;

  addPrescription(prescription: AddPrescriptionInput): any {
    return this.apollo.mutate({
      mutation: addPrescription,
      variables: {
        prescription: prescription,
      },
    });
  }

  getPrescriptions(id: number): any {
    this.pId = new PatientIdInput();
    this.pId.patientId = id;

    return this.apollo.watchQuery<any>({
      fetchPolicy: "no-cache",
      query: patientPrescriptions,
      variables: {
        id: this.pId,
      },
    });
  }
}
