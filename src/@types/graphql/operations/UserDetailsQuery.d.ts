import * as Types from '../schemas';

export type UserDetailsQueryVariables = Types.Exact<{
  user_id: string;
  signature_type?: string | null;
  page: number;
  per_page: number;
  active_page: string;
}>;

export type UserDetailsQuery = { __typename?: 'Query' } & {
  user_details?: Types.Maybe<
  { __typename?: 'UserDetails' } & Pick<
  Types.UserDetails,
  | 'id'
  | 'name'
  | 'email'
  | 'phone'
  | 'document'
  | 'verified'
  | 'availableCredits'
  > & {
    address?: Types.Maybe<
    { __typename?: 'Address' } & Pick<
    Types.Address,
    | 'id'
    | 'name'
    | 'number'
    | 'district'
    | 'zipCode'
    | 'latitude'
    | 'longitude'
    > & {
      city?: Types.Maybe<
      { __typename?: 'City' } & Pick<
      Types.City,
      'id' | 'name' | 'state'
      >
      >;
    }
    >;
    signatures?: Types.Maybe<
    Array<
    Types.Maybe<
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
      parentSignature: Pick<
      Types.UserSignaturePlan,
      | 'id'
      | 'name'
      | 'description'
      | 'isCore'
      | 'creditQuantity'
      | 'color'
      | 'duration'
      >;
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
        | 'id'
        | 'name'
        | 'logo'
        | 'color'
        | 'acceptedShareData'
        > & {
          description: { __typename?: 'ServiceDescription' } & Pick<
          Types.ServiceDescription,
          | 'link'
          | 'label_link'
          | 'steps'
          | 'description'
          | 'text_button'>;
        }
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
          rules?: Types.Maybe<
          { __typename?: 'Rules' } & Pick<
          Types.Rules,
          'day' | 'room' | 'screen' | 'credits_quantity'
          >
          >;
        }
        >
        >;
      }
      >
      >
      >;
      additionalServices?: Types.Maybe<
      Array<
      Types.Maybe<
      { __typename?: 'ServiceResume' } & Pick<
      Types.ServiceResume,
      'id' | 'name' | 'logo' | 'color'
      > & {
        description: { __typename?: 'ServiceDescription' } & Pick<
        Types.ServiceDescription,
        | 'link'
        | 'label_link'
        | 'steps'
        | 'description'
        | 'text_button'>;
      }
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
      >;
    }
    >
    >
    >;
    credits?: Types.Maybe<
    Array<
    Types.Maybe<
    { __typename?: 'Credits' } & Pick<
    Types.Credits,
    'used' | 'startDate' | 'finishDate'
    > & {
      creditType?: Types.Maybe<
      { __typename?: 'CreditType' } & Pick<
      Types.CreditType,
      'id' | 'name'
      > & {
        rules?: Types.Maybe<
        { __typename?: 'Rules' } & Pick<
        Types.Rules,
        'day' | 'room' | 'screen' | 'credits_quantity'
        >
        >;
      }
      >;
    }
    >
    >
    >;
  }
  >;
};
