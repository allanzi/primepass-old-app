import type { UseQuery, UseLazyQuery } from './Defaults.d';
import {
  ServicesHistoryQuery,
  ServicesHistoryQueryVariables,
} from '../../@types/graphql/operations';

export type UseServicesHistoryQuery = UseQuery<
{ services_history: ServicesHistoryQuery },
Partial<ServicesHistoryQueryVariables>
>;

export type UseServicesHistoryLazyQuery = UseLazyQuery<
ServicesHistoryQuery,
Partial<ServicesHistoryQueryVariables>
>;
