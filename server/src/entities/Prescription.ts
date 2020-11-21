import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  ManyToOne,
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
    unitsPerDay: string;
  
    @Field()
    @Column()
    numAdministrationsPerDay: number;
  
    @Field()
    @Column()
    methodOfAdministration: string;
  
    @Field(() => String)
    @Column()
    startDate: Date;
  
    @Field(() => String)
    @Column()
    endDate: Date;
  
    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;
  
    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Patient, patient => patient.prescriptions)
    patient: Patient;
}
