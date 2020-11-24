import {
    Resolver,
    Mutation,
    Arg,
    Field,
    ObjectType,
    UseMiddleware,
    Query,
  } from 'type-graphql';
import { PatientInput } from './InputTypes/PatientInput';
import { validatePatientRegister } from '../utils/validatePatientRegister';
import { getConnection } from 'typeorm';
import { Patient } from '../entities/Patient';
import { isAuth } from '../middleware/isAuth';
import { FieldError } from './StaffMemberResolver';
  
  
  @ObjectType()
  class PatientResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
  
    @Field(() => Patient, { nullable: true })
    patient?: Patient;
  }
  
  @Resolver(Patient)
  export class PatientResolver {
  
    // This wont work unless we pass the cookie to the request with the session id to be decrypted.
    @UseMiddleware(isAuth)
    @Mutation(() => PatientResponse)
    async registerPatient(
      @Arg('options') options: PatientInput,
    ): Promise<PatientResponse> {
      const errors = validatePatientRegister(options);
      if (errors) {
        return { errors };
      }
  
      let patient;
        const result = await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Patient)
          .values({
            firstName: options.firstName,
            lastName: options.lastName,
            insuranceNumber: options.insuranceNumber,
            address: options.address,
            phoneNumber: options.phoneNumber,
            dateOfBirth: options.dateOfBirth,
            gender: options.gender,
            maritalStatus: options.maritalStatus,
            externalDoctor: options.externalDoctor,
            nextOfKin: options.nextOfKin,
            privateInsuranceNumber: options.privateInsuranceNumber
          })
          .returning('*')
          .execute();
          patient = result.raw[0];
  
      return { patient };
    }

    @UseMiddleware(isAuth)
    @Mutation(() => PatientResponse)
    async updatePatient(
      @Arg('patientId') patientId: number,
      @Arg('address') address: string,
      @Arg("phoneNumber") phoneNumber:number,
      @Arg("gender") gender: string,
      @Arg("maritalStatus") maritalStatus:string,
      @Arg("nextOfKin") nextOfKin:string,
      @Arg("privateInsuranceNumber") privateInsuranceNumber:number,
    ): Promise<PatientResponse> {
      
      let patient;
        const result = await getConnection()
          .createQueryBuilder()
          .update(Patient)
          .set({ 
            address:address ,
            phoneNumber:phoneNumber,
            gender:gender,
            maritalStatus:maritalStatus,
            nextOfKin:nextOfKin,
            privateInsuranceNumber:privateInsuranceNumber
          })
          .where("id = :id", { id: patientId })
          .execute();
          patient = result.raw[0];
  
      return { patient };
    }

    @UseMiddleware(isAuth)
    @Query(() => Patient, { nullable: true })
    patientInfo(@Arg('patientId') patientId: number) {
      return Patient.findOne(patientId);
    }
  }
  