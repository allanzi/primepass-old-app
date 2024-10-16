import * as Types from '../schemas';

export type PartnerLoginQueryVariables = Types.Exact<{
  user_id: Types.Maybe<string>;
}>;

export type PartnerLoginQuery = {
  partner_login_list: Types.Maybe<
  Array<
  Types.Maybe<
  { __typename?: 'PartnerLogin' } & Pick<
  Types.PartnerLogin,
  'hasLogin' | 'icon' | 'label' | 'partnerType' | 'active'
  >
  >
  >
  >;
};
