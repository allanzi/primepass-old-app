import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';

import { ApolloError, ApolloQueryResult } from '@apollo/client';
import { useTransactionListLazyQuery } from './graphql/hooks';
import {
  TransactionListQuery,
  TransactionListQueryVariables,
} from '../@types/graphql/operations';
import { Transaction } from '../@types/graphql/schemas';

interface TransactionsHistoryContextData {
  data: Array<Transaction>;
  setData(data: SetStateAction<Transaction[]>): void;
  loading: boolean;
  hasFetched: boolean;
  refetch: (
    variables?: Partial<TransactionListQueryVariables>,
  ) => Promise<ApolloQueryResult<TransactionListQuery>>;
  loadTransactionsHistory(params: TransactionListQueryVariables): void;
  error: ApolloError | undefined;
  setHasFetched: Dispatch<SetStateAction<boolean>>;
}

const TransactionsHistoryContext = createContext<TransactionsHistoryContextData>(
  {} as TransactionsHistoryContextData,
);

const TransactionsHistoryProvider: React.FC = ({ children }) => {
  const [hasFetched, setHasFetched] = useState(false);
  const [data, setData] = useState([] as Array<Transaction>);
  const [loading, setLoading] = useState(false);

  const [getTransactions, { refetch, error }] = useTransactionListLazyQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    onCompleted: async (responseData) => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      filterData(responseData);
      setHasFetched(true);
      setLoading(false);
    },
  });

  const getAsyncStorage = async () => {
    const response = await AsyncStorage.getItem('@Primepass:transactions');

    if (response) {
      setData(JSON.parse(response));
      return;
    }
    setData([]);
  };

  const containTheater = (transaction: Transaction) => {
    const transactionFiltered = transaction.transactionItems
      .filter((item) => item.itemType === 'theater');
    if (transactionFiltered.length > 0) {
      return true;
    }
    return false;
  };

  const filterData = async (transactions: TransactionListQuery) => {
    const result = transactions?.transaction_list?.transactions?.filter(
      (transaction) => containTheater(transaction),
    );

    setData(result);
    await AsyncStorage.setItem(
      '@Primepass:transactions',
      JSON.stringify(result),
    );
  };

  const loadTransactionsHistory = async ({ userId, id, status }: TransactionListQueryVariables) => {
    try {
      NetInfo.fetch().then(async (state) => {
        if (state.isConnected) {
          setLoading(true);
          getTransactions({
            variables: {
              userId,
              id: id || undefined,
              status: status || undefined,
            },
          });
        }
        await getAsyncStorage();
      });
      // eslint-disable-next-line no-empty
    } catch (e) {
    }
  };

  return (
    <TransactionsHistoryContext.Provider
      value={{
        data,
        setData,
        refetch,
        loading,
        loadTransactionsHistory,
        error,
        hasFetched,
        setHasFetched,
      }}
    >
      {children}
    </TransactionsHistoryContext.Provider>
  );
};

function useTransactionsHistory(): TransactionsHistoryContextData {
  const context = useContext(TransactionsHistoryContext);
  if (!context) {
    throw new Error('useTransactionsHistory is required');
  }
  return context;
}

export { TransactionsHistoryProvider, useTransactionsHistory };
