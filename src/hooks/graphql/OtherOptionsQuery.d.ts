import type { UseQuery, UseLazyQuery } from './Defaults';
import type {
  OtherOptionsQuery,
  OtherOptionsQueryVariables,
} from '../../@types/graphql/operations';

export type UseOtherOptionsQuery = UseQuery<
OtherOptionsQuery,
OtherOptionsQueryVariables
>;

export type UseOtherOptionsLazyQuery = UseLazyQuery<
OtherOptionsQuery,
OtherOptionsQueryVariables
>;
