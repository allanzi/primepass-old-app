import type { UseQuery, UseLazyQuery } from './Defaults.d';
import {
  PlansServicesQuery,
  PlansServicesQueryVariables,
} from '../../@types/graphql/operations';

export type UsePlansServicesQuery = UseQuery<
PlansServicesQuery,
PlansServicesQueryVariables
>;

export type UsePlansServicesLazyQuery = UseLazyQuery<
PlansServicesQuery,
PlansServicesQueryVariables
>;
