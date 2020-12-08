import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Patient } from './Patient';
import { StaffMember } from './StaffMember';

// This entity represent the join table for Patient and StaffMember so it doesn't show up on any context map.
// It represent the many to many relationship between Patient and StaffMember.
// The reason we created an entity for this table is because we might need to add other attributes in the future making it more scalable
@Entity()
export class StaffMemberPatient extends BaseEntity {
	@PrimaryColumn()
	patientId: number;

	@PrimaryColumn()
	staffMemberId: number;

	@ManyToOne(() => Patient, (patient) => patient.staffMemberConnection, {
		primary: true,
	})
	@JoinColumn({ name: 'patientId' })
	patient: Promise<Patient>;

	@ManyToOne(() => StaffMember, (staffMember) => staffMember.patientConnection, {
		primary: true,
	})
	@JoinColumn({ name: 'staffMemberId' })
	staffMember: Promise<StaffMember>;
}
