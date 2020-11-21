import {
  Resolver,
  Mutation,
  Arg,
  Field,
  Ctx,
  ObjectType,
  Query,
  FieldResolver,
  Root,
} from 'type-graphql';
import { Context } from '../types';
import { StaffMember } from '../entities/StaffMember';
import argon2 from 'argon2';
import { COOKIE_NAME } from '../constants';
import { StaffMemberInput } from './InputTypes/StaffMemberInput';
import { validateStaffMemberRegister } from '../utils/validateStaffMemberRegister';
import { getConnection } from 'typeorm';

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class StaffMemberResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => StaffMember, { nullable: true })
  staffMember?: StaffMember;
}

@Resolver(StaffMember)
export class StaffMemberResolver {
  @FieldResolver(() => String)
  email(@Root() user: StaffMember, @Ctx() { req }: Context) {
    // this is the current user and its ok to show them their own email
    if (req.session.userId === user.id) {
      return user.email;
    }
    // current user wants to see someone elses email
    return '';
  }

  @Query(() => StaffMember, { nullable: true })
  currentStaffMember(@Ctx() { req }: Context) {
    // you are not logged in
    if (!req.session.userId) {
      return null;
    }

    return StaffMember.findOne(req.session.userId);
  }

  @Mutation(() => StaffMemberResponse)
  async registerStaff(
    @Arg('options') options: StaffMemberInput,
    @Ctx() { req }: Context
  ): Promise<StaffMemberResponse> {
    const errors = validateStaffMemberRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    let staffMember;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(StaffMember)
        .values({
          firstName: options.firstName,
          lastName: options.lastName,
          email: options.email,
          password: hashedPassword,
          phone: options.phone,
          bipperExtension: options.bipperExtension,
          type: options.type
        })
        .returning('*')
        .execute();
        staffMember = result.raw[0];
    } catch (err) {
      // duplicate username error
      if (err.code === '23505') {
        return {
          errors: [
            {
              field: 'username',
              message: 'Username already taken',
            },
          ],
        };
      }
    }

    //set a cookie on the user
    req.session.userId = staffMember.id;
    return { staffMember };
  }

  @Mutation(() => StaffMemberResponse)
  async loginStaff(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { req }: Context
  ): Promise<StaffMemberResponse> {
    let errorCount = 0;
    const staffMember = await StaffMember.findOne(
      { where: { email: email } }
    );
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
    req.session.userId = staffMember!.id;

    return {
      staffMember,
    };
  }

  @Mutation(() => Boolean)
  logoutStaff(@Ctx() { req, res }: Context) {
    return new Promise((resolve) =>
      req.session.destroy((err: any) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
}
