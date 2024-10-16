import * as Types from '../schemas';

export type ServicesHistoryQueryVariables = Types.Exact<{
  service_id?: string;
  user_id: string | undefined;
  service_type_name?: string;
  signature_type: string;
  page: number;
  per_page: number;
  signature_id?: string;
  active_page?: string;
}>;

export type ServicesHistoryQuery = { __typename?: 'Query' } & {
  services_history?: {
    page: number;
    total_pages: number;
    signatures?: Types.Maybe<
    Array<
    Types.Exact<
    { __typename?: 'UserSignature' } & Pick<
    Types.UserSignature,
    | 'id'
    | 'dateStart'
    | 'dateFinish'
    | 'dateCancel'
    | 'cancelReason'
    | 'isActive'
    | 'duration'
    | 'isB2C'
    > & {
      plans?: Types.Maybe<
      Array<
      Types.Maybe<
      { __typename?: 'UserSignaturePlan' } & Pick<
      Types.UserSignaturePlan,
      | 'id'
      | 'name'
      | 'description'
      | 'isCore'
      | 'creditQuantity'
      | 'color'
      | 'duration'
      > & {
        services?: Types.Maybe<
        Array<
        Types.Maybe<
        { __typename?: 'ServiceResume' } & Pick<
        Types.ServiceResume,
        'id' | 'name' | 'logo' | 'color'
        > & {
          type?: Types.Maybe<
          { __typename?: 'ServiceType' } & Pick<
          Types.ServiceType,
          'name' | 'title' | 'icon' | 'color'
          >
          >;
          redeem?: Types.Maybe<
          { __typename?: 'RedeemData' } & Pick<
          Types.RedeemData,
          | 'redeemed'
          | 'voucherCode'
          | 'code'
          | 'primeLogin'
          | 'userName'
          | 'password'
          >
          >;
        }
        >
        >
        >;
      }
      >
      >
      >;
      services:
      Array<
      { __typename?: 'ServiceResume' } & Pick<
      Types.ServiceResume,
      'id' | 'name' | 'logo' | 'color' | 'images'
      > & {
        type?: Types.Maybe<
        { __typename?: 'ServiceType' } & Pick<
        Types.ServiceType,
        'name' | 'title' | 'icon' | 'color'
        >
        >;
        redeem?: Types.Maybe<
        { __typename?: 'RedeemData' } & Pick<
        Types.RedeemData,
        | 'redeemed'
        | 'voucherCode'
        | 'code'
        | 'primeLogin'
        | 'userName'
        | 'password'
        >
        >;
      }
      >
    }
    >
    >
    >;
  }
};
