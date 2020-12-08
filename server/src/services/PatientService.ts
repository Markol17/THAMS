import { isAuth } from '../middleware/isAuth';
import { PatientIdInput, PatientInput, UpdatePatientInput } from '../resolvers/inputTypes/PatientInput';
import { validatePatientRegister } from '../utils/validatePatientRegister';
import { UseMiddleware } from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import { PatientRepository } from '../repositories/PatientRepository';
import { PatientResponse, PatientsResponse } from '../resolvers/inputTypes/Response';

export class PatientService {
	patientRepository: PatientRepository;

	constructor() {
		this.patientRepository = getCustomRepository(PatientRepository);
	}

	@UseMiddleware(isAuth)
	async getPatients(): Promise<PatientsResponse> {
		const patient = await this.patientRepository.getAll();
		return { patient };
	}

	@UseMiddleware(isAuth)
	async registerPatient(attributes: PatientInput): Promise<PatientResponse> {
		const errors = validatePatientRegister(attributes);
		if (errors) {
			return { errors };
		}
		const patient = await this.patientRepository.createAndSavePatient(attributes);
		return { patient };
	}

	@UseMiddleware(isAuth)
	async updatePatient(attributes: UpdatePatientInput): Promise<PatientResponse> {
		// TODO: validation
		// const errors = validatePatientUpdate(attributes);
		// if (errors) {
		//   return { errors };
		// }
		const patient = await this.patientRepository.updateAndSavePatient(attributes);
		return { patient };
	}

	@UseMiddleware(isAuth)
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
