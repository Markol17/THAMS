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
        divisionId
        phoneNumber
        dateOfBirth
        gender
        maritalStatus
        externalDoctor
        nextOfKin
        privateInsuranceNumber
        isAdmitted
        roomNumber
        bedNumber
      }
      errors {
        field
        message
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
      errors {
        field
        message
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
      errors {
        field
        message
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
        divisionId
        isAdmitted
        roomNumber
        bedNumber
      }
      errors {
        field
        message
      }
    }
  }
`;

export const divisions = gql`
query divisions {
  divisions {
    divisions{
      id
      name
      description
      numBeds
      isComplete
    }
    errors{
      field
      message
    }
  }
}
`;

export const patientPrescriptions = gql`
  query patientPrescriptions($id: PatientIdInput!) {
    patientPrescriptions(options: $id) {
      prescriptions {
        id
        name
        unitsPerDay
        numAdministrationsPerDay
        methodOfAdministration
        startDate
        endDate
        createdAt
        updatedAt
        patientId
      }
      errors {
        field
        message
      }
    }
  }
`;
