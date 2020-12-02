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

export const loginStaff=gql`
  mutation loginStaff($username: String!, $password: String!) {
    loginStaff(email: $username, password: $password) {
        staffMember{
          email
          firstName   
          lastName
          bipperExtension
          type
        }
      }
    }`;

/*export const logoutStaff=gql`
  mutation logoutStaff() {
    logoutStaff() {}
  }`;*/

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
  }`;


  /*export const updatePatient=gql`
  mutation registerPatient(
    $privateInsuranceNumber: Float!
    $nextOfKin: String!
    $maritalStatus: String!
    $gender: String!
    $phoneNumber: Float!
    $address: String!
    $patientId: Float!) {
      registerPatient(
        privateInsuranceNumber: $privateInsuranceNumber
        nextOfKin: $nextOfKin
        maritalStatus: $maritalStatus
        gender: $gender
        phoneNumber: $phoneNumber
        address: $address
        patientId: $patientId) {
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
    }`;*/

 