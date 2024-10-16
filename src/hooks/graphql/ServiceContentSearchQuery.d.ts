import type { UseQuery, UseLazyQuery } from './Defaults.d';
import type {
  ServiceContentSearchQuery,
  ServiceContentSearchQueryVariables,
} from '../../@types/graphql/operations';

export type UseServiceContentSearchQuery = UseQuery<
ServiceContentSearchQuery,
ServiceContentSearchQueryVariables
>;

export type UseServiceContentSearchLazyQuery = UseLazyQuery<
ServiceContentSearchQuery,
ServiceContentSearchQueryVariables
>;
