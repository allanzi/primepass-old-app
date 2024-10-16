import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type { UseServiceLazyQuery, UseServiceQuery } from './ServiceQuery.d';

export const ServiceDocument = gql`
  query Service($serviceTypeId: String!) {
    detach_list(per_page: 10, page: 0, service_type_id: $serviceTypeId) {
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
    services_releases_list(per_page: 10, service_type_id: $serviceTypeId) {
      releases {
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
    content_service_highlight(
      page: 0
      per_page: 10
      service_type_id: $serviceTypeId
    ) {
      content_services {
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
    service_type_categories(service_type_id: $serviceTypeId) {
      categories
    }
  }
`;

export const useServiceQuery: UseServiceQuery = (options) =>
  Apollo.useQuery(ServiceDocument, options);

export const useServiceLazyQuery: UseServiceLazyQuery = (options) =>
  Apollo.useLazyQuery(ServiceDocument, options);
