import * as Types from '../schemas';

export type SessionHistListQueryVariables = Types.Exact<{
  userId: string;
}>;

export type SessionHistListQuery = { __typename?: 'Query' } & {
  sessions_history?: Types.Maybe<
  { __typename?: 'SessionsHistory' } & Pick<
  Types.SessionsHistory,
  'total_pages'
  > & {
    transaction?: Types.Maybe<
    Array<
    Types.Maybe<
    { __typename?: 'Transaction' } & Pick<
    Types.Transaction,
    'id' | 'status'
    > & {
      transactionItems?: Types.Maybe<
      Array<
      Types.Maybe<
      { __typename?: 'TransactionItems' } & {
        session?: Types.Maybe<
        { __typename?: 'Session' } & Pick<
        Types.Session,
        'id' | 'date' | 'hour'
        > & {
          movie?: Types.Maybe<
          { __typename?: 'Movie' } & Pick<
          Types.Movie,
          'name'
          >
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
