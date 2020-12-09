import { addPrescriptionInput } from 'src/resolvers/inputTypes/PrescriptionInput';
var validator = require('validator');

export const validatePrescriptionCreation = (attributes: addPrescriptionInput) => {
	const { startDate, endDate } = attributes;
	let errors: string | any[] = [];

	if (validator.isAfter(startDate.toString(), endDate.toString())) {
		errors.push({
			field: 'startDate',
			message: 'Start date cannot be after end date',
		});
	}
	if (validator.isBefore(endDate.toString(), startDate.toString())) {
		errors.push({
			field: 'endDate',
			message: 'End date cannot be before start date',
		});
	}

	if (errors.length !== 0) {
		return errors;
	}
	return null;
};
