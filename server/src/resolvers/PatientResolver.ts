import { Resolver, Mutation, Arg, Query } from 'type-graphql'; //UseMiddleware
import { PatientIdInput, PatientInput, UpdatePatientInput } from './inputTypes/PatientInput';
import { Patient } from '../entities/Patient';
import { PatientService } from '../services/PatientService';
import { PatientResponse, PatientsResponse } from './inputTypes/Response';
// import { isAuth } from '../middleware/isAuth';

@Resolver(Patient)
export class PatientResolver {
	// @UseMiddleware(isAuth)
	@Query(() => PatientsResponse, { nullable: true })
	async patients(): Promise<PatientsResponse> {
		const patientService = new PatientService();
		return await patientService.getPatients();
	}

	// @UseMiddleware(isAuth)
	@Mutation(() => PatientResponse)
	async registerPatient(@Arg('options') options: PatientInput): Promise<PatientResponse> {
		const patientService = new PatientService();
		return await patientService.registerPatient(options);
	}

	// @UseMiddleware(isAuth)
	@Mutation(() => PatientResponse)
	async updatePatient(@Arg('options') options: UpdatePatientInput): Promise<PatientResponse> {
		const patientService = new PatientService();
		return await patientService.updatePatient(options);
	}

	// @UseMiddleware(isAuth)
	@Query(() => PatientResponse)
	async patientInfo(@Arg('options') options: PatientIdInput): Promise<PatientResponse | undefined> {
		const patientService = new PatientService();
		return await patientService.getPatient(options);
	}
}
