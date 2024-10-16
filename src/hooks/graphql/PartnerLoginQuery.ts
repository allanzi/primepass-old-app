import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type {
  UsePartnerLoginQuery,
  UsePartnerLoginLazyQuery,
} from './PartnerLoginQuery.d';

export const PartnerLoginDocument = gql`
  query PartnerLogin($user_id: String!) {
    partner_login_list(user_id: $user_id) {
      label
      partnerType
      hasLogin
      active
      icon
    }
  }
`;

export const usePartnerLoginQuery: UsePartnerLoginQuery = (options) =>
  Apollo.useQuery(PartnerLoginDocument, options);

export const usePartnerLoginLazyQuery: UsePartnerLoginLazyQuery = (options) =>
  Apollo.useLazyQuery(PartnerLoginDocument, options);
