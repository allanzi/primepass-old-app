import * as Types from '../schemas';

export type MoviesQueryVariables = Types.Exact<{
  city: string;
  state: string;
  latitude: string;
  longitude: string;
}>;

export type MoviesQuery = { __typename?: 'Query' } & {
  movies_list?: Types.Maybe<
  { __typename?: 'MoviesList' } & {
    movies?: Types.Maybe<
    Array<
    Types.Maybe<
    { __typename?: 'Movie' } & Pick<
    Types.Movie,
    | 'id'
    | 'name'
    | 'description'
    | 'categories'
    | 'duration'
    | 'launchDate'
    | 'status'
    > & {
      medias?: Types.Maybe<
      Array<
      Types.Maybe<
      { __typename?: 'Media' } & Pick<
      Types.Media,
      'typeUrl' | 'url'
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
