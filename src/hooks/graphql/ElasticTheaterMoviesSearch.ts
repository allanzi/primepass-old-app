import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type {
  UseElasticTheaterMoviesSearchLazyQuery,
  UseElasticTheaterMoviesSearchQuery,
} from './ElasticTheaterMoviesSearch.d';

export const ElasticTheaterMoviesSearchDocument = gql`
  query ElasticTheaterMoviesSearch(
    $latitude: String,
    $longitude: String,
    $page: Int,
    $cinemaIds: [String],
    $theaterName: String
  ) {
    elastic_theater_movies_search(
        user_location: [$latitude, $longitude]
        page: $page
        per_page: 10,
        cinema_ids: $cinemaIds,
        theater_name: $theaterName
      ) {
          theaters {
              id
              name
              distance
              theaterUrl
              address {
                  name
                  number
                  latitude
                  longitude
                  district
              }
              cinema {
                  id
                  name
              }
              movies {
                  id
                  name
                   medias {
                       id
                       url
                       typeUrl
                  }
                  status
                  rooms
                  screens
                  audios
              }
          }
          total_pages
          page
          per_page
      }
  }
`;

export const useElasticTheaterMoviesSearchQuery:
UseElasticTheaterMoviesSearchQuery = (options) =>
  Apollo.useQuery(ElasticTheaterMoviesSearchDocument, options);

export const useElasticTheaterMoviesSearchLazyQuery:
UseElasticTheaterMoviesSearchLazyQuery = (options) =>
  Apollo.useLazyQuery(ElasticTheaterMoviesSearchDocument, options);
