import { Request, Response } from 'express';
import { createPatientLoader } from './dataloaders/createPatientLoader';

export type Context = {
  req: Request & { session: Express.Session };
  res: Response;
  userLoader: ReturnType<typeof createPatientLoader>;
};
