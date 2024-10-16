import type { UseQuery, UseLazyQuery } from './Defaults';
import {
  UserServicesQuery,
  UserServicesQueryVariables,
} from '../../@types/graphql/operations';

export type UseUserServicesQuery = UseQuery<
UserServicesQuery,
UserServicesQueryVariables
>;

export type UseUserServicesLazyQuery = UseLazyQuery<
UserServicesQuery,
UserServicesQueryVariables
>;
