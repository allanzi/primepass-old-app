import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type {
  UseServiceProviderLazyQuery,
  UseServiceProviderQuery,
} from './ServiceProviderQuery.d';

export const ServiceProviderDocument = gql`
  query ServiceProvider($serviceId: String!) {
    detach_list(per_page: 10, page: 0, service_id: $serviceId) {
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
    services_releases_list(per_page: 10, service_id: $serviceId) {
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
    content_service_highlight(page: 0, per_page: 10, service_id: $serviceId) {
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
    service_type_categories(service_id: $serviceId) {
      categories
    }
  }
`;

export const useServiceProviderQuery: UseServiceProviderQuery = (options) =>
  Apollo.useQuery(ServiceProviderDocument, options);

export const useServiceProviderLazyQuery: UseServiceProviderLazyQuery = (options) =>
  Apollo.useLazyQuery(ServiceProviderDocument, options);
