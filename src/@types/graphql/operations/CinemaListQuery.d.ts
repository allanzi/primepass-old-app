import * as Types from '../schemas';

export type CinemaListQueryVariables = Types.Exact<{
}>;

export type CinemaListQuery = { __typename?: 'Query' } & {
  cinema_list:
  { __typename?: 'Cinemas' } & {
    cinemas: Array<
    { __typename?: 'Cinema' } & Pick<
    Types.Cinema,
    | 'id'
    | 'name'
    | 'logo'
    | 'color'
    | 'url'
    | 'isActive'
    >
    >;
  }
};
