import { Resolver, Mutation, Arg, Query } from 'type-graphql'; //UseMiddleware
import { PatientIdInput } from './inputTypes/PatientInput';
import { Prescription } from '../entities/Prescription';
import { addPrescriptionInput } from './inputTypes/PrescriptionInput';
import { PrescriptionService } from '../services/PrescriptionService';
import { PrescriptionResponse, PrescriptionsResponse } from './inputTypes/Response';
// import { isAuth } from '../middleware/isAuth';

@Resolver(Prescription)
export class PrescriptionResolver {
	// @UseMiddleware(isAuth)
	@Query(() => PrescriptionsResponse)
	async patientPrescriptions(@Arg('options') options: PatientIdInput): Promise<PrescriptionsResponse> {
		const prescriptionService = new PrescriptionService();
		return await prescriptionService.getPrescritions(options);
	}

	// @UseMiddleware(isAuth)
	@Mutation(() => PrescriptionResponse)
	async addPrescription(@Arg('options') options: addPrescriptionInput): Promise<PrescriptionResponse> {
		const prescriptionService = new PrescriptionService();
		return await prescriptionService.addPrescription(options);
	}
}
