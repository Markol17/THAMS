// import { isAuth } from "../middleware/isAuth";
// import { UseMiddleware } from "type-graphql";
import {getCustomRepository} from "typeorm";
import { DivisionRepository } from "../repositories/DivisionRepository";

export class DivisionService{
 //TODO: transfer logic form user resolver here

    static divisionRepository = getCustomRepository(DivisionRepository);

    // @UseMiddleware(isAuth)
    // getPatients(){
    //     return divisionRepository.getAll();
    // }

    // @UseMiddleware(isAuth)
    // registerPatient(){
    //     divisionRepository.
    // }
}