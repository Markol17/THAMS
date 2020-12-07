import { isAuth } from "../middleware/isAuth";
import { PatientIdInput, PatientInput, UpdatePatientInput } from "../resolvers/InputTypes/PatientInput";
import { PatientResponse } from "../resolvers/PatientResolver";
import { validatePatientRegister } from "../utils/validatePatientRegister";
import { UseMiddleware } from "type-graphql";
import {getCustomRepository} from "typeorm";
import { PatientRepository } from "../repositories/PatientRepository";
import { Patient } from "../entities/Patient";

export class PatientService{
    patientRepository: PatientRepository;

    constructor(){
        this.patientRepository = getCustomRepository(PatientRepository);
    }

    @UseMiddleware(isAuth)
    async getPatients(): Promise<Patient[]>{
        return await this.patientRepository.getAll();
    }

    @UseMiddleware(isAuth)
    async registerPatient(attributes: PatientInput): Promise<PatientResponse> {
        const errors = validatePatientRegister(attributes);
        if (errors) {
          return { errors };
        }
        const patient = await this.patientRepository.createAndSavePatient(attributes);
        return { patient };
    }

    @UseMiddleware(isAuth)
    async updatePatient(attributes: UpdatePatientInput): Promise<PatientResponse> {
        // const errors = validatePatientUpdate(attributes);
        // if (errors) {
        //   return { errors };
        // }
        const patient = await this.patientRepository.updateAndSavePatient(attributes);
        return { patient };
    } 

    @UseMiddleware(isAuth)
    async getPatient(patientId: PatientIdInput): Promise<PatientResponse | undefined>{
        const patient = await this.patientRepository.get(patientId.patientId);
        if(patient === undefined || patient === null){
            let errors: string | any[] = [];
            errors.push({
                field: 'Patient',
                message: 'Patient does not exists',
            })
            return { errors } ;
        }
        return { patient }; // I dont know how to fix this typescript issue 
    }
}