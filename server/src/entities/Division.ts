import { ObjectType, Field } from 'type-graphql';
import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	BaseEntity,
	OneToMany,
	JoinColumn,
	OneToOne,
} from 'typeorm';
import { Patient } from './Patient';
import { StaffMember } from './StaffMember';

@ObjectType()
@Entity()
export class Division extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ unique: true })
	name: string;

	@Field()
	@Column()
	description: string;

	@Field(() => StaffMember)
	@Column()
	chargeNurseId: number;
	@OneToOne(() => StaffMember)
	@JoinColumn({ name: 'chargeNurseId' })
	chargeNurse: StaffMember;

	@Field()
	@Column()
	location: string;

	@Field()
	@Column()
	numBeds: number;

	@Field()
	@Column()
	phoneNumber: string;

	@Field()
	isComplete: boolean; //status

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;

	@OneToMany(() => Patient, (patient) => patient.division)
	patients: Patient[];
}
