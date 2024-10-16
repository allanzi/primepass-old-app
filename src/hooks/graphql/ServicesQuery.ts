import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type { UseServicesLazyQuery, UseServicesQuery } from './ServicesQuery.d';

export const ServicesDocument = gql`
  query Services($serviceTypeId: String, $userId: String) {
    service_list(
      per_page: 10
      page: 0
      service_type_id: $serviceTypeId
      user_id: $userId
      service_audience: "B2C"
    ) {
      services {
        id
        name
        logo
        highlightImage
        url
        color
        userSigned
      }
    }
  }
`;

export const useServicesQuery: UseServicesQuery = (options) =>
  Apollo.useQuery(ServicesDocument, options);

export const useServicesLazyQuery: UseServicesLazyQuery = (options) =>
  Apollo.useLazyQuery(ServicesDocument, options);
