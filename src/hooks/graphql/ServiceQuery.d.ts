import type { UseQuery, UseLazyQuery } from './Defaults.d';
import {
  ServiceQuery,
  ServiceQueryVariables,
} from '../../@types/graphql/operations';

export type UseServiceQuery = UseQuery<ServiceQuery, ServiceQueryVariables>;

export type UseServiceLazyQuery = UseLazyQuery<
ServiceQuery,
ServiceQueryVariables
>;
