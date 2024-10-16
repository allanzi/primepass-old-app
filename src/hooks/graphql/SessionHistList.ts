import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type {
  UseSessionHistListQuery,
  UseSessionHistListLazyQuery,
} from './SessionHistList.d';

export const SessionHistListDocument = gql`
  query SessionHistList($userId: String!) {
    sessions_history(user_id: $userId, per_page: 100, page: 0) {
      transaction {
        id
        status
        transactionItems {
          session {
            id
            date
            hour
            movie {
              name
            }
          }
        }
      }
      total_pages
    }
  }
`;

export const useSessionHistListQuery: UseSessionHistListQuery = (options) =>
  Apollo.useQuery(SessionHistListDocument, options);

export const useSessionHistListLazyQuery: UseSessionHistListLazyQuery = (options) =>
  Apollo.useLazyQuery(SessionHistListDocument, options);
