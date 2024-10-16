import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type { UseContentLazyQuery, UseContentQuery } from './ContentQuery.d';

export const ContentDocument = gql`
  query Content($contentId: String!) {
    related_content(id: $contentId) {
      related {
        id
        name
        description
        categories
        duration
        actors
        directors
        producer {
          name
          logo
        }
        artist
        recommendedAge
        launchDate
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
            name
            title
            color
          }
        }
      }
    }
  }
`;

export const useContentQuery: UseContentQuery = (options) =>
  Apollo.useQuery(ContentDocument, options);

export const useContentLazyQuery: UseContentLazyQuery = (options) =>
  Apollo.useLazyQuery(ContentDocument, options);
