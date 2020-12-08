import { InputType, Field } from 'type-graphql';
@InputType()
export class addPrescriptionInput {
	@Field()
	name: string;

	@Field()
	unitsPerDay: number;

	@Field()
	numAdministrationsPerDay: number;

	@Field()
	methodOfAdministration: string;

	@Field()
	startDate: Date;

	@Field()
	endDate: Date;

	@Field()
	patientId: number;
}
