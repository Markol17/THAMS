import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import { PatientIdInput, PatientInput, UpdatePatientInput } from './inputTypes/PatientInput';
import { Patient } from '../entities/Patient';
import { PatientService } from '../services/PatientService';
import { PatientResponse, PatientsResponse } from './inputTypes/Response';

@Resolver(Patient)
export class PatientResolver {
	@Query(() => PatientsResponse, { nullable: true })
	async patients(): Promise<PatientsResponse> {
		const patientService = new PatientService();
		return await patientService.getPatients();
	}

	@Mutation(() => PatientResponse)
	async registerPatient(@Arg('options') options: PatientInput): Promise<PatientResponse> {
		const patientService = new PatientService();
		return await patientService.registerPatient(options);
	}

	@Mutation(() => PatientResponse)
	async updatePatient(@Arg('options') options: UpdatePatientInput): Promise<PatientResponse> {
		const patientService = new PatientService();
		return await patientService.updatePatient(options);
	}

	@Query(() => PatientResponse)
	async patientInfo(@Arg('options') options: PatientIdInput): Promise<PatientResponse | undefined> {
		const patientService = new PatientService();
		return await patientService.getPatient(options);
	}
}
