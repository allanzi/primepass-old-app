import { Payload, Maybe } from './defaults';

export interface PartnerLogin extends Payload<'PartnerLogin'> {
  label: Maybe<string>;
  partner_type: Maybe<string>;
  hasLogin: Maybe<boolean>;
  icon: Maybe<string>;
  active: Maybe<string>;
}
