/* eslint-disable max-len */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type {
  UseSessionHistDetailsLazyQuery,
  UseSessionHistDetailsQuery,
} from './SessionHistDetailsQuery.d';

export const SessionHistDetailsDocument = gql`
  query SessionHistDetails($transactionId: String!, $userId: String!) {
    sessions_history(
      user_id: $userId
      transaction_id: $transactionId
      per_page: 10
      page: 0
    ) {
      transaction {
        id
        amount
        status
        transactionItems {
          quantity
          amount
          session {
            weekday
            date
            roomName
            roomType
            screenType
            audioType
            hour
            attributes {
              id
              value
              attributeType {
                id
                entity
                name
              }
            }
            movie {
              name
              duration
              launchDate
              status
              categories
              actors
              directors
              recommendedAge
              producer {
                name
                logo
              }
              artist
              medias {
                typeUrl
                url
              }
            }
            theater {
              name
              seat
              address {
                name
                number
                district
                zipCode
                city {
                  name
                  state
                }
                latitude
                longitude
              }
              cinema {
                id
                logo
                ticketRedemption {
                  description
                  steps
                }
              }
            }
          }
        }
        listCode
      }
    }
  }
`;

export const useSessionHistDetailsQuery: UseSessionHistDetailsQuery = (options) =>
  Apollo.useQuery(SessionHistDetailsDocument, options);

export const useSessionHistDetailsLazyQuery: UseSessionHistDetailsLazyQuery = (options) =>
  Apollo.useLazyQuery(SessionHistDetailsDocument, options);
