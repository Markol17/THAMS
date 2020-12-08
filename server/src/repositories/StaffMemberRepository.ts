import { StaffMemberInput } from '../resolvers/inputTypes/StaffMemberInput';
import { EntityRepository, Repository } from 'typeorm';
import { StaffMember } from '../entities/StaffMember';

@EntityRepository(StaffMember)
export class StaffMemberRepository extends Repository<StaffMember> {
	async getByStaffMemberId(id: number): Promise<StaffMember | undefined> {
		return await this.findOne(id);
	}

	async createAndSaveStaffMember(attributes: StaffMemberInput): Promise<StaffMember | void> {
		const { email, firstName, lastName, phoneNumber, bipperExtension, type, password } = attributes;
		const staffMember = new StaffMember();
		staffMember.email = email;
		staffMember.firstName = firstName;
		staffMember.lastName = lastName;
		staffMember.phoneNumber = phoneNumber;
		staffMember.bipperExtension = bipperExtension;
		staffMember.password = password;
		staffMember.type = type;
		try {
			return await this.save(staffMember);
		} catch (err) {
			if (err.code === '23505') {
				return;
			}
		}
	}

	async getByStaffMemberEmail(email: string): Promise<StaffMember | undefined> {
		return await this.findOne({ where: { email: email } });
	}
}
