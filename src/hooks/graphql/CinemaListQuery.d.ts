import type { UseQuery, UseLazyQuery } from './Defaults.d';
import type {
  CinemaListQuery,
  CinemaListQueryVariables,
} from '../../@types/graphql/operations';

export type UseCinemaListQuery = UseQuery<
CinemaListQuery,
CinemaListQueryVariables
>;

export type UseCinemaListLazyQuery = UseLazyQuery<
CinemaListQuery,
CinemaListQueryVariables
>;
