import type { UseQuery, UseLazyQuery } from './Defaults';

import {
  ElasticTheaterMoviesSearchQuery,
  ElasticTheaterMoviesSearchQueryVariables,
} from '../../@types/graphql/operations';

export type UseElasticTheaterMoviesSearchQuery = UseQuery<
ElasticTheaterMoviesSearchQuery,
ElasticTheaterMoviesSearchQueryVariables
>;

export type UseElasticTheaterMoviesSearchLazyQuery = UseLazyQuery<
ElasticTheaterMoviesSearchQuery,
ElasticTheaterMoviesSearchQueryVariables
>;
