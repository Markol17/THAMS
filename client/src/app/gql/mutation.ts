import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

export const registerStaff=gql`
mutation registerStaff($staff: StaffMemberInput!) {
    registerStaff(options: $staff) {
      staffMember{
        email
        firstName   
        lastName
        bipperExtension
        type

      }
    }
  }`;

export const registerPatient=gql`
mutation registerPatient($patient: PatientInput!) {
    registerPatient(options: $patient) {
      patient{
        firstName
        lastName
        insuranceNumber
        address
        phoneNumber
        dateOfBirth
        gender
        martialStatus
        externalDoctor
        nextOfKin
        privateInsuranceNumber
      }
    }
  }`