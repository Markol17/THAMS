import { isAuth } from '../middleware/isAuth';
import { UseMiddleware } from 'type-graphql';
import { DivisionIdInput, DivisionInput } from '../resolvers/inputTypes/DivisionInput';
import { getCustomRepository } from 'typeorm';
import { DivisionRepository } from '../repositories/DivisionRepository';
import { DivisionResponse, PatientResponse, PatientsResponse } from '../resolvers/inputTypes/Response';
import { PatientRepository } from '../repositories/PatientRepository';
import { PatientIdDivisionIdInput } from '../resolvers/inputTypes/PatientInput';
import { Division } from '../entities/Division';

export class DivisionService {
	divisionRepository: DivisionRepository;
	patientRepository: PatientRepository;

	constructor() {
		this.divisionRepository = getCustomRepository(DivisionRepository);
		this.patientRepository = getCustomRepository(PatientRepository);
	}

	@UseMiddleware(isAuth)
	async getDivision(divisionId: number): Promise<DivisionResponse> {
		const division = await this.divisionRepository.getById(divisionId);
		if (division === undefined || division === null) {
			return {
				errors: [
					{
						field: 'division',
						message: 'Division does not exists',
					},
				],
			};
		}
		return { division };
	}

	async addDivision(attributes: DivisionInput): Promise<DivisionResponse> {
		// TODO: validation
		// const errors = validateDivisionRegister(options);
		// if (errors) {
		//   return { errors };
		// }

		const division = await this.divisionRepository.createAndSaveDivision(attributes);
		return { division };
	}

	@UseMiddleware(isAuth)
	async getRequestList(attributes: DivisionIdInput): Promise<PatientsResponse> {
		const patients = await this.patientRepository.getAllByDivisionId(attributes.divisionId);
		return { patients };
	}

	@UseMiddleware(isAuth)
	async admitPatient(attributes: PatientIdDivisionIdInput): Promise<PatientResponse> {
		const divisionResponse = await this.getDivision(attributes.divisionId);
		const division = divisionResponse.division;
		if (!division) {
			return {
				errors: [
					{
						field: 'division',
						message: 'Division does not exists',
					},
				],
			};
		}
		const isDivisionFull = this.getDivisionIsComplete(division!);
		if (isDivisionFull) {
			return {
				errors: [
					{
						field: 'division',
						message: 'Division is alrady full',
					},
				],
			};
		}
		const patient = await this.patientRepository.updateAndSaveAdmission(attributes);
		return { patient };
	}

	@UseMiddleware(isAuth)
	async requestPatientAdmission(attributes: PatientIdDivisionIdInput): Promise<PatientResponse> {
		const patient = await this.patientRepository.updateAndSaveAdmissionRequest(attributes);
		return { patient };
	}

	async getDivisionIsComplete(division: Division): Promise<Boolean> {
		const numBedsTaken = await this.patientRepository.getNumOfAdmittedPatients(division.id);
		if (numBedsTaken >= division.numBeds) {
			return true;
		}
		return false;
	}
}
