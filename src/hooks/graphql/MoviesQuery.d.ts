import type { UseQuery, UseLazyQuery } from './Defaults';
import type {
  MoviesQuery,
  MoviesQueryVariables,
} from '../../@types/graphql/operations';

export type UseMoviesQuery = UseQuery<MoviesQuery, MoviesQueryVariables>;

export type UseMoviesLazyQuery = UseLazyQuery<
MoviesQuery,
MoviesQueryVariables
>;
