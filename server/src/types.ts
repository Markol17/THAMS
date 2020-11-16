import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { createUserLoader } from './dataloaders/createUserLoader';

export type Context = {
  req: Request & { session: Express.Session };
  redis: Redis;
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
};
