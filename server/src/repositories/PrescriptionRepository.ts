import { EntityRepository, Repository } from 'typeorm';
import { Prescription } from '../entities/Prescription';
import { addPrescriptionInput } from '../resolvers/inputTypes/PrescriptionInput';

@EntityRepository(Prescription)
export class PrescriptionRepository extends Repository<Prescription> {
	async getAllByPatientId(patientId: number): Promise<Prescription[]> {
		return await this.find({ where: { patientId: patientId } });
	}

	async createAndSavePrescription(attributes: addPrescriptionInput): Promise<Prescription> {
		const {
			name,
			unitsPerDay,
			numAdministrationsPerDay,
			methodOfAdministration,
			startDate,
			endDate,
			patientId,
		} = attributes;
		const prescription = new Prescription();
		prescription.name = name;
		prescription.unitsPerDay = unitsPerDay;
		prescription.numAdministrationsPerDay = numAdministrationsPerDay;
		prescription.methodOfAdministration = methodOfAdministration;
		prescription.startDate = startDate;
		prescription.endDate = endDate;
		prescription.patientId = patientId;
		return await this.save(prescription);
	}
}
