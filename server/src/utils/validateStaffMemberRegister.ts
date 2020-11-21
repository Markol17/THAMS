import { StaffMemberInput } from '../resolvers/InputTypes/StaffMemberInput';

export const validateStaffMemberRegister = (options: StaffMemberInput) => {
  let errors = [];
  if (!options.email.includes('@')) {
    errors.push({
      field: 'email',
      message: 'Invalid email',
    });
  }

  //TODO: do the validation
  if (options.phone.toString.length <= 2) {
    errors.push({
      field: 'phone',
      message: 'Length must be greater than 2',
    });
  }

  if (options.password.length < 8) {
    errors.push({
      field: 'password',
      message: 'Length must be at least 8 characters',
    });
  }

  if (errors.length !== 0) {
    return errors;
  }
  return null;
};
