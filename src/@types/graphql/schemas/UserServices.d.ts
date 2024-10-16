import type { Payload, Maybe } from './defaults';
import type { User } from './User';

export interface UserServices extends Payload<'UserServices'> {
  id: Maybe<string>;
  user: Maybe<User>;
  services: Maybe<Array<Maybe<UserService>>>
}

export interface UserService extends Payload<'UserService'> {
  id: string;
  name: string;
  type: string;
  acceptedShareData: boolean;
  date_start: string;
  date_finish: string;
  link: string;
  description: Description;
  images: Images;
  user: UserLogin;
  signatures: Array<Signature>;
}

export interface Description extends Payload<'Description'> {
  description: Maybe<string>;
  label_link: Maybe<string>;
  link: string;
  text_button: Maybe<string>;
  steps: Array<string>;
  share_data: Maybe<boolean>;
}

export interface Images extends Payload<'Images'> {
  logo: string;
  card_web: string;
  rescue_image: string;
}

export interface UserLogin extends Payload<'UserLogin'> {
  userName: Maybe<string>;
  password: Maybe<string>;
}

export interface Signature extends Payload<'Signature'> {
  id: Maybe<string>;
  code: Maybe<string>;
  valid_thru: Maybe<string>;
  redeemed: Maybe<boolean>;
  activationAccountNumber: Maybe<string>;
  date_start: Maybe<string>;
  date_finish: Maybe<string>;
  date_cancel: Maybe<string>;
}
