import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';

import api from '../services/api';

interface WalletContextData {
  balance: number;
  lastRecharge: string;
  fetchWallet: Function;
  loading: boolean;
  error: boolean;
  hasFetched: boolean;
  setHasFetched: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line max-len
const WalletContext = createContext<WalletContextData>({} as WalletContextData);

const WalletProvider: React.FC = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [lastRecharge, setLastRecharge] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchWallet = useCallback(async (id) => {
    try {
      setLoading(true);
      const { data: { data } } = await api.get(`wallet-history/${id}?balance=true`);

      setBalance(data?.balance || 0);
      setLastRecharge(data?.date || '');
      setHasFetched(true);
    } catch (_) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <WalletContext.Provider value={{
      balance,
      lastRecharge,
      loading,
      fetchWallet,
      error,
      hasFetched,
      setHasFetched,
    }}
    >
      {children}
    </WalletContext.Provider>
  );
};

function useWallet(): WalletContextData {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('wallet is required');
  }
  return context;
}

export { WalletProvider, useWallet };
