import type { UseQuery, UseLazyQuery } from './Defaults.d';
import {
  SessionsDetailsQuery,
  SessionsDetailsQueryVariables,
} from '../../@types/graphql/operations';

export type UseSessionsDetailsQuery = UseQuery<
SessionsDetailsQuery,
SessionsDetailsQueryVariables
>;

export type UseSessionsDetailsLazyQuery = UseLazyQuery<
SessionsDetailsQuery,
SessionsDetailsQueryVariables
>;
