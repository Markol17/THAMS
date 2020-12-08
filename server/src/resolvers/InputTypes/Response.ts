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

	@Field(() => Patient, { nullable: true })
	patient?: Patient;
}

@ObjectType()
export class PatientsResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => [Patient], { nullable: true })
	patients?: Patient[];
}

@ObjectType()
export class PrescriptionResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => Prescription, { nullable: true })
	prescription?: Prescription;
}

@ObjectType()
export class PrescriptionsResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => [Prescription], { nullable: true })
	prescriptions?: Prescription[];
}

@ObjectType()
export class DivisionResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => Division, { nullable: true })
	division?: Division;
}

@ObjectType()
export class DivisionsResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => [Division], { nullable: true })
	divisions?: Division[];
}
