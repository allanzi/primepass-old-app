import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type {
  UseOtherOptionsLazyQuery,
  UseOtherOptionsQuery,
} from './OtherOptionsQuery.d';

export const OtherOptionsDocument = gql`
  query OtherOptions($serviceTypeId: String!) {
    service_type_content(page: 0, service_type_id: $serviceTypeId) {
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

export const useOtherOptionsQuery: UseOtherOptionsQuery = (options) =>
  Apollo.useQuery(OtherOptionsDocument, options);

export const useOtherOptionsLazyQuery: UseOtherOptionsLazyQuery = (options) =>
  Apollo.useLazyQuery(OtherOptionsDocument, options);
