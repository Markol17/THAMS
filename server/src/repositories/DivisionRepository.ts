import { Division } from '../entities/Division';
import { DivisionInput } from '../resolvers/inputTypes/DivisionInput';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Division)
export class DivisionRepository extends Repository<Division> {
	async getById(divisionId: number): Promise<Division | undefined> {
		return await this.findOne(divisionId);
	}

	async createAndSaveDivision(attributes: DivisionInput): Promise<Division> {
		const { name, description, chargeNurseId, location, numBeds, phoneNumber } = attributes;
		const division = new Division();
		division.name = name;
		division.description = description;
		division.chargeNurseId = chargeNurseId;
		division.location = location;
		division.numBeds = numBeds;
		division.phoneNumber = phoneNumber;
		return await this.save(division);
	}
}
