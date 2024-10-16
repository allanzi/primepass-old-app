import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type {
  UseUserDetailsLazyQuery,
  UseUserDetailsQuery,
} from './UserDetailsQuery.d';

export const UserDetailsDocument = gql`
  query UserDetails($user_id: String!, $signature_type: String) {
    user_details(user_id: $user_id, signature_type: $signature_type) {
      id
      name
      email
      phone
      document
      verified
      availableCredits
      address {
        id
        name
        number
        district
        city {
          id
          name
          state
        }
        zipCode
        latitude
        longitude
      }
      signatures {
        id
        dateStart
        dateFinish
        dateCancel
        cancelReason
        isActive
        duration
        isB2C
        parentSignature {
          id
          dateCancel
          duration
        }
        plans {
          id
          name
          description
          isCore
          creditQuantity
          color
          services {
            id
            name
            logo
            color
            deepLink
            acceptedShareData
            description{
              description
              share_data
            }
            type {
              name
              title
              color
            }
            redeem {
              redeemed
              voucherCode
              code
              primeLogin
              userName
              password
            }
            rules {
              day
              room
              screen
              credits_quantity
            }
          }
        }
        additionalServices {
          id
          name
          logo
          color
          type {
            name
            title
            color
          }
          redeem {
            redeemed
            voucherCode
            code
            primeLogin
            userName
            password
          }
        }
      }
      credits {
        used
        startDate
        finishDate
        creditType {
          id
          name
          rules {
            day
            room
            screen
            credits_quantity
          }
        }
      }
    }
  }
`;

export const useUserDetailsQuery: UseUserDetailsQuery = (options) =>
  Apollo.useQuery(UserDetailsDocument, options);

export const useUserDetailsLazyQuery: UseUserDetailsLazyQuery = (options) =>
  Apollo.useLazyQuery(UserDetailsDocument, options);
