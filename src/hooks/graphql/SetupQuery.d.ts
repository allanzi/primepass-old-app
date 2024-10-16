import type { UseQuery, UseLazyQuery } from './Defaults';
import {
  SetupQuery,
  SetupQueryVariables,
} from '../../@types/graphql/operations';

export type UseSetupQuery = UseQuery<SetupQuery, SetupQueryVariables>;

export type UseSetupLazyQuery = UseLazyQuery<
SetupQuery,
SetupQueryVariables
>;
