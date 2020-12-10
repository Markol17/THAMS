import { Resolver, Mutation, Arg, Query, FieldResolver, Root } from 'type-graphql'; //UseMiddleware
import { Division } from '../entities/Division';
import { DivisionIdInput, DivisionInput } from './inputTypes/DivisionInput';
import { PatientIdDivisionIdInput } from './inputTypes/PatientInput';
import { DivisionResponse, DivisionsResponse, PatientResponse, PatientsResponse } from './inputTypes/Response';
import { DivisionService } from '../services/DivisionService';
// import { isAuth } from '../middleware/isAuth';

@Resolver(Division)
export class DivisionResolver {
	@FieldResolver(() => Boolean)
	async isComplete(@Root() division: Division): Promise<Boolean> {
		const divisionService = new DivisionService();
		return await divisionService.getDivisionIsComplete(division);
	}

	// @UseMiddleware(isAuth)
	@Query(() => DivisionResponse)
	async divisionInfo(@Arg('options') options: DivisionIdInput): Promise<DivisionResponse> {
		const divisionService = new DivisionService();
		return await divisionService.getDivision(options.divisionId);
	}

	// @UseMiddleware(isAuth)
	@Query(() => DivisionsResponse, { nullable: true })
	async divisions(): Promise<DivisionsResponse> {
		const divisionService = new DivisionService();
		return await divisionService.getDivisions();
	}

	// @UseMiddleware(isAuth)
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

	// @UseMiddleware(isAuth)
	@Mutation(() => PatientResponse)
	async admitPatient(@Arg('options') options: PatientIdDivisionIdInput): Promise<PatientResponse> {
		const divisionService = new DivisionService();
		return await divisionService.admitPatient(options);
	}

	// @UseMiddleware(isAuth)
	@Mutation(() => PatientResponse)
	async requestPatientAdmission(@Arg('options') options: PatientIdDivisionIdInput): Promise<PatientResponse> {
		const divisionService = new DivisionService();
		return await divisionService.requestPatientAdmission(options);
	}
}
