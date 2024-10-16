import * as Types from '../schemas';

export type SessionsQueryVariables = Types.Exact<{
  lat: string;
  lon: string;
  date: string;
  hour: string;
  id: string;
  cinemaPage: number;
  user_id: string;
}>;

export type SessionsQuery = { __typename?: 'Query' } & {
  movie?: Types.Maybe<
  { __typename?: 'Movie' } & Pick<
  Types.Movie,
  | 'cinema_page'
  | 'cinema_per_page'
  | 'id'
  | 'name'
  | 'description'
  | 'duration'
  | 'launchDate'
  > & {
    medias?: Types.Maybe<
    Array<
    Types.Maybe<
    { __typename?: 'Media' } & Pick<Types.Media, 'typeUrl' | 'url'>
    >
    >
    >;
    theaters?: Types.Maybe<
    Array<
    Types.Maybe<
    { __typename?: 'Theater' } & Pick<
    Types.Theater,
    'id' | 'name' | 'cinemaId' | 'isFavorite'
    > & {
      address?: Types.Maybe<
      { __typename?: 'Address' } & Pick<
      Types.Address,
      | 'name'
      | 'number'
      | 'district'
      | 'latitude'
      | 'longitude'
      | 'distance'
      | 'zipCode'
      > & {
        city?: Types.Maybe<
        { __typename?: 'City' } & Pick<
        Types.City,
        'name' | 'state'
        >
        >;
      }
      >;
      sessions?: Types.Maybe<
      Array<
      Types.Maybe<
      { __typename?: 'Session' } & Pick<
      Types.Session,
      | 'id'
      | 'roomName'
      | 'hour'
      | 'date'
      | 'audioType'
      | 'screenType'
      | 'roomType'
      > & {
        attributes?: Types.Maybe<
        Array<
        Types.Maybe<
        { __typename?: 'Attribute' } & Pick<
        Types.Attribute,
        'value'
        >
        >
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
  }
  >;
};
