import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type {
  UseServiceTypeListLazyQuery,
  UseServiceTypeListQuery,
} from './ServiceTypeListQuery.d';

export const ServiceTypeListDocument = gql`
  query ServiceTypeList {
    services_type_list(per_page: 10, page: 0) {
      service_types {
        id
        name
        title
        icon {
          white
          gray
        }
        color
        isActive
        priority
        urls {
          history {
            route
            analystics
            params {
              from
            }
          }
          menu {
            route
            analystics
            params {
              screen
            }
          }
        }
        activeHistoryMenu
      }
    }
  }
`;

export const useServiceTypeListQuery: UseServiceTypeListQuery = (options) =>
  Apollo.useQuery(ServiceTypeListDocument, options);

export const useServiceTypeListLazyQuery: UseServiceTypeListLazyQuery = (options) =>
  Apollo.useLazyQuery(ServiceTypeListDocument, options);
