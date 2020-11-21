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
  phone: number;
  @Field()
  bipperExtension: number;
  @Field()
  password: string;
}
