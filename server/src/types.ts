import { Request, Response } from 'express';
import { createUserLoader } from './dataloaders/createUserLoader';

export type Context = {
  req: Request & { session: Express.Session };
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
};
