import { ObjectType, Field, registerEnumType } from 'type-graphql';
import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	BaseEntity,
	OneToMany,
} from 'typeorm';
import { Patient } from './Patient';
import { StaffMemberPatient } from './StaffMemberPatient';

export enum Type {
	ChargeNurse, //0
	Doctor, //1
	Staff, //2
	MedicalStaff, //3
}

registerEnumType(Type, {
	name: 'Type',
	description: 'Staff members roles',
});

@ObjectType()
@Entity()
export class StaffMember extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	firstName: string;

	@Field()
	@Column()
	lastName: string;

	@Field()
	@Column({ unique: true })
	email: string;

	@Field()
	@Column()
	phoneNumber: string;

	@Field()
	@Column()
	bipperExtension: number;

	@Column()
	password: string;

	@Field(() => Type)
	@Column()
	type: Type;

	@Field()
	@CreateDateColumn()
	createdAt: Date;

	@Field()
	@UpdateDateColumn()
	updatedAt: Date;

	patients: Patient[];

	@OneToMany(() => StaffMemberPatient, (smp) => smp.patient)
	patientConnection: Promise<StaffMemberPatient[]>;
}
