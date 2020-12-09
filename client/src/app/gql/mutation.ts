import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

export const registerStaff = gql`
  mutation registerStaff($staff: StaffMemberInput!) {
    registerStaff(options: $staff) {
      staffMember {
        email
        firstName
        lastName
        bipperExtension
        type
      }
      errors {
        field
        message
      }
    }
  }
`;

export const loginStaff = gql`
  mutation loginStaff($username: String!, $password: String!) {
    loginStaff(email: $username, password: $password) {
      staffMember {
        email
        firstName
        lastName
        bipperExtension
        type
      }
      errors {
        field
        message
      }
    }
  }
`;

export const logout = gql`
  mutation logoutStaff {
    logoutStaff
  }
`;

export const registerPatient = gql`
  mutation registerPatient($patient: PatientInput!) {
    registerPatient(options: $patient) {
      patient {
        id
        firstName
        lastName
        insuranceNumber
        address
        phoneNumber
        dateOfBirth
        gender
        maritalStatus
        externalDoctor
        nextOfKin
        privateInsuranceNumber
      }
      errors {
        field
        message
      }
    }
  }
`;

export const updatePatient = gql`
  mutation updatePatient($patient: UpdatePatientInput!) {
    updatePatient(options: $patient) {
      patient {
        id
        firstName
        lastName
        insuranceNumber
        address
        phoneNumber
        dateOfBirth
        gender
        maritalStatus
        externalDoctor
        nextOfKin
        privateInsuranceNumber
      }
      errors {
        field
        message
      }
    }
  }
`;

export const admitPatient = gql`
  mutation admitPatient($patientDivision: PatientIdDivisionIdInput!) {
    admitPatient(options: $patientDivision) {
      patient {
        firstName
        lastName
        insuranceNumber
        address
        phoneNumber
        dateOfBirth
        gender
        id
      }
      errors {
        field
        message
      }
    }
  }
`;

export const requestPatientAdmission = gql`
  mutation requestPatientAdmission(
    $patientDivision: PatientIdDivisionIdInput!
  ) {
    requestPatientAdmission(options: $patientDivision) {
      patient {
        firstName
        lastName
        insuranceNumber
        address
        phoneNumber
        dateOfBirth
        gender
        id
      }
      errors {
        field
        message
      }
    }
  }
`;
export const addPrescription = gql`
  mutation addPrescription($prescription: addPrescriptionInput!) {
    addPrescription(options: $prescription) {
      prescription {
        name
        unitsPerDay
        numAdministrationsPerDay
        methodOfAdministration
        startDate
        endDate
        patientId
      }
      errors {
        field
        message
      }
    }
  }
`;
