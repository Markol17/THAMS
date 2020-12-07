import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

export const patientInfo=gql
`query patientInfo($patient:PatientIdInput!) {
    patientInfo(options:$patient){
          id
          insuranceNumber
          firstName
          lastName
          address
          phoneNumber
          dateOfBirth
          gender
          maritalStatus
          externalDoctor
          nextOfKin
          privateInsuranceNumber
    }
}`;
  