import type { UseQuery, UseLazyQuery } from './Defaults.d';
import {
  SessionsQuery,
  SessionsQueryVariables,
} from '../../@types/graphql/operations';

export type UseSessionsQuery = UseQuery<SessionsQuery, SessionsQueryVariables>;

export type UseSessionsLazyQuery = UseLazyQuery<
SessionsQuery,
SessionsQueryVariables
>;
