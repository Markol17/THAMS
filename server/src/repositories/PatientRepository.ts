import { Patient } from '../entities/Patient';
import {
	PatientIdDivisionIdInput,
	PatientIdInput,
	PatientInput,
	UpdatePatientInput,
} from '../resolvers/inputTypes/PatientInput';
import { EntityRepository, getConnection, Repository } from 'typeorm';

@EntityRepository(Patient)
export class PatientRepository extends Repository<Patient> {
	async getAll(): Promise<Patient[]> {
		return await this.find();
	}

	async getAllByDivisionId(divisionId: number): Promise<Patient[]> {
		return await this.find({ where: { divisionId: divisionId, isAdmitted: false } });
	}

	async createAndSavePatient(attributes: PatientInput): Promise<Patient> {
		const {
			firstName,
			lastName,
			insuranceNumber,
			address,
			phoneNumber,
			dateOfBirth,
			gender,
			maritalStatus,
			externalDoctor,
			nextOfKin,
			privateInsuranceNumber,
		} = attributes;
		const patient = new Patient();
		patient.firstName = firstName;
		patient.lastName = lastName;
		patient.insuranceNumber = insuranceNumber;
		patient.address = address;
		patient.phoneNumber = phoneNumber;
		patient.dateOfBirth = dateOfBirth;
		patient.gender = gender;
		patient.maritalStatus = maritalStatus;
		patient.externalDoctor = externalDoctor;
		patient.nextOfKin = nextOfKin;
		patient.privateInsuranceNumber = privateInsuranceNumber;
		return await this.save(patient);
	}

	async updateAndSavePatient(attributes: UpdatePatientInput): Promise<Patient> {
		const patient = await getConnection()
			.createQueryBuilder()
			.update(Patient)
			.set({
				firstName: attributes.firstName,
				lastName: attributes.lastName,
				address: attributes.address,
				phoneNumber: attributes.phoneNumber,
				gender: attributes.gender,
				maritalStatus: attributes.maritalStatus,
				nextOfKin: attributes.nextOfKin,
				privateInsuranceNumber: attributes.privateInsuranceNumber,
				insuranceNumber: attributes.insuranceNumber,
				externalDoctor: attributes.externalDoctor,
			})
			.where('id = :id', { id: attributes.patientId })
			.returning('*')
			.execute()
			.then((response) => {
				return response.raw[0];
			});

		return patient;
	}

	async getByPatientId(id: number): Promise<Patient | undefined> {
		return await this.findOne(id);
	}

	async dischargePatient(attributes: PatientIdInput): Promise<Patient> {
		const { patientId } = attributes;
		const patient = await getConnection()
			.createQueryBuilder()
			.update(Patient)
			.set({
				divisionId: undefined,
				isAdmitted: false,
				roomNumber: undefined,
				bedNumber: undefined,
			})
			.where('id = :id', { id: patientId })
			.returning('*')
			.execute()
			.then((response) => {
				return response.raw[0];
			});

		return patient;
	}

	async updateAndSaveAdmission(ids: PatientIdDivisionIdInput): Promise<Patient> {
		const { divisionId, patientId } = ids;
		const patient = await getConnection()
			.createQueryBuilder()
			.update(Patient)
			.set({
				divisionId: divisionId,
				isAdmitted: true,
				roomNumber: Math.floor(Math.random() * 10) + 1,
				bedNumber: Math.floor(Math.random() * 20) + 1,
			})
			.where('id = :id', { id: patientId })
			.returning('*')
			.execute()
			.then((response) => {
				return response.raw[0];
			});
		return patient;
	}

	async updateAndSaveAdmissionRequest(ids: PatientIdDivisionIdInput): Promise<Patient> {
		const { divisionId, patientId } = ids;
		const patient = await getConnection()
			.createQueryBuilder()
			.update(Patient)
			.set({
				divisionId: divisionId,
				isAdmitted: false,
			})
			.where('id = :id', { id: patientId })
			.returning('*')
			.execute()
			.then((response) => {
				return response.raw[0];
			});
		return patient;
	}

	async getNumOfAdmittedPatients(divisionId: number): Promise<number> {
		const patients = await this.find({ where: { divisionId: divisionId, isAdmitted: true } });
		return patients.length;
	}
}
