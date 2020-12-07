import { Type } from "../../entities/StaffMember";
import { InputType, Field } from "type-graphql";
@InputType()
export class StaffMemberInput {
  @Field()
  email: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  phoneNumber: string;
  @Field()
  bipperExtension: number;
  @Field()
  type: Type;
  @Field()
  password: string;
}
