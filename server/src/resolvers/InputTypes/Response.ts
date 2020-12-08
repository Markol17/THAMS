import { Patient } from '../../entities/Patient';
import { StaffMember } from '../../entities/StaffMember';
import { Field, ObjectType } from 'type-graphql';
import { Prescription } from '../../entities/Prescription';
import { Division } from '../../entities/Division';

@ObjectType()
export class FieldError {
	@Field()
	field: string;

	@Field()
	message: string;
}

@ObjectType()
export class StaffMemberResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => StaffMember, { nullable: true })
	staffMember?: StaffMember;
}

@ObjectType()
export class PatientResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => Patient || [Patient], { nullable: true })
	patient?: Patient | Patient[];
}

@ObjectType()
export class PrescriptionResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => Prescription || [Prescription], { nullable: true })
	prescription?: Prescription | Prescription[];
}

@ObjectType()
export class DivisionResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => Division, { nullable: true })
	division?: Division | Division[];
}
