import { MiddlewareFn } from 'type-graphql';
import { Context } from '../types';

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
	console.log('isAuth', context.req.session);
	if (!context.req.session.userId) {
		throw new Error('not authenticated');
	}
	//TODO: check is medical staff member

	return next();
};
