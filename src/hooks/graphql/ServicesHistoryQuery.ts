import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type {
  UseServicesHistoryLazyQuery,
  UseServicesHistoryQuery,
} from './ServicesHistoryQuery.d';

export const ServicesHistoryDocument = gql`
  query ServicesHistory(
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
  }
`;

export const useServicesHistoryQuery: UseServicesHistoryQuery = (options) =>
  Apollo.useQuery(ServicesHistoryDocument, options);

export const useServicesHistoryLazyQuery: UseServicesHistoryLazyQuery = (options) =>
  Apollo.useLazyQuery(ServicesHistoryDocument, options);
