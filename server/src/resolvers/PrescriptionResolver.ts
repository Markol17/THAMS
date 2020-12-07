import {
    Resolver,
    Mutation,
    Arg,
    UseMiddleware,
    Query,
    Field,
    ObjectType,
  } from 'type-graphql';
import { isAuth } from '../middleware/isAuth';
import { Division } from '../entities/Division';
import { FieldError } from './StaffMemberResolver';
import { getConnection } from 'typeorm';
import { PatientIdInput } from './InputTypes/PatientInput';
import { Prescription } from '../entities/Prescription';
import { addPrescriptionInput } from './InputTypes/PrescriptionInput';

@ObjectType()
export class PrescriptionResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Division, { nullable: true })
  prescription?: Prescription;
}

  @Resolver(Prescription)
  export class PrescriptionResolver {
    @UseMiddleware(isAuth)
    @Query(() => [Prescription], {nullable: true})
    async patientPrescription(
      @Arg('options') options: PatientIdInput,
    ) { return await Prescription.find({where: { patientId: options.patientId} }); }
  
    @Mutation(() => PrescriptionResponse)
    async addPrescription(
      @Arg('options') options: addPrescriptionInput,
    ): Promise<PrescriptionResponse> {
        // need to do validation
        // const errors = validateDivisionRegister(options);
        // if (errors) {
        //   return { errors };
        // }

    
        let prescription;
          const result = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Prescription)
            .values({
              name: options.name,
              unitsPerDay: options.unitsPerDay,
              numAdministrationsPerDay: options.numAdministrationsPerDay,
              methodOfAdministration: options.methodOfAdministration,
              startDate: options.startDate,
              endDate: options.endDate,
              patientId: options.patientId
            })
            .returning('*')
            .execute();
            prescription = result.raw[0];
    
        return { prescription };
    }
  }
  