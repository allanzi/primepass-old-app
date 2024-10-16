import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type {
  UseFilterGenreQuery,
  UseFilterGenreLazyQuery,
} from './FilterGenreQuery.d';

export const FilterGenreDocument = gql`
  query FilterGenre(
    $categories: String!
    $serviceTypeId: String
    $serviceId: String
  ) {
    service_type_content(
      page: 0
      service_type_id: $serviceTypeId
      service_id: $serviceId
      categories: [$categories]
    ) {
      service_types {
        id
        name
        title
        catalog {
          id
          name
          description
          categories
          duration
          actors
          directors
          recommendedAge
          launchDate
          producer {
            name
            logo
          }
          medias {
            typeUrl
            url
          }
          services {
            id
            name
            logo
            color
            deepLink
            type {
              id
              name
              title
            }
          }
        }
      }
    }
  }
`;

export const useFilterGenreQuery: UseFilterGenreQuery = (options) =>
  Apollo.useQuery(FilterGenreDocument, options);

export const useFilterGenreLazyQuery: UseFilterGenreLazyQuery = (options) =>
  Apollo.useLazyQuery(FilterGenreDocument, options);
