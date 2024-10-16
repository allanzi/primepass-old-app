import * as Types from '../schemas';

export type SetupQueryVariables = Types.Exact<{
  setup_page: string;
}>;

export type SetupQuery = { __typename?: 'Query' } & {
  setup_list?: Types.Maybe<
  { __typename?: 'SetupList' } & {
    setups?: Types.Maybe<
    Array<
    Types.Maybe<
    { __typename?: 'Setup' } & Pick<
    Types.Setup,
    | 'id'
    | 'page'
    | 'active'
    | 'url'
    | 'image'
    | 'description'
    > & {
      category?: Types.Maybe<
      { __typename?: 'SetupCategory' } & Pick<
      Types.SetupCategory,
      'id' | 'name' >
      >;
    }
    & {
      tag?: Types.Maybe<
      { __typename?: 'SetupTag' }
      & {
        plataform?: Types.Maybe<
        { __typename?: 'Platform' } & Pick<
        Types.Platform,
        'site' | 'app' >
        >;
      }
      & {
        device:
        { __typename?: 'Device' } & Pick<
        Types.Device,
        'ios' | 'android' >
        ;
      }
      >;
    }
    >
    >
    >;
  }
  >;
};
