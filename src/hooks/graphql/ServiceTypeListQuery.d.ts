import type { UseQuery, UseLazyQuery } from './Defaults.d';
import {
  ServiceTypeListQuery,
  ServiceTypeListQueryVariables,
} from '../../@types/graphql/operations';

export type UseServiceTypeListQuery = UseQuery<
ServiceTypeListQuery,
ServiceTypeListQueryVariables
>;

export type UseServiceTypeListLazyQuery = UseLazyQuery<
ServiceTypeListQuery,
ServiceTypeListQueryVariables
>;
