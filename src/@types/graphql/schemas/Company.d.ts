import type { Maybe, Payload } from './defaults';

export interface PartnerLoginRoutes extends Payload<'PartnerLoginRoutes'> {
  authorization: Maybe<string>;
  access_token: Maybe<string>;
  access_token_authentication: Maybe<string>;
  user_info: Maybe<string>;
}

export interface PartnerLoginCompany extends Payload<'PartnerLogin'> {
  partner_type: Maybe<string>;
  label: Maybe<string>;
  type: Maybe<string>;
  hasLogin: Maybe<boolean>;
  icon: Maybe<string>;
  active: Maybe<boolean>;
  color: Maybe<string>;
  client_id: Maybe<string>;
  client_secret: Maybe<string>;
  routes: PartnerLoginRoutes;
}

export interface Company extends Payload<'Company'> {
  id: Maybe<string>;
  name: Maybe<string>;
  status: Maybe<boolean>;
  image: Maybe<string>;
  partnerLogin: PartnerLoginCompany;
}

export interface CompanyList extends Payload<'CompanyList'> {
  companies: Maybe<Array<Maybe<Company>>>;
  page: Maybe<number>;
  per_page: Maybe<number>;
}
