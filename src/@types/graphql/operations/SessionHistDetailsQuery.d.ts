import * as Types from '../schemas';

export type SessionHistDetailsQueryVariables = Types.Exact<{
  transactionId: string;
  userId: string;
}>;

export type SessionHistDetailsQuery = { __typename?: 'Query' } & {
  sessions_history?: Types.Maybe<
  { __typename?: 'SessionsHistory' } & {
    transaction?: Types.Maybe<
    Array<
    Types.Maybe<
    { __typename?: 'Transaction' } & Pick<
    Types.Transaction,
    'id' | 'amount' | 'status' | 'listCode'
    > & {
      transactionItems?: Types.Maybe<
      Array<
      Types.Maybe<
      { __typename?: 'TransactionItems' } & Pick<
      Types.TransactionItems,
      'quantity' | 'amount'
      > & {
        session?: Types.Maybe<
        { __typename?: 'Session' } & Pick<
        Types.Session,
        | 'weekday'
        | 'date'
        | 'roomName'
        | 'roomType'
        | 'screenType'
        | 'audioType'
        | 'hour'
        > & {
          attributes?: Types.Attribute,
          movie?: Types.Maybe<
          { __typename?: 'Movie' } & Pick<
          Types.Movie,
          | 'name'
          | 'duration'
          | 'launchDate'
          | 'status'
          | 'categories'
          | 'actors'
          | 'directors'
          | 'recommendedAge'
          | 'artist'
          > & {
            producer?: Types.Maybe<
            { __typename?: 'Producer' } & Pick<
            Types.Producer,
            'name' | 'logo'
            >
            >;
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
          theater?: Types.Maybe<
          { __typename?: 'Theater' } & Pick<
          Types.Theater,
          'name' | 'seat'
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
        }
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
