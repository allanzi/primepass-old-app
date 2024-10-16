import React, {
  createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { Signature, UserService } from '../@types/graphql/schemas';
import { useUserServicesLazyQuery } from './graphql/hooks';
import {
  UserServicesQuery,
} from '../@types/graphql/operations';
import api from '../services/api';

interface UserServicesContextData {
  data: UserServicesQuery | undefined;
  loading: boolean;
  hasFetched: boolean;
  refetch: any;
  loadUserServices():void;
  error: any;
  setHasFetched: Dispatch<SetStateAction<boolean>>;
  activationService(service: any, signatureId: any):UserService;
}

const UserServicesContext = createContext<UserServicesContextData>({} as UserServicesContextData);

const UserServicesProvider: React.FC = ({ children }) => {
  const [hasFetched, setHasFetched] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [data, setData] = useState({} as UserServicesQuery | undefined);

  const loadAcessToken = async (): Promise<void> => {
    const response = await AsyncStorage.getItem('@Primepass:auth');
    if (response) {
      setAccessToken(JSON.parse(response).token);
    }
  };

  const [getUserServices, {
    data: response, loading, refetch, error,
  }] = useUserServicesLazyQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
    onCompleted: () => {
      setData(response);
      setHasFetched(true);
    },
  });

  useEffect(() => {
    if (!hasFetched) {
      setData({});
    }
  }, [hasFetched, setHasFetched]);

  const loadUserServices = useCallback(async (
  ) => {
    await loadAcessToken();
    getUserServices();
  }, []);

  const activationService = useCallback(async (service, signature): Promise<UserService> => {
    try {
      const { data: { data: activationResponse } } = await api.post(`/signatures/${signature.id}/redeem/${service.id}`, {
        share_data: true,
      });

      let newService = {} as UserService;
      const { activationAccountNumber } = activationResponse;

      if (activationResponse.user) {
        const signatures = service.signatures.map((item: Signature) => {
          if (item.id === signature.id) {
            return { ...signature, redeemed: true, activationAccountNumber };
          }
          return item;
        });

        newService = {
          ...service,
          date_start: activationResponse.date_start,
          date_finish: activationResponse.date_finish,
          signatures,
          user: {
            userName: activationResponse.user.userName,
            password: activationResponse.user.password,
          },
        };
      }

      if (activationResponse.code) {
        const signatures = service.signatures.map((item: Signature) => {
          if (item.id === signature.id) {
            return {
              ...signature,
              code: activationResponse.code,
              valid_thru: activationResponse.valid_thru,
              activationAccountNumber,
              redeemed: true,
            };
          }
          return item;
        });

        newService = {
          ...service,
          date_start: activationResponse.date_start,
          date_finish: activationResponse.date_finish,
          signatures,
        };
      }

      if (!activationResponse.user && !activationResponse.code) {
        const signatures = service.signatures.map((item: Signature) => {
          if (item.id === signature.id) {
            return { ...signature, redeemed: true, activationAccountNumber };
          }
          return item;
        });

        newService = {
          ...service,
          date_start: activationResponse.date_start,
          date_finish: activationResponse.date_finish,
          link: activationResponse.link,
          signatures,
        };
      }

      const updated = data?.services?.map((item: UserService) => {
        if (item.id === newService.id) {
          return { ...newService };
        }
        return { ...item };
      });
      setData({ ...data, services: updated });

      return newService;
    } catch (_) {
      setData(undefined);
      return null;
    }
  }, []);

  return (
    <UserServicesContext.Provider value={{
      data,
      loading,
      refetch,
      loadUserServices,
      error,
      hasFetched,
      setHasFetched,
      activationService,
    }}
    >
      {children}
    </UserServicesContext.Provider>
  );
};

function useUserServices(): UserServicesContextData {
  const context = useContext(UserServicesContext);
  if (!context) {
    throw new Error('useUserServices is required');
  }
  return context;
}

export { UserServicesProvider, useUserServices };
