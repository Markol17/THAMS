import { UpdatePatientInput } from '../resolvers/inputTypes/PatientInput';
var validator = require('validator');

export const validatePatientUpdate = (attributes: UpdatePatientInput) => {
	const { phoneNumber } = attributes;
	let errors: string | any[] = [];

	if (!validator.isMobilePhone(phoneNumber)) {
		errors.push({
			field: 'phoneNumber',
			message: 'Invalid phone number',
		});
	}

	if (errors.length !== 0) {
		return errors;
	}
	return null;
};
