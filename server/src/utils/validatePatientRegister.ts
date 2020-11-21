import { PatientInput } from '../resolvers/InputTypes/PatientInput';

export const validatePatientRegister = (options: PatientInput) => {
  let errors: string | any[] = [];

  //TODO: do the validation
  if (options.insuranceNumber.toString.length == 2) {
    errors.push({
      field: 'insuranceNumber',
      message: 'Length must be greater than 2',
    });
  }

  if (errors.length !== 0) {
    return errors;
  }
  return null;
};
