import { PatientIdInput } from '../resolvers/inputTypes/PatientInput';
import { getCustomRepository } from 'typeorm';
import { PrescriptionRepository } from '../repositories/PrescriptionRepository';
import { addPrescriptionInput } from '../resolvers/inputTypes/PrescriptionInput';
import { PrescriptionResponse, PrescriptionsResponse } from '../resolvers/inputTypes/Response';

export class PrescriptionService {
	prescriptionRepository: PrescriptionRepository;

	constructor() {
		this.prescriptionRepository = getCustomRepository(PrescriptionRepository);
	}

	async getPrescritions(options: PatientIdInput): Promise<PrescriptionsResponse> {
		const prescriptions = await this.prescriptionRepository.getAllByPatientId(options.patientId);
		if (prescriptions === undefined || prescriptions === null || prescriptions.length === 0) {
			return {
				errors: [
					{
						field: 'prescriptions',
						message: 'No prescriptions associated with this patient',
					},
				],
			};
		}
		return { prescriptions };
	}

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
