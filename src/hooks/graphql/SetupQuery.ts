import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type {
  UseSetupQuery,
  UseSetupLazyQuery,
} from './SetupQuery.d';

export const SetupDocument = gql`
  query Setup(
    $setup_page: String!
  ) {
    setup_list(
      platform: "app"
      setup_page: $setup_page
    ) {
      setups {
        id
        page
        active
        url
        image
        description
        category {
          id
          name
        }
        tag {
          platform {
            site
            app
          }
          device {
            ios
            android
          }
        }
      }
    }
  }
`;

export const useSetupQuery: UseSetupQuery = (options) =>
  Apollo.useQuery(SetupDocument, options);

export const useSetupLazyQuery: UseSetupLazyQuery = (options) =>
  Apollo.useLazyQuery(SetupDocument, options);
