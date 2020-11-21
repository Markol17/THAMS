import {EntityRepository, EntityManager} from "typeorm";
import {StaffMember} from "../entities/StaffMember";

@EntityRepository()
export class StaffMemberRepository {

    constructor(private manager: EntityManager) {
    }

    createAndSaveStaffMember(email: string, firstName: string, lastName: string, phone: number, bipperExtension: number, hashedPassword: string): Promise<StaffMember>{
        const staffMember = new StaffMember();
        staffMember.email = email;
        staffMember.firstName = firstName;
        staffMember.lastName = lastName;
        staffMember.phone = phone;
        staffMember.bipperExtension = bipperExtension;
        staffMember.password = hashedPassword;
        return this.manager.save(staffMember);
    }

}