import type { UseQuery, UseLazyQuery } from './Defaults.d';
import {
  TheaterQuery,
  TheaterQueryVariables,
} from '../../@types/graphql/operations';

export type UseTheaterQuery = UseQuery<TheaterQuery, TheaterQueryVariables>;

export type UseTheaterLazyQuery = UseLazyQuery<
TheaterQuery,
TheaterQueryVariables
>;
