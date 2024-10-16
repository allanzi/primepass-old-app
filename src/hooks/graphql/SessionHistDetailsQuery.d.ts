import type { UseQuery, UseLazyQuery } from './Defaults.d';
import {
  SessionHistDetailsQuery,
  SessionHistDetailsQueryVariables,
} from '../../@types/graphql/operations';

export type UseSessionHistDetailsQuery = UseQuery<
SessionHistDetailsQuery,
SessionHistDetailsQueryVariables
>;

export type UseSessionHistDetailsLazyQuery = UseLazyQuery<
SessionHistDetailsQuery,
SessionHistDetailsQueryVariables
>;
