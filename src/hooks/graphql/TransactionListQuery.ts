import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type {
  UseTransactionListQuery,
  UseTransactionListLazyQuery,
} from './TransactionListQuery.d';

export const TransactionListDocument = gql`
  query TransactionList($userId: String!, $id: String, $status: String) {
    transaction_list(
      user_id: $userId
      id: $id
      status: $status
      per_page: 1000
      page: 0
    ) {
      transactions {
        status
        id
        userId
        amount
        ttl
        updatedAt
        expireAt
        transactionItems {
          quantity
          itemType
        }
        ticketCodes {
          code
        }
        solicitation {
          rooms
          screens
          days
          theater {
            id
            name
            distance
            seat
            theaterUrl
            address {
              name
              number
              district
              city {
                name
                state
              }
            }
            cinema {
              id
              name
              ticketRedemption {
                steps
              }
            }
          }
        }
      }
      page
      per_page
      total_pages
    }
  }
`;

export const useTransactionListQuery: UseTransactionListQuery = (options) =>
  Apollo.useQuery(TransactionListDocument, options);

// eslint-disable-next-line max-len
export const useTransactionListLazyQuery: UseTransactionListLazyQuery = (options) => Apollo.useLazyQuery(TransactionListDocument, options);
