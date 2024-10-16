import type { UseQuery, UseLazyQuery } from './Defaults.d';
import {
  UserDetailsQuery,
  UserDetailsQueryVariables,
} from '../../@types/graphql/operations';

export type UseUserDetailsQuery = UseQuery<
UserDetailsQuery,
UserDetailsQueryVariables
>;

export type UseUserDetailsLazyQuery = UseLazyQuery<
UserDetailsQuery,
UserDetailsQueryVariables
>;
