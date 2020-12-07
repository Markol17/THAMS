export class Patient {
    firstName:string;
    lastName:string;
    insuranceNumber:number;
    address:string;
    phoneNumber:string;
    dateOfBirth:Date;
    gender:string;
    maritalStatus:string;
    externalDoctor?:string;
    nextOfKin?:string;
    privateInsuranceNumber?:number;
    id?:number;
    roomNumber:number;
    bedNumber:number;
    isAdmitted:boolean;
    createdAt:string;
    updatedAt:string;
    divisionId:number;
}
