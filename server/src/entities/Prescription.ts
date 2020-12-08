import { ObjectType, Field } from 'type-graphql';
import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	BaseEntity,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { Patient } from './Patient';

@ObjectType()
@Entity()
export class Prescription extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	name: string;

	@Field()
	@Column()
	unitsPerDay: number;

	@Field()
	@Column()
	numAdministrationsPerDay: number;

	@Field()
	@Column()
	methodOfAdministration: string;

	@Field()
	@Column()
	startDate: Date;

	@Field()
	@Column()
	endDate: Date;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;

	@Field()
	@Column()
	patientId: number;
	@ManyToOne(() => Patient, (patient) => patient.prescriptions)
	@JoinColumn({ name: 'patientId' })
	patient: Patient;
}
