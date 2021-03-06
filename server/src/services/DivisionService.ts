import { DivisionIdInput, DivisionInput } from '../resolvers/inputTypes/DivisionInput';
import { getCustomRepository } from 'typeorm';
import { DivisionRepository } from '../repositories/DivisionRepository';
import {
	DivisionResponse,
	DivisionsResponse,
	PatientResponse,
	PatientsResponse,
} from '../resolvers/inputTypes/Response';
import { PatientRepository } from '../repositories/PatientRepository';
import { PatientIdDivisionIdInput } from '../resolvers/inputTypes/PatientInput';
import { Division } from '../entities/Division';
import { validateDivisionCreation } from '../utils/validateDivisionCreation';

export class DivisionService {
	divisionRepository: DivisionRepository;
	patientRepository: PatientRepository;

	constructor() {
		this.divisionRepository = getCustomRepository(DivisionRepository);
		this.patientRepository = getCustomRepository(PatientRepository);
	}

	async getDivisions(): Promise<DivisionsResponse> {
		const divisions = await this.divisionRepository.getAll();
		return { divisions };
	}

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
		const errors = validateDivisionCreation(attributes);
		if (errors) {
			return { errors };
		}

		const division = await this.divisionRepository.createAndSaveDivision(attributes);
		if (!division) {
			return {
				errors: [
					{
						field: 'name or chargeNurseId',
						message: 'A division already exists with that name or that charge nurse is already assigned to a division',
					},
				],
			};
		}
		return { division };
	}

	async getRequestList(attributes: DivisionIdInput): Promise<PatientsResponse> {
		const patients = await this.patientRepository.getAllByDivisionId(attributes.divisionId);
		return { patients };
	}

	async admitPatient(attributes: PatientIdDivisionIdInput): Promise<PatientResponse> {
		const divisionResponse = await this.getDivision(attributes.divisionId);
		const division = divisionResponse.division;
		if (!division) {
			return {
				errors: [
					{
						field: 'division',
						message: 'Division does not exist',
					},
				],
			};
		}
		const isDivisionFull = await this.getDivisionIsComplete(division);
		if (isDivisionFull) {
			// could call requestPatientAdmission but no need because it is being called in the frontend
			return {
				errors: [
					{
						field: 'division',
						message: 'Division is already full',
					},
				],
			};
		}
		const patient = await this.patientRepository.updateAndSaveAdmission(attributes);
		return { patient };
	}

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
