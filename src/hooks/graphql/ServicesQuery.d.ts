import type { UseQuery, UseLazyQuery } from './Defaults.d';
import {
  ServicesQuery,
  ServicesQueryVariables,
} from '../../@types/graphql/operations';

export type UseServicesQuery = UseQuery<ServicesQuery, ServicesQueryVariables>;

export type UseServicesLazyQuery = UseLazyQuery<
ServicesQuery,
ServicesQueryVariables
>;
