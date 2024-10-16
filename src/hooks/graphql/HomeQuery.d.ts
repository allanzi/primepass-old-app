import type { UseQuery, UseLazyQuery } from './Defaults.d';

import { HomeQuery, HomeQueryVariables } from '../../@types/graphql/operations';

export type UseHomeQuery = UseQuery<HomeQuery, HomeQueryVariables>;

export type UseHomeLazyQuery = UseLazyQuery<HomeQuery, HomeQueryVariables>;
