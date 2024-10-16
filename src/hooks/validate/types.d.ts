export type Validator<T = string, R = boolean> = (value: T) => R;

export type IsEmail = Validator<string>;

export type IsPhone = Validator<string>;

export interface UseValidateReturn {
  isEmail: IsEmail;
  isPhone: IsPhone;
}

export type UseValidate = () => UseValidateReturn;
