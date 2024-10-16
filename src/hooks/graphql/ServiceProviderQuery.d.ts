import type { UseQuery, UseLazyQuery } from './Defaults.d';
import {
  ServiceProviderQuery,
  ServiceProviderQueryVariables,
} from '../../@types/graphql/operations';

export type UseServiceProviderQuery = UseQuery<
ServiceProviderQuery,
ServiceProviderQueryVariables
>;

export type UseServiceProviderLazyQuery = UseLazyQuery<
ServiceProviderQuery,
ServiceProviderQueryVariables
>;
