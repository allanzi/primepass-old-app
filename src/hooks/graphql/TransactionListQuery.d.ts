import type { UseQuery, UseLazyQuery } from './Defaults.d';
import {
  TransactionListQuery,
  TransactionListQueryVariables,
} from '../../@types/graphql/operations';

export type UseTransactionListQuery = UseQuery<
TransactionListQuery,
TransactionListQueryVariables
>;

export type UseTransactionListLazyQuery = UseLazyQuery<
TransactionListQuery,
TransactionListQueryVariables
>;
