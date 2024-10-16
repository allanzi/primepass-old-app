import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type {
  UseCinemaListQuery,
  UseCinemaListLazyQuery,
} from './CinemaListQuery.d';

export const CinemaListDocument = gql`
  query CinemaList {
    cinema_list(active: true, per_page: 200, page: 0) {
      cinemas {
        id
        name
        logo
        color
        url
        isActive
      }
    }
  }
`;

export const useCinemaListQuery: UseCinemaListQuery = (options) =>
  Apollo.useQuery(CinemaListDocument, options);

export const useCinemaListLazyQuery: UseCinemaListLazyQuery = (options) =>
  Apollo.useLazyQuery(CinemaListDocument, options);
