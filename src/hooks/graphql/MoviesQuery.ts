import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type { UseMoviesQuery, UseMoviesLazyQuery } from './MoviesQuery.d';

export const MoviesDocument = gql`
  query Movies(
    $city: String!
    $state: String!
    $latitude: String!
    $longitude: String!
  ) {
    movies_list(
      per_page: 10
      page: 0
      city: $city
      state: $state
      user_location: [$latitude, $longitude]
      locate_by_ip: false
    ) {
      movies {
        id
        name
        description
        categories
        duration
        launchDate
        status
        medias {
          typeUrl
          url
        }
      }
    }
  }
`;

export const useMoviesQuery: UseMoviesQuery = (options) =>
  Apollo.useQuery(MoviesDocument, options);

export const useMoviesLazyQuery: UseMoviesLazyQuery = (options) =>
  Apollo.useLazyQuery(MoviesDocument, options);
