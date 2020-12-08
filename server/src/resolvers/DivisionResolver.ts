import { Resolver, Mutation, Arg, Query, FieldResolver, Root } from 'type-graphql';
import { Division } from '../entities/Division';
import { DivisionIdInput, DivisionInput } from './inputTypes/DivisionInput';
import { PatientIdDivisionIdInput } from './inputTypes/PatientInput';
import { DivisionResponse, PatientResponse, PatientsResponse } from './inputTypes/Response';
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
		return await divisionService.getDivision(options.divisionId);
	}

	@Query(() => PatientsResponse)
	async requestList(@Arg('options') options: DivisionIdInput): Promise<PatientsResponse> {
		const divisionService = new DivisionService();
		return await divisionService.getRequestList(options);
	}

	@Mutation(() => DivisionResponse)
	async createDivision(@Arg('options') options: DivisionInput): Promise<DivisionResponse> {
		const divisionService = new DivisionService();
		return await divisionService.addDivision(options);
	}

	@Mutation(() => PatientResponse)
	async admitPatient(@Arg('options') options: PatientIdDivisionIdInput): Promise<PatientResponse> {
		const divisionService = new DivisionService();
		return await divisionService.admitPatient(options);
	}

	@Mutation(() => PatientResponse)
	async requestPatientAdmission(@Arg('options') options: PatientIdDivisionIdInput): Promise<PatientResponse> {
		const divisionService = new DivisionService();
		return await divisionService.requestPatientAdmission(options);
	}
}
