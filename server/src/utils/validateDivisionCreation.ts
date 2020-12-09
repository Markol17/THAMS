import { DivisionInput } from 'src/resolvers/inputTypes/DivisionInput';
var validator = require('validator');

export const validateDivisionCreation = (attributes: DivisionInput) => {
	const { phoneNumber } = attributes;
	let errors: string | any[] = [];

	if (!validator.isMobilePhone(phoneNumber.replace(/\D+/g, ''))) {
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
