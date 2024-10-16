import * as Types from '../schemas';

export type ElasticTheaterMoviesSearchQueryVariables = Types.Exact<{
  latitude: string | number;
  longitude: string | number;
  page: number;
  cinemaIds?: Array<string> | null;
  theaterName?: string | null;
}>;

export type ElasticTheaterMoviesSearchQuery = { __typename?: 'Query' } & {
  elastic_theater_movies_search?:
  { __typename?: 'Theaters' } & {
    theaters: Types.Maybe<
    Array<
    { __typename?: 'TheaterMovies' } & Pick<
    Types.TheaterMovies,
    | 'id'
    | 'name'
    | 'distance'
    | 'theaterUrl'
    >
    & {
      cinema?:
      { __typename?: 'Cinema' } & Pick<
      Types.Cinema,
      | 'id'
      | 'name'
      >
    }
    & {
      address?:
      { __typename?: 'Address' } & Pick<
      Types.Address,
      | 'name'
      | 'number'
      | 'district'
      | 'latitude'
      | 'longitude'
      >
      & {
        city?: Types.Maybe<
        { __typename?: 'City' } & Pick<
        Types.City,
        'id' | 'name' | 'state'
        >
        >;
      }
    }
    & {
      movies?:
      { __typename?: 'Movies' } & Pick<
      Types.Movie,
      | 'id'
      | 'name'
      | 'categories'
      | 'status'
      | 'rooms'
      | 'screens'
      | 'audios'
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
    }
    >
    >;
  }
};
