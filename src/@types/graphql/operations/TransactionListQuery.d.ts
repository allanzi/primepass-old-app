import * as Types from '../schemas';

export type TransactionListQueryVariables = Types.Exact<{
  userId: string;
  id?: string;
  status?: string;
}>;

export type TransactionListQuery = { __typename?: 'Query' } & {
  transaction_list?:
  { __typename?: 'TransactionList' } & Pick<
  Types.TransactionList,
  'total_pages' | 'page' | 'per_page'
  > & {
    transactions?: Types.Maybe<
    Array<
    Types.Maybe<
    { __typename?: 'Transaction' } & Pick<
    Types.Transaction,
    'id' | 'userId' | 'amount' | 'status' | 'ttl' | 'expireAt' | 'updatedAt'
    > & {
      ticketCodes?: Types.Maybe<
      Array<
      Types.Maybe<
      { __typename?: 'TicketCode' } & Pick<
      Types.TicketCode,
      | 'code'
      >
      >
      >
      >;
    }
    & {
      solicitation?: Types.Maybe<
      { __typename?: 'Solicitation' } & Pick<
      Types.Solicitation,
      'rooms' | 'screens' | 'days'
      > & {
        theater?: Types.Maybe<
        { __typename?: 'Theater' } & Pick<
        Types.Theater,
        'id' | 'name' | 'seat' | 'theaterUrl' | 'distance'
        > & {
          cinema?: Types.Maybe<
          { __typename?: 'Cinema' } & Pick<
          Types.Cinema,
          'id' | 'name'
          > & {
            ticketRedemption?: Types.Maybe<
            { __typename?: 'ticketRedemption' } & Pick<
            Types.TicketRedemption,
            'steps'
            >
            >;
          }
          >;
        }
        >;
      }
      >;
    }
    & {
      transactionItems?: Types.Maybe<
      Array<
      Types.Maybe<
      { __typename?: 'TransactionItem' } & Pick<
      Types.TransactionItem,
      'quantity' | 'itemType'
      >
      >
      >
      >;
    }

    >
    >
    >;
  }
};
