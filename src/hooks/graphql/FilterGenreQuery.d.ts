import type { UseQuery, UseLazyQuery } from './Defaults.d';
import type {
  FilterGenreQuery,
  FilterGenreQueryVariables,
} from '../../@types/graphql/operations';

export type UseFilterGenreQuery = UseQuery<
FilterGenreQuery,
FilterGenreQueryVariables
>;

export type UseFilterGenreLazyQuery = UseLazyQuery<
FilterGenreQuery,
FilterGenreQueryVariables
>;
