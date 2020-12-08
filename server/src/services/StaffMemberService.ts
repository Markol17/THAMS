import { isAuth } from '../middleware/isAuth';
import { UseMiddleware } from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import argon2 from 'argon2';
import { COOKIE_NAME } from '../constants';
import { StaffMemberRepository } from '../repositories/StaffMemberRepository';
import { Context } from '../types';
import { PatientResponse, StaffMemberResponse } from '../resolvers/inputTypes/Response';
import { StaffMemberInput } from '../resolvers/inputTypes/StaffMemberInput';
import { validateStaffMemberRegister } from '../utils/validateStaffMemberRegister';
import { PatientRepository } from '../repositories/PatientRepository';
import { PatientIdInput } from '../resolvers/inputTypes/PatientInput';

export class StaffMemberService {
	staffmemberRepository: StaffMemberRepository;
	patientRepository: PatientRepository;

	constructor() {
		this.staffmemberRepository = getCustomRepository(StaffMemberRepository);
		this.patientRepository = getCustomRepository(PatientRepository);
	}

	@UseMiddleware(isAuth)
	async getCurrentStaffMember(context: Context): Promise<StaffMemberResponse> {
		const { userId } = context.req.session.userId;
		if (!userId) {
			return {
				errors: [
					{
						field: 'staffMember',
						message: 'No staff member in current session',
					},
				],
			};
		}

		const staffMember = await this.staffmemberRepository.getByStaffMemberId(userId);
		return { staffMember };
	}

	async registerStaffMember(context: Context, attributes: StaffMemberInput): Promise<StaffMemberResponse> {
		const { password } = attributes;
		const errors = validateStaffMemberRegister(attributes);
		if (errors) {
			return { errors };
		}

		const hashedPassword = await argon2.hash(password);
		attributes.password = hashedPassword;
		const staffMember = await this.staffmemberRepository.createAndSaveStaffMember(attributes);
		if (!staffMember) {
			return {
				errors: [
					{
						field: 'email',
						message: 'An account already exists with that email',
					},
				],
			};
		}
		//set a cookie on the user
		context.req.session.userId = staffMember.id;
		return { staffMember };
	}

	async loginStaffMember(context: Context, email: string, password: string): Promise<StaffMemberResponse> {
		let errorCount = 0;
		const staffMember = await this.staffmemberRepository.getByStaffMemberEmail(email);
		if (!staffMember) {
			errorCount++;
		}
		if (!!staffMember) {
			const valid = await argon2.verify(staffMember.password, password);
			if (!valid) {
				errorCount++;
			}
		}

		if (errorCount !== 0) {
			return {
				errors: [
					{
						field: 'email',
						message: 'Incorrect password and email combination',
					},
					{
						field: 'password',
						message: 'Incorrect password and email combination',
					},
				],
			};
		}
		context.req.session.userId = staffMember!.id;

		return {
			staffMember,
		};
	}

	@UseMiddleware(isAuth)
	async dischargePatient(ids: PatientIdInput): Promise<PatientResponse> {
		const patient = await this.patientRepository.dischargePatient(ids);
		// TODO: validation
		// const errors = validatePatientUpdate(attributes);
		// if (errors) {
		//   return { errors };
		// }
		return { patient };
	}

	@UseMiddleware(isAuth)
	async logoutStaff(context: Context): Promise<boolean> {
		return await new Promise((resolve) =>
			context.req.session.destroy((err: any) => {
				context.res.clearCookie(COOKIE_NAME);
				if (err) {
					resolve(false);
					return;
				}

				resolve(true);
			})
		);
	}
}
