import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type {
  UseSessionsDetailsLazyQuery,
  UseSessionsDetailsQuery,
} from './SessionsDetailsQuery.d';

export const SessionsDetailsDocument = gql`
  query sessionsDetails($sessionId: String!) {
    sessions_list(filters: ["id"], operators: ["="], values: [$sessionId]) {
      sessions {
        id
        audioType
        screenType
        roomType
        roomName
        price
        date
        hour
        weekday
        theater {
          id
          name
          isActive
          address {
            name
            number
            district
            zipCode
            latitude
            longitude
            city {
              name
              state
            }
          }
        }
        movie {
          id
          name
          duration
          description
          launchDate
          categories
          recommendedAge
          status
          detach
          medias {
            typeUrl
            url
          }
        }
      }
    }
  }
`;

export const useSessionsDetailsQuery: UseSessionsDetailsQuery = (options) =>
  Apollo.useQuery(SessionsDetailsDocument, options);

export const useSessionsDetailsLazyQuery: UseSessionsDetailsLazyQuery = (options) =>
  Apollo.useLazyQuery(SessionsDetailsDocument, options);
