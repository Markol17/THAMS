import {
    Resolver,
    Mutation,
    Arg,
    Field,
    ObjectType,
    Query,
  } from 'type-graphql';
import { PatientIdInput, PatientInput, UpdatePatientInput } from './InputTypes/PatientInput';
import { Patient } from '../entities/Patient';
import { FieldError } from './StaffMemberResolver';
import { PatientService } from '../services/PatientService';
  
  
  @ObjectType()
  export class PatientResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
  
    @Field(() => Patient, { nullable: true })
    patient?: Patient;
  }
  
  @Resolver(Patient)
  export class PatientResolver {

    @Query(() => [Patient], {nullable: true})
    async patients(): Promise<Patient[]> {
      const patientService = new PatientService(); 
      return patientService.getPatients(); 
    }
  
    @Mutation(() => PatientResponse)
    async registerPatient(
      @Arg('options') options: PatientInput,
    ): Promise<PatientResponse> {
      const patientService = new PatientService(); 
      return patientService.registerPatient(options);
    }

    @Mutation(() => PatientResponse)
    async updatePatient(
      @Arg('options') options: UpdatePatientInput,
    ): Promise<PatientResponse> {
      const patientService = new PatientService(); 
      return patientService.updatePatient(options);
    }

    @Query(() => Patient, { nullable: true })
    async patientInfo( @Arg('options') options: PatientIdInput): Promise<PatientResponse> {
      const patientService = new PatientService(); 
      return patientService.getPatient(options);
    }
  }
  