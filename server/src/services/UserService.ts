import {getCustomRepository} from "typeorm";
import {UserRepository} from "../repositories/UserRepository";

export class UserService{
 //TODO: transfer logic form user resolver here

 static userRepository = getCustomRepository(UserRepository);

}