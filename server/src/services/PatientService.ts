import { PatientIdInput, PatientInput, UpdatePatientInput } from '../resolvers/inputTypes/PatientInput';
import { validatePatientRegister } from '../utils/validatePatientRegister';
import { getCustomRepository } from 'typeorm';
import { PatientRepository } from '../repositories/PatientRepository';
import { PatientResponse, PatientsResponse } from '../resolvers/inputTypes/Response';
import { validatePatientUpdate } from '../utils/validatePatientUpdate';

export class PatientService {
	patientRepository: PatientRepository;

	constructor() {
		this.patientRepository = getCustomRepository(PatientRepository);
	}

	async getPatients(): Promise<PatientsResponse> {
		const patients = await this.patientRepository.getAll();
		return { patients };
	}

	async registerPatient(attributes: PatientInput): Promise<PatientResponse> {
		const errors = validatePatientRegister(attributes);
		if (errors) {
			return { errors };
		}
		const patient = await this.patientRepository.createAndSavePatient(attributes);
		return { patient };
	}

	async updatePatient(attributes: UpdatePatientInput): Promise<PatientResponse> {
		const errors = validatePatientUpdate(attributes);
		if (errors) {
			return { errors };
		}
		const patient = await this.patientRepository.updateAndSavePatient(attributes);
		return { patient };
	}

	async getPatient(patientId: PatientIdInput): Promise<PatientResponse> {
		const patient = await this.patientRepository.getByPatientId(patientId.patientId);
		if (patient === undefined || patient === null) {
			return {
				errors: [
					{
						field: 'patient',
						message: 'Patient does not exists',
					},
				],
			};
		}
		return { patient };
	}
}
