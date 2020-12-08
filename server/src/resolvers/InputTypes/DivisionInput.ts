import { InputType, Field } from 'type-graphql';

@InputType()
export class DivisionInput {
	@Field()
	name: string;

	@Field()
	description: string;

	@Field()
	chargeNurseId: number;

	@Field()
	location: string;

	@Field()
	numBeds: number;

	@Field()
	phoneNumber: string;
}

@InputType()
export class DivisionIdInput {
	@Field()
	divisionId: number;
}
