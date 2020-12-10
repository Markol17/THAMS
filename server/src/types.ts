import { Request, Response } from 'express';
import { Redis } from 'ioredis';

export type Context = {
	// @ts-ignore
	req: Request & { session: Express.Session };
	res: Response;
	redis: Redis;
};
