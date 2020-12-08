import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import { PatientIdInput } from './inputTypes/PatientInput';
import { Prescription } from '../entities/Prescription';
import { addPrescriptionInput } from './inputTypes/PrescriptionInput';
import { PrescriptionService } from '../services/PrescriptionService';
import { PrescriptionResponse } from './inputTypes/Response';

@Resolver(Prescription)
export class PrescriptionResolver {
	@Query(() => PrescriptionResponse)
	async patientPrescriptions(@Arg('options') options: PatientIdInput): Promise<PrescriptionResponse> {
		const prescriptionService = new PrescriptionService();
		return await prescriptionService.getPrescritions(options);
	}

	@Mutation(() => PrescriptionResponse)
	async addPrescription(@Arg('options') options: addPrescriptionInput): Promise<PrescriptionResponse> {
		const prescriptionService = new PrescriptionService();
		return await prescriptionService.addPrescription(options);
	}
}
