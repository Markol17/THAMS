import DataLoader from 'dataloader';
import { Patient } from '../entities/Patient';

export const createPatientLoader = () =>
  new DataLoader<number, Patient>(async (patientIds) => {
    const users = await Patient.findByIds(patientIds as number[]);
    const userIdToUser: Record<number, Patient> = {};
    users.forEach((u) => {
      userIdToUser[u.id] = u;
    });

    const sortedUsers = patientIds.map((patientId) => userIdToUser[patientId]);
    return sortedUsers;
  });
