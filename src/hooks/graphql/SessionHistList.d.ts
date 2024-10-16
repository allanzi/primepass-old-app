import type { UseQuery, UseLazyQuery } from './Defaults.d';
import {
  SessionHistListQuery,
  SessionHistListQueryVariables,
} from '../../@types/graphql/operations';

export type UseSessionHistListQuery = UseQuery<
SessionHistListQuery,
SessionHistListQueryVariables
>;

export type UseSessionHistListLazyQuery = UseLazyQuery<
SessionHistListQuery,
SessionHistListQueryVariables
>;
