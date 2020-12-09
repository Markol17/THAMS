import { PatientInput } from '../resolvers/inputTypes/PatientInput';
var validator = require('validator');

export const validatePatientRegister = (attributes: PatientInput) => {
	const { phoneNumber, dateOfBirth } = attributes;
	let errors: string | any[] = [];

	if (!validator.isMobilePhone(phoneNumber.replace(/\D+/g, ''))) {
		errors.push({
			field: 'phoneNumber',
			message: 'Invalid phone number',
		});
	}
	if (!validator.isDate(dateOfBirth)) {
		errors.push({
			field: 'dateOfBirsth',
			message: 'Invalid date',
		});
	}

	if (errors.length !== 0) {
		return errors;
	}
	return null;
};
