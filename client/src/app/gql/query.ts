import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

export const patientInfo=gql
`query patientInfo($patientId:Int!) {
    patientInfo(patientId:$patientId){
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
  