import 'reflect-metadata';
import 'dotenv-safe/config';
import { __prod__, COOKIE_NAME } from './constants';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { StaffMemberResolver } from './resolvers/StaffMemberResolver';
import session from 'express-session';
import cors from 'cors';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import { createConnection } from 'typeorm'; //getConnection
import { Patient } from './entities/Patient';
import path from 'path';
import { Division } from './entities/Division';
import { Prescription } from './entities/Prescription';
import { StaffMember } from './entities/StaffMember';
import { StaffMemberPatient } from './entities/StaffMemberPatient';
import { PatientResolver } from './resolvers/PatientResolver';
import { DivisionResolver } from './resolvers/DivisionResolver';
import { PrescriptionResolver } from './resolvers/PrescriptionResolver';

const main = async () => {
	const conn = await createConnection({
		type: 'postgres',
		url: process.env.DATABASE_URL,
		logging: true,
		//synchronize: true,
		migrations: [path.join(__dirname, './migrations/*')],
		entities: [Patient, StaffMember, Division, Prescription, StaffMemberPatient],
	});
	await conn.runMigrations();
	const app = express();
	const RedisStore = connectRedis(session);
	const redis = new Redis(process.env.REDIS_URL);
	app.set('trust proxy', 1);
	app.use(
		cors({
			origin: process.env.CORS_ORIGIN,
			credentials: true,
		})
	);
	app.use(
		session({
			name: COOKIE_NAME,
			store: new RedisStore({
				client: redis,
				disableTouch: true,
			}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
				httpOnly: true,
				sameSite: 'lax', // csrf
				secure: true, // cookies only work in https
				domain: undefined, // __prod__ ? DNS this is if we had a deployed frontend for cookies to work
			},
			saveUninitialized: false,
			secret: process.env.SESSION_SECRET,
			resave: false,
		})
	);

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [PatientResolver, StaffMemberResolver, DivisionResolver, PrescriptionResolver],
			validate: false,
		}),
		context: ({ req, res }) => ({
			req,
			res,
		}),
	});

	apolloServer.applyMiddleware({
		app,
		cors: false,
	});

	app.listen(parseInt(process.env.PORT), () => {});
};

main().catch((err) => {
	console.error(err);
});
