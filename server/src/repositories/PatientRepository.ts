import { Patient } from "../entities/Patient";
import { PatientInput, UpdatePatientInput } from "../resolvers/InputTypes/PatientInput";
import {EntityRepository, getConnection, Repository} from "typeorm";

@EntityRepository(Patient)
export class PatientRepository  extends Repository<Patient>{

    async getAll(): Promise<Patient[]>{
        return await this.find();
    }

    async createAndSavePatient(attributes: PatientInput): Promise<Patient>{
        const {firstName, lastName, insuranceNumber, address, phoneNumber, dateOfBirth, gender, maritalStatus, externalDoctor, nextOfKin, privateInsuranceNumber} = attributes;
        const patient = new Patient();
        patient.firstName = firstName;
        patient.lastName = lastName;
        patient.insuranceNumber = insuranceNumber;
        patient.address = address;
        patient.phoneNumber = phoneNumber;
        patient.dateOfBirth = dateOfBirth;
        patient.gender = gender;
        patient.maritalStatus = maritalStatus;
        patient.externalDoctor = externalDoctor;
        patient.nextOfKin = nextOfKin;
        patient.privateInsuranceNumber = privateInsuranceNumber;
        return await this.save(patient);
    }

    async updateAndSavePatient(attributes: UpdatePatientInput): Promise<Patient>{
        let patient;
        const result = await getConnection()
          .createQueryBuilder()
          .update(Patient)
          .set({ 
            address: attributes.address ,
            phoneNumber: attributes.phoneNumber,
            gender: attributes.gender,
            maritalStatus: attributes.maritalStatus,
            nextOfKin: attributes.nextOfKin,
            privateInsuranceNumber: attributes.privateInsuranceNumber
          })
          .where("id = :id", { id: attributes.patientId })
          .execute();
          patient = result.raw[0];
  
      return patient;
    }

    async get(id: number): Promise<Patient | undefined>{
        return this.findOne(id)
    }
}