import { StaffMemberInput } from '../resolvers/inputTypes/StaffMemberInput';
var validator = require('validator');

export const validateStaffMemberRegister = (attributes: StaffMemberInput) => {
	const { email, phoneNumber, password } = attributes;
	let errors = [];

	if (!validator.isEmail(email)) {
		errors.push({
			field: 'email',
			message: 'Invalid email',
		});
	}

	if (!validator.isMobilePhone(phoneNumber)) {
		errors.push({
			field: 'phone',
			message: 'Invalid phone number',
		});
	}

	if (password.length < 8) {
		errors.push({
			field: 'password',
			message: 'Password length must be at least 8 characters',
		});
	}

	if (errors.length !== 0) {
		return errors;
	}
	return null;
};
