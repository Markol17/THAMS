import 'reflect-metadata';
import 'dotenv-safe/config';
import { __prod__, COOKIE_NAME } from './constants';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { StaffMemberResolver } from './resolvers/StaffMemberResolver';
import session from 'express-session';
import cors from 'cors';
import { createConnection } from 'typeorm'; //getConnection
import { Patient } from './entities/Patient';
import path from 'path';
import { createPatientLoader } from './dataloaders/createPatientLoader';
import { Division } from './entities/Division';
import { Prescription } from './entities/Prescription';
import { StaffMember } from './entities/StaffMember';
import { StaffMemberPatient } from './entities/StaffMemberPatient';
import { PatientResolver } from './resolvers/PatientResolver';
import { DivisionResolver } from './resolvers/DivisionResolver';
import { PrescriptionResolver } from './resolvers/PrescriptionResolver';

const main = async () => {
	await createConnection({
		type: 'postgres',
		database: 'THAMS',
		username: 'postgres',
		password: '1234',
		logging: true,
		synchronize: true,
		migrations: [path.join(__dirname, './migrations/*')],
		entities: [Patient, StaffMember, Division, Prescription, StaffMemberPatient],
	});
	// await conn.runMigrations();
	const app = express();
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
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
				httpOnly: true,
				sameSite: 'lax', // csrf
				secure: __prod__, // cookies only work in https
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
			userLoader: createPatientLoader(),
		}),
	});

	apolloServer.applyMiddleware({
		app,
		cors: false,
	});

	app.listen(parseInt(process.env.PORT), () => {
		console.log('server started on localhost:4000');
	});
};

main().catch((err) => {
	console.error(err);
});
