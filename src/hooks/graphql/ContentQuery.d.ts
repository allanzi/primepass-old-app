import type { UseQuery, UseLazyQuery } from './Defaults';
import type {
  ContentQuery,
  ContentQueryVariables,
} from '../../@types/graphql/operations';

export type UseContentQuery = UseQuery<ContentQuery, ContentQueryVariables>;

export type UseContentLazyQuery = UseLazyQuery<
ContentQuery,
ContentQueryVariables
>;
