import { Resolver, Mutation, Arg, UseMiddleware, Query, FieldResolver, Root } from 'type-graphql';
import { isAuth } from '../middleware/isAuth';
import { Division } from '../entities/Division';
import { DivisionIdInput, DivisionInput } from './inputTypes/DivisionInput';
import { PatientIdDivisionIdInput } from './inputTypes/PatientInput';
import { DivisionResponse, PatientResponse } from './inputTypes/Response';
import { DivisionService } from '../services/DivisionService';

@Resolver(Division)
export class DivisionResolver {
	@FieldResolver(() => Boolean)
	async isComplete(@Root() division: Division): Promise<Boolean> {
		const divisionService = new DivisionService();
		return await divisionService.getDivisionIsComplete(division);
	}

	@Query(() => DivisionResponse)
	async divisionInfo(@Arg('options') options: DivisionIdInput): Promise<DivisionResponse> {
		const divisionService = new DivisionService();
		return await divisionService.getDivision(options);
	}

	@UseMiddleware(isAuth)
	@Query(() => PatientResponse)
	async requestList(@Arg('options') options: DivisionIdInput): Promise<PatientResponse> {
		const divisionService = new DivisionService();
		return await divisionService.getRequestList(options);
	}

	@Mutation(() => DivisionResponse)
	async createDivision(@Arg('options') options: DivisionInput): Promise<DivisionResponse> {
		const divisionService = new DivisionService();
		return await divisionService.addDivision(options);
	}

	@UseMiddleware(isAuth)
	@Mutation(() => PatientResponse)
	async admitPatient(@Arg('options') options: PatientIdDivisionIdInput): Promise<PatientResponse> {
		const divisionService = new DivisionService();
		return await divisionService.admitPatient(options);
	}

	@UseMiddleware(isAuth)
	@Mutation(() => PatientResponse)
	async requestPatientAdmission(@Arg('options') options: PatientIdDivisionIdInput): Promise<PatientResponse> {
		const divisionService = new DivisionService();
		return await divisionService.requestPatientAdmission(options);
	}
}
