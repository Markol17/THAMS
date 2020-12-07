export class StaffMember {
    public constructor(init?: Partial<StaffMember>) {
        Object.assign(this, init);
    }

    bipperExtension:number;
    email: string;
    firstName: string;
    lastName: string;
    type:string;
    phoneNumber?: string;
    password:string;
}
