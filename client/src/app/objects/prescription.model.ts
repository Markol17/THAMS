export class Prescription {
    id: number;
    name:string;
    unitsPerDay: number;
    numAdministrationsPerDay: number;
    methodOfAdministration: string;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
    patientId: string;
}
