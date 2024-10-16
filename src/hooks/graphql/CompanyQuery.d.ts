import type { UseQuery, UseLazyQuery } from './Defaults.d';
import type {
  CompanyQuery,
  CompanyQueryVariables,
} from '../../@types/graphql/operations';

export type UseCompanyQuery = UseQuery<
CompanyQuery,
CompanyQueryVariables
>;

export type UseCompanyLazyQuery = UseLazyQuery<
CompanyQuery,
CompanyQueryVariables
>;
