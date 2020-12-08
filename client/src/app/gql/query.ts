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
      division {
        id
        name
        description
        location
        numBeds
        phoneNumber
        isComplete
      }
    }
  }
`;

export const requestList = gql`
  query requestList($id: DivisionIdInput!) {
    requestList(options: $id) {
      patients {
        id
        insuranceNumber
        firstName
        lastName
        address
        phoneNumber
        dateOfBirth
        gender
      }
    }
  }
`;

export const patients = gql`
  query patients {
    patients {
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
  }
`;
