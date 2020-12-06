import {
    Resolver,
    Mutation,
    Arg,
    Field,
    ObjectType,
    UseMiddleware,
    Query,
  } from 'type-graphql';
import { PatientIdInput, PatientInput, UpdatePatientInput } from './InputTypes/PatientInput';
import { validatePatientRegister } from '../utils/validatePatientRegister';
import { getConnection } from 'typeorm';
import { Patient } from '../entities/Patient';
import { isAuth } from '../middleware/isAuth';
import { FieldError } from './StaffMemberResolver';
  
  
  @ObjectType()
  export class PatientResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
  
    @Field(() => Patient, { nullable: true })
    patient?: Patient;
  }
  
  @Resolver(Patient)
  export class PatientResolver {

    @UseMiddleware(isAuth)
    @Query(() => [Patient], {nullable: true})
    async patients() { return await Patient.find(); }
  
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
      @Arg('options') options: UpdatePatientInput,
    ): Promise<PatientResponse> {
      
      let patient;
        const result = await getConnection()
          .createQueryBuilder()
          .update(Patient)
          .set({ 
            address: options.address ,
            phoneNumber: options.phoneNumber,
            gender: options.gender,
            maritalStatus: options.maritalStatus,
            nextOfKin: options.nextOfKin,
            privateInsuranceNumber: options.privateInsuranceNumber
          })
          .where("id = :id", { id: options.patientId })
          .execute();
          patient = result.raw[0];
  
      return { patient };
    }

    @UseMiddleware(isAuth)
    @Query(() => Patient, { nullable: true })
    patientInfo( @Arg('options') options: PatientIdInput) {
      return Patient.findOne(options.patientId);
    }
  }
  