import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type {
  UseCompanyQuery,
  UseCompanyLazyQuery,
} from './CompanyQuery.d';

export const CompanyDocument = gql`
  query Company(
    $companyId: String
  ) {
    company_list(
          per_page: 500
          page: 0
          integration_type: "prime-login"
          company_id: $companyId
        ) {
        page
        per_page
        companies {
          id
          name
          active
          image
          partnerLogin {
              partner_type
              label
              icon
              active
              type
              client_id
              client_secret
              color
              routes {
                authorization
                access_token
                user_info
                access_token_authentication
              }
          }
        }
      }
  }
`;

export const useCompanyQuery: UseCompanyQuery = (options) =>
  Apollo.useQuery(CompanyDocument, options);

export const useCompanyLazyQuery: UseCompanyLazyQuery = (options) =>
  Apollo.useLazyQuery(CompanyDocument, options);
