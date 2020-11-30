import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

export const patientInfo=gql
`query patientInfo($patientId:Float!) {
    patientInfo(patientId:$patientId){
      Patient{
          id
          insuranceNumber
          firstName
          lastName
          address
          phoneNumber
          dateOfBirth
          gender
          martialStatus
          externalDoctor
          nextOfKin
          privateInsuranceNumber
          roomNumber
          bedNumber
          createdAt
          updatedAt
          localDoctor
      }
    }
}`;
  