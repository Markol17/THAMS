import {
    Resolver,
    Mutation,
    Arg,
    UseMiddleware,
    Query,
  } from 'type-graphql';
import { AdmitPatientInput } from './InputTypes/PatientInput';
import { Patient } from '../entities/Patient';
import { isAuth } from '../middleware/isAuth';
import { Division } from '../entities/Division';

  @Resolver(Division)
  export class DivisionResolver {

    @UseMiddleware(isAuth)
    @Query(() => Division, {nullable: true})
    async divisionInfo(
      @Arg('divisionId') divisionId: number,
    ){ return await Division.findOne({id: divisionId}); }

    @UseMiddleware(isAuth)
    @Query(() => [Patient], {nullable: true})
    async requestList(
      @Arg('divisionId') divisionId: number,
    ) { return await Division.find({where: { divisionId: divisionId, isAdmitted: false} }); }
  
    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async admitPatient(
      @Arg('ids') ids: AdmitPatientInput,
    ): Promise<Boolean> {
        const { divisionId, patientId } = ids;
        await Patient.update({id: patientId}, {divisionId: divisionId, isAdmitted: true});
        return true;
    }

    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async requestPatientAdmission(
      @Arg('ids') ids: AdmitPatientInput,
    ): Promise<Boolean> {
    //     const { divisionId, patientId } = ids;
    //     const result = await Patient.update({id: patientId}, {divisionId: divisionId, isAdmitted: true});
    //     const patient = result.raw[0];
    //     return { patient };
    const { divisionId, patientId } = ids;
    await Patient.update({id: patientId}, {divisionId: divisionId, isAdmitted: false});
    return true;
    }

    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async dischargePatient(
      @Arg('patientId') patientId: number,
    ): Promise<Boolean> {
        await Patient.update({id: patientId}, {divisionId: -1, isAdmitted: false});
        return true;
    }
  }
  