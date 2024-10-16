import * as Types from '../schemas';

export type ServicesQueryVariables = Types.Exact<{
  serviceTypeId: string;
  userId: Types.Maybe<string>;
}>;

export type ServicesQuery = { __typename?: 'Query' } & {
  service_list?: Types.Maybe<
  { __typename?: 'ServiceList' } & {
    services?: Types.Maybe<
    Array<
    Types.Maybe<
    { __typename?: 'ServiceResume' } & Pick<
    Types.Service,
    | '__typename'
    | 'color'
    | 'highlightImage'
    | 'id'
    | 'logo'
    | 'name'
    | 'url'
    | 'userSigned'
    >
    >
    >
    >;
  }
  >;
};
