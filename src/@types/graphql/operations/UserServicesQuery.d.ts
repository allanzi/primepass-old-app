import * as Types from '../schemas';

export type UserServicesQueryVariables = Types.Exact<{
}>;

export type UserServicesQuery = { __typename?: 'Query' } & {
  user_services?: Types.Maybe<
  { __typename?: 'UserServices' } & Pick<
  Types.UserServices,
  | 'id'
  > & {
    user?: Types.Maybe<
    { __typename?: 'User' } & Pick<
    Types.User,
    | 'id'
    | 'name'
    >
    >;
  }
  & {
    services?: Types.Maybe<
    Array<
    Types.Maybe<
    { __typename?: 'UserService' } & Pick<
    Types.UserService,
    | 'id'
    | 'name'
    | 'type'
    | 'acceptedShareData'
    | 'date_start'
    | 'date_finish'
    | 'link'
    > & {
      description?: Types.Maybe<
      { __typename?: 'Description' } & Pick<
      Types.Description,
      | 'description'
      | 'link'
      | 'text_button'
      | 'steps'
      | 'share_data'
      >
      >;
    }
    & {
      images?: Types.Maybe<
      { __typename?: 'Images' } & Pick<
      Types.Images,
      | 'logo'
      | 'card_web'
      >
      >;
    }
    & {
      user?: Types.Maybe<
      { __typename?: 'UserLogin' } & Pick<
      Types.UserLogin,
      | 'userName'
      | 'password'
      >
      >;
    }
    & {
      signatures?: Types.Maybe<
      Array<
      Types.Maybe<
      { __typename?: 'Signature' } & Pick<
      Types.Signature,
      | 'id'
      | 'code'
      | 'valid_thru'
      | 'redeemed'
      | 'activationAccountNumber'
      | 'date_start'
      | 'date_finish'
      | 'date_cancel'
      >
      >
      >
      >;
    }
    >
    >
    >;
  }
  >;
};
