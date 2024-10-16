import * as Types from '../schemas';

export type CompanyQueryVariables = Types.Exact<{
  companyId: string;
}>;

export type CompanyQuery = { __typename?: 'Query' } & {
  company_list:
  { __typename?: 'CompanyList' } & {
    page: number,
    per_page: number,
    companies: Array<
    { __typename?: 'Company' } & Pick<
    Types.Company,
    | 'id'
    | 'image'
    | 'name'
    | 'status'
    > & {
      partnerLogin: Types.Maybe<
      Array<
      Types.Maybe<
      { __typename?: 'PartnerLogin' } & Pick<
      Types.PartnerLoginCompany,
      | 'active'
      | 'partner_type'
      | 'client_id'
      | 'client_secret'
      | 'color'
      | 'hasLogin'
      | 'icon'
      | 'label'
      | 'type'
      > & {
        routes: Types.Maybe<
        { __typename?: 'PartnerLoginRoutes' } & Pick<
        Types.PartnerLoginRoutes,
        | 'access_token'
        | 'access_token_authentication'
        | 'authorization'
        | 'user_info'
        >
        >;
      }
      >
      >
      >;
    }
    >;
  }
};
