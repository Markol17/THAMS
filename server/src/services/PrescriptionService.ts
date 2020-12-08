import { isAuth } from '../middleware/isAuth';
import { PatientIdInput } from '../resolvers/inputTypes/PatientInput';
import { UseMiddleware } from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import { PrescriptionRepository } from '../repositories/PrescriptionRepository';
import { addPrescriptionInput } from '../resolvers/inputTypes/PrescriptionInput';
import { PrescriptionResponse } from '../resolvers/inputTypes/Response';

export class PrescriptionService {
	prescriptionRepository: PrescriptionRepository;

	constructor() {
		this.prescriptionRepository = getCustomRepository(PrescriptionRepository);
	}

	@UseMiddleware(isAuth)
	async getPrescritions(options: PatientIdInput): Promise<PrescriptionResponse> {
		const prescription = await this.prescriptionRepository.getAllByPatientId(options.patientId);
		if (prescription === undefined || prescription === null || prescription.length === 0) {
			return {
				errors: [
					{
						field: 'prescriptions',
						message: 'No prescriptions associated with this patient',
					},
				],
			};
		}
		return { prescription };
	}

	@UseMiddleware(isAuth)
	async addPrescription(attributes: addPrescriptionInput): Promise<PrescriptionResponse> {
		// TODO: do validation
		// const errors = validatePatientRegister(attributes);
		// if (errors) {
		//   return { errors };
		// }
		const prescription = await this.prescriptionRepository.createAndSavePrescription(attributes);
		return { prescription };
	}
}
