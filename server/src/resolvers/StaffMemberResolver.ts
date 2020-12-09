import { Resolver, Mutation, Arg, Ctx, Query, UseMiddleware } from 'type-graphql';
import { Context } from '../types';
import { StaffMember } from '../entities/StaffMember';
import { StaffMemberInput } from './inputTypes/StaffMemberInput';
import { PatientIdInput } from './inputTypes/PatientInput';
import { StaffMemberService } from '../services/StaffMemberService';
import { PatientResponse, StaffMemberResponse } from './inputTypes/Response';
import { isAuth } from '../middleware/isAuth';

@Resolver(StaffMember)
export class StaffMemberResolver {
	@UseMiddleware(isAuth)
	@Query(() => StaffMemberResponse)
	async currentStaffMember(@Ctx() context: Context): Promise<StaffMemberResponse | undefined> {
		const staffMemberService = new StaffMemberService();
		return await staffMemberService.getCurrentStaffMember(context);
	}

	@Mutation(() => StaffMemberResponse)
	async registerStaff(
		@Arg('options') options: StaffMemberInput,
		@Ctx() context: Context
	): Promise<StaffMemberResponse> {
		const staffMemberService = new StaffMemberService();
		return await staffMemberService.registerStaffMember(context, options);
	}

	@Mutation(() => StaffMemberResponse)
	async loginStaff(
		@Arg('email') email: string,
		@Arg('password') password: string,
		@Ctx() context: Context
	): Promise<StaffMemberResponse> {
		const staffMemberService = new StaffMemberService();
		return await staffMemberService.loginStaffMember(context, email, password);
	}

	@Mutation(() => Boolean)
	logoutStaff(@Ctx() context: Context): Promise<boolean> {
		const staffMemberService = new StaffMemberService();
		return staffMemberService.logoutStaff(context);
	}

	@UseMiddleware(isAuth)
	@Mutation(() => PatientResponse)
	async dischargePatient(@Arg('options') options: PatientIdInput): Promise<PatientResponse> {
		const staffMemberService = new StaffMemberService();
		return await staffMemberService.dischargePatient(options);
	}
}
