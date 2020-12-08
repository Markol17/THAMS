import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

export const patientInfo = gql`
  query patientInfo($patient: PatientIdInput!) {
    patientInfo(options: $patient) {
      patient {
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
    }
  }
`;

export const divisioinInfo = gql`
  query divisionInfo($div: DivisionIdInput!) {
    divisionInfo(options: $div) {
      id
      name
      description
      location
      numBeds
      phoneNumber
      isComplete
    }
  }
`;

export const patients = gql`
  query patients {
    patients {
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
  }
`;
