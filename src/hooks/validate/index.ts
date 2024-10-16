/* eslint-disable no-useless-escape */
import * as EmailValidator from 'email-validator';

import type {
  IsEmail, IsPhone, UseValidate,
} from './types.d';

const isEmail: IsEmail = (value: string): boolean => EmailValidator.validate(value);

const isPhone: IsPhone = (value: string): boolean => {
  const pattern = /\(\d{2,}\) \d{4,}\-\d{4}|[0-9]{11}/;
  return pattern.test(value);
};

export const useValidate: UseValidate = () => ({
  isEmail,
  isPhone,
});

export default useValidate;
