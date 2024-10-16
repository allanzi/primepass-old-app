import * as Types from '../schemas';

export type SessionsDetailsQueryVariables = Types.Exact<{
  sessionId: string;
}>;

export type SessionsDetailsQuery = { __typename?: 'Query' } & {
  sessions_list?: Types.Maybe<
  { __typename?: 'SessionsList' } & {
    sessions?: Types.Maybe<
    Array<
    Types.Maybe<
    { __typename?: 'Session' } & Pick<
    Types.Session,
    | 'id'
    | 'audioType'
    | 'screenType'
    | 'roomType'
    | 'roomName'
    | 'price'
    | 'date'
    | 'hour'
    | 'weekday'
    > & {
      theater?: Types.Maybe<
      { __typename?: 'Theater' } & Pick<
      Types.Theater,
      'id' | 'name' | 'isActive'
      > & {
        address?: Types.Maybe<
        { __typename?: 'Address' } & Pick<
        Types.Address,
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
          'name' | 'state'
          >
          >;
        }
        >;
      }
      >;
      movie?: Types.Maybe<
      { __typename?: 'Movie' } & Pick<
      Types.Movie,
      | 'id'
      | 'name'
      | 'duration'
      | 'description'
      | 'launchDate'
      | 'categories'
      | 'recommendedAge'
      | 'status'
      | 'detach'
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
      >;
    }
    >
    >
    >;
  }
  >;
};
