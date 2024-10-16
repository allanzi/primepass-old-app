import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type { UseHomeQuery, UseHomeLazyQuery } from './HomeQuery.d';

export const HomeDocument = gql`
  query Home {
    detach_list(per_page: 10, page: 0) {
      detach {
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
          deepLink
          type {
            id
            name
            title
            color
          }
        }
      }
    }
    custom_content(per_page: 20, page: 0) {
      content {
        id
        title
        subtitle
        description
        startDate
        finishDate
        priority
        imageFormat
        catalog {
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
            deepLink
            type {
              id
              name
              title
              color
            }
          }
        }
      }
    }
    movies_list(per_page: 15, page: 0) {
      movies {
        id
        name
        description
        categories
        directors
        actors
        producer {
          name
          logo
        }
        artist
        duration
        recommendedAge
        launchDate
        detach
        status
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
            color
          }
        }
      }
    }
    service_type_content(per_page: 10, page: 0) {
      service_types {
        id
        name
        title
        color
        catalog {
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
            deepLink
            type {
              id
              name
              title
              color
            }
          }
        }
      }
    }
  }
`;

export const useHomeQuery: UseHomeQuery = (options) =>
  Apollo.useQuery(HomeDocument, options);

export const useHomeLazyQuery: UseHomeLazyQuery = (options) =>
  Apollo.useLazyQuery(HomeDocument, options);
