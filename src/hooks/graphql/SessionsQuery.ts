import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type { UseSessionsLazyQuery, UseSessionsQuery } from './SessionsQuery.d';

export const SessionsDocument = gql`
  query Sessions(
    $lat: String!
    $lon: String!
    $date: String!
    $hour: String!
    $id: String!
    $cinemaPage: Int!
    $user_id: String
  ) {
    movie(
      id: $id
      user_id: $user_id
      session_date: $date
      session_hour: $hour
      user_location: [$lat, $lon]
      cinemas_not_allowed: []
      cinema_page: $cinemaPage
      cinema_per_page: 5
    ) {
      cinema_page
      cinema_per_page
      id
      name
      description
      duration
      launchDate
      medias {
        typeUrl
        url
      }
      theaters {
        id
        name
        cinemaId
        isFavorite
        address {
          name
          number
          district
          latitude
          longitude
          distance
          zipCode
          city {
            name
            state
          }
        }
        sessions {
          id
          roomName
          hour
          date
          audioType
          screenType
          roomType
          attributes {
            value
          }
        }
      }
    }
  }
`;

export const useSessionsQuery: UseSessionsQuery = (options) =>
  Apollo.useQuery(SessionsDocument, options);

export const useSessionsLazyQuery: UseSessionsLazyQuery = (options) =>
  Apollo.useLazyQuery(SessionsDocument, options);
