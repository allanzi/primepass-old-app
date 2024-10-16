import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type {
  UseServiceContentSearchLazyQuery,
  UseServiceContentSearchQuery,
} from './ServiceContentSearchQuery.d';

export const ServiceContentSearchDocument = gql`
  query ServiceContentSearch($search: String!) {
    service_content_search(per_page: 30, page: 0, search: $search) {
      details {
        id
        name
        description
        categories
        duration
        actors
        directors
        producer {
          name
          logo
        }
        artist
        recommendedAge
        launchDate
        medias {
          typeUrl
          url
        }
        services {
          id
          name
          logo
          color
          type {
            name
            title
            icon {
              white
              gray
            }
            color
          }
        }
      }
    }
  }
`;

export const useServiceContentSearchQuery: UseServiceContentSearchQuery = (options) =>
  Apollo.useQuery(ServiceContentSearchDocument, options);

export const useServiceContentSearchLazyQuery: UseServiceContentSearchLazyQuery = (options) =>
  Apollo.useLazyQuery(ServiceContentSearchDocument, options);
