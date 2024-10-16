import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type { UseTheaterLazyQuery, UseTheaterQuery } from './TheaterQuery.d';

export const TheaterDocument = gql`
  query Theater {
    detach_list(
      per_page: 10
      page: 0
      service_type_id: "bf231e04-d14f-45d2-b8fd-a287142b4d81"
    ) {
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
            name
            title
            color
          }
        }
      }
    }
    premieres_list(per_page: 10, page: 0) {
      movies {
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
            name
            title
            color
          }
        }
      }
    }
    movies_list(per_page: 50, page: 0) {
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
            name
            title
            color
          }
        }
      }
    }
    in_coming_movies(per_page: 10, page: 0) {
      movies {
        id
        description
        name
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
            name
            title
            color
          }
        }
      }
    }
  }
`;

export const useTheaterQuery: UseTheaterQuery = (options) =>
  Apollo.useQuery(TheaterDocument, options);

export const useTheaterLazyQuery: UseTheaterLazyQuery = (options) =>
  Apollo.useLazyQuery(TheaterDocument, options);
