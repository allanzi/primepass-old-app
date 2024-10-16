import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type {
  UseUserServicesLazyQuery,
  UseUserServicesQuery,
} from './UserServicesQuery.d';

export const UserServicesDocument = gql`
  query UserServices {
    user_services
    {
      id
      user {
          id
          name
      }
      services {
          id
          name
          type
          acceptedShareData
          date_start
          date_finish
          link
          description {
              description
              link
              text_button
              steps
              share_data
          }
          images {
              logo
              card_web
              rescue_image
          }
          user {
            userName
            password
          }
          signatures {
            id
            code
            valid_thru
            redeemed
            activationAccountNumber
            date_start
            date_finish
            date_cancel
          }
      }
    }
  }
`;

export const useUserServicesQuery: UseUserServicesQuery = (options) =>
  Apollo.useQuery(UserServicesDocument, options);

export const useUserServicesLazyQuery: UseUserServicesLazyQuery = (options) =>
  Apollo.useLazyQuery(UserServicesDocument, options);
