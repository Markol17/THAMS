import { StaffMember } from './staff-member.model'

export class Division {

    id?: number
    name: string
    description?: string
    chargeNurseId?: StaffMember
    location?: string
    numBeds?: number
    phoneNumber?: string
    isComplete?: boolean
    createdAt?: string
    updatedAt?: string

}
