import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Division } from './Division';
import { Prescription } from './Prescription';
import { StaffMember } from './StaffMember';
import { StaffMemberPatient } from './StaffMemberPatient';

@ObjectType()
@Entity()
export class Patient extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  insuranceNumber: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  phoneNumber: number;
  
  @Field(() => String)
  @Column()
  dateOfBirth: Date;

  @Field()
  @Column()
  gender: string;

  @Field()
  @Column()
  maritalStatus: string;

  @Field()
  @Column({ nullable: true })
  externalDoctor: string;

  @Field()
  @Column()
  nextOfKin: string;

  @Field()
  @Column({ nullable: true })
  privateInsuranceNumber: number;

  @Field()
  @Column({ nullable: true })
  roomNumber: number;

  @Field()
  @Column({ nullable: true })
  bedNumber: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => StaffMember)
  localDoctor: StaffMember;

  @OneToMany(() => StaffMemberPatient, (smp) => smp.staffMember)
  staffMemberConnection: Promise<StaffMemberPatient[]>;

  @OneToMany(() => Prescription, prescription => prescription.patient)
  prescriptions: Prescription[];

  @ManyToOne(() => Division, division => division.patients)
  division: Division;
}
