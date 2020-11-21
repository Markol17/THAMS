import {getCustomRepository} from "typeorm";
import {StaffMemberRepository} from "../repositories/StaffMemberRepository";

export class StaffMemberService{
 //TODO: transfer logic form user resolver here

 static userRepository = getCustomRepository(StaffMemberRepository);

}