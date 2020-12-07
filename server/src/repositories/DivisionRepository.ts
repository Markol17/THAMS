import {EntityRepository, EntityManager} from "typeorm";
import {StaffMember} from "../entities/StaffMember";

@EntityRepository()
export class DivisionRepository {

    constructor(private manager: EntityManager) {
    }

    createAndSaveStaffMember(email: string, firstName: string, lastName: string, phoneNumber: string, bipperExtension: number, hashedPassword: string): Promise<StaffMember>{
        const staffMember = new StaffMember();
        staffMember.email = email;
        staffMember.firstName = firstName;
        staffMember.lastName = lastName;
        staffMember.phoneNumber = phoneNumber;
        staffMember.bipperExtension = bipperExtension;
        staffMember.password = hashedPassword;
        return this.manager.save(staffMember);
    }

}