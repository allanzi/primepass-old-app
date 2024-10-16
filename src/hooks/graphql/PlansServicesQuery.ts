import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type {
  UsePlansServicesLazyQuery,
  UsePlansServicesQuery,
} from './PlansServicesQuery.d';

export const PlansServicesDocument = gql`
  query PlansServicesQuery(
    $service_id: String
    $user_id: String!
    $service_type_name: String
    $signature_type: String
    $page: Int!
    $per_page: Int
    $signature_id: String
    $active_page: String
  ) {
    services_history(
      # ID do usuário para o qual deseja pegar o histórico
      user_id: $user_id
      # Define o tipo de serviço do histórico
      # service_type_id: "464f8d24-2595-4614-addc-d42da6404f25",
      service_type_name: $service_type_name
      # signature_type pode ser: ALL, B2B ou B2C
      signature_type: $signature_type
      per_page: $per_page
      page: $page
      service_id: $service_id
      signature_id: $signature_id
      active_page: $active_page
    ) {
      signatures {
        id
        dateStart
        dateFinish
        dateCancel
        cancelReason
        isActive
        duration
        services {
          id
          name
          logo
          acceptedShareData
          type {
            id
            name
            title
            color
            priority
            isActive
          }
          description {
            link
            steps
            label_link
            description
            share_data
          }
          images {
            selected_image
            rescue_image
            history_image
            logo
            card_web
          }
          color
          deepLink
          redeem {
            redeemed
            code
            userName
            password
            primeLogin
            link
          }
        }
      }
      total_pages
      page
    }
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

export const usePlansServicesQuery: UsePlansServicesQuery = (options) =>
  Apollo.useQuery(PlansServicesDocument, options);

export const usePlansServicesLazyQuery: UsePlansServicesLazyQuery = (options) =>
  Apollo.useLazyQuery(PlansServicesDocument, options);
