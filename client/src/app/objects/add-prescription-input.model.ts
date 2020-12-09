export class AddPrescriptionInput {
    public constructor(init?: Partial<AddPrescriptionInput>) {
        Object.assign(this, init);
    }
    name: string;
    unitsPerDay: number;
    numAdministrationsPerDay: number;
    methodOfAdministration: string;
    startDate: Date;
    endDate: Date;
    patientId: number;
}
