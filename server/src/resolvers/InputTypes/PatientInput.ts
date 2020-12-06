import { InputType, Field } from "type-graphql";
@InputType()
export class PatientInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  insuranceNumber: number;
  @Field()
  address: string;
  @Field()
  phoneNumber: number;
  @Field()
  dateOfBirth: Date;
  @Field()
  gender: string;
  @Field()
  maritalStatus: string;
  @Field()
  externalDoctor: string;
  @Field()
  nextOfKin: string;
  @Field()
  privateInsuranceNumber: number;
}

@InputType()
export class PatientIdDivisionIdInput {
  @Field()
  patientId: number;
  @Field()
  divisionId: number;
}

@InputType()
export class PatientIdInput {
  @Field()
  patientId: number;
}

@InputType()
export class UpdatePatientInput {
  @Field()
  patientId: number;
  @Field()
  address: string;
  @Field()
  phoneNumber:number;
  @Field()
  gender: string;
  @Field()
  maritalStatus:string;
  @Field()
  nextOfKin:string;
  @Field()
  privateInsuranceNumber:number;
}