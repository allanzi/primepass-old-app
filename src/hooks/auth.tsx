/* eslint-disable max-len, implicit-arrow-linebreak, @typescript-eslint/naming-convention, @typescript-eslint/no-shadow, no-param-reassign, import/no-cycle */
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as Sentry from '@sentry/react-native';

import api from '../services/api';
import { useUserDetailsLazyQuery } from './graphql/hooks';
import { useAction } from './actions';
import { useCreditResume } from './creditResume';
import { useUserServices } from './userServices';
import { useTransactionsHistory } from './transactionsHistory';
import { useUserDetails } from './userDetails';
import { useWallet } from './wallet';

interface CredentialProps {
  phone: string;
  code: string | number;
}

interface CredentialValidateProps {
  phone: string;
  code: string | number;
  partner_type: string;
}

interface ValidatePinCode {
  status: boolean;
  firstAccess?: boolean;
}

interface AuthContextState {
  user: User;
  auth: Auth;
  validatePinCode(data: CredentialValidateProps): Promise<ValidatePinCode>;
  verify(
    partner_type: string,
    authConfig: AuthConfigType,
  ): Promise<VerificationResponse>;
  verifyLogin(type: string, code: string): Promise<VerificationResponseLogin>;
  registerUser(data: NewUser): Promise<ResponseCreateUser>;
  signOut(): Promise<void>;
  signIn(data: CredentialProps): Promise<ResponseCreateUser>;
  signInOld(data: OldUserCredentials): Promise<ResponseCreateUser>;
  updateAccess(data: UpdateData): Promise<ResponseCreateUser>;
  validateUser(email: string): Promise<User>;
  socialLogin(data: SocialLogin): Promise<User>;
  socialSignUp(data: SocialSignUp): Promise<User>;
  partnerSignIn(data: PartnerSignIn): Promise<User>;
  partnerSignUp(data: PartnerSignUp): Promise<User>;
  setDataGraphql({ user }: { user: User }): Promise<void>;
  loadStorageData(): Promise<User | void>;
}

interface VerificationResponse {
  email: string | null;
  hasPassword: boolean;
  id: string | null;
  token: string;
}

interface VerificationResponseLogin {
  found: boolean;
  verified: boolean;
  phone: string | null;
  id: string | null;
  maskedPhone: string | null;
}

interface NewUser {
  name: string;
  email: string;
  phone: string;
  token: string;
}

interface Service {
  id: string;
  name: string;
  type: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface Signature {
  id: string;
  dateStart: Date;
  dateFinish: Date;
  services: Array<Service>;
}

export interface User {
  name: string;
  email: string;
  id: string;
  profile_picture: string;
  phone: string;
  createdAt: string;
  verified: boolean;
  signatures?: Array<Signature>;
  partner_type: string;
  partner_id: string | null;
  partner_token: string | null;
}

interface UpdateData {
  user_id: string | null;
  phone: string;
  userPhone?: string;
  code: string;
}

interface SocialLogin {
  partner_type: string;
  partner_id: string;
  partner_token: string;
}

interface SocialSignUp {
  name: string;
  email: string;
  phone: string;
  partner_id: string;
  partner_token: string;
  partner_type: string;
}

interface PartnerSignIn {
  phone: string;
  partner_type: string;
  partner_token: string;
}
interface PartnerSignUp {
  name: string;
  email: string;
  phone: string;
  partner_token: string;
  partner_type: string;
}

interface Auth {
  token: string;
}

interface ResponseCreateUser {
  user: User;
  auth: Auth;
}

interface AuthState {
  auth: Auth;
  user: User;
}

interface OldUserCredentials {
  email: string;
  password: string;
}

export interface AuthConfigType {
  type?: string;
  phone: string;
  email?: string;
  name?: string;
  sendType?: boolean;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC = ({ children }) => {
  const { setHasFetched: setHasFetchedCreditResume } = useCreditResume();
  const { setHasFetched: setHasFetchedUserServices } = useUserServices();
  const { setHasFetched: setHasFetchedTrasactionsHistory, setData: setDataTrasactionsHistory } = useTransactionsHistory();
  const { setHasFetched: setHasFetchedUserDetails, setHasPlan: setHasPlanUserDetails } = useUserDetails();
  const { setHasFetched: setHasFetchedWallet } = useWallet();

  const [dados, setData] = useState<AuthState>({} as AuthState);
  const [
    loadUserDataFromGraphQL,
  ] = useUserDetailsLazyQuery();
  const { logUserData, logUserLogin, logDeviceInfo } = useAction();
  const [loginMethod, setLoginMethod] = useState('');

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [user, auth] = await AsyncStorage.multiGet([
        '@Primepass:user',
        '@Primepass:auth',
      ]);
      let userId = '0';
      if (user[1] && auth[1]) {
        setData({
          user: JSON.parse(user[1]),
          auth: JSON.parse(auth[1]),
        });
        api.defaults.headers.authorization = JSON.parse(auth[1]).token;
        userId = JSON.parse(user[1]).id;
        logDeviceInfo('app', userId);
      }
    }

    loadStorageData();
  }, []);

  useEffect(() => {
    const { user } = dados;
    if (user && loginMethod && logUserLogin && logUserData) {
      logUserLogin(loginMethod, user.id);
      logUserData({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    }
  }, [dados, loginMethod, logUserLogin, logUserData]);

  const setAsyncStorage = useCallback(async ({ user, auth }: AuthState) => {
    try {
      loadUserDataFromGraphQL({
        variables: {
          user_id: user.id,
        },
      });

      Sentry.setUser({ id: user.id, username: user.name, email: user.email });

      await AsyncStorage.multiSet([
        ['@Primepass:user', JSON.stringify(user)],
        ['@Primepass:auth', JSON.stringify(auth)],
      ]);
      return true;
    } catch (error) {
      return false;
    }
  }, []);

  const validatePinCode = useCallback(
    async ({ partner_type, phone, code }: CredentialValidateProps) => {
      if (partner_type !== 'vivo') {
        const {
          data: {
            data: { status },
          },
        } = await api.post('/users/validate', { phone, token: code });
        return { status };
      }
      phone = phone.replace('+', '');
      try {
        const {
          data: {
            data: { firstAccess },
          },
        } = await api.post(`/users/login/${partner_type}`, {
          phone,
          pin: code,
        });
        return {
          status: true,
          firstAccess: firstAccess === undefined ? false : firstAccess,
        };
      } catch (err: any) {
        throw new Error(err.response.data.error.message);
      }
    },
    [],
  );

  const verify = useCallback(
    async (partner_type: string, authConfig: AuthConfigType) => {
      const {
        type, phone, email, sendType,
      } = authConfig;

      const payload = {
        phone,
        email,
        type,
      };

      if (!sendType) {
        delete payload.type;
      }

      if (partner_type !== 'vivo') {
        try {
          const result = await api.post('/users/verify', payload);
          const { data: returnData } = result.data;

          return returnData;
        } catch (error) {
          throw new Error(error.response.data.error.details.phone);
        }
      }

      const unmaskedPhone = phone.replace('+', '');
      try {
        const {
          data: { data },
        } = await api.get(`/users/login/${partner_type}/${unmaskedPhone}`);
        return data;
      } catch (error) {
        throw new Error(error.response.data.error.message);
      }
    },
    [],
  );

  const verifyLogin = useCallback(async (type: string, code: string) => {
    if (type === 'email') {
      const { data } = await api.post('/users/verify-login', { email: code });
      return data;
    }
    const { data } = await api.post('/users/verify-login', { phone: code });
    return data;
  }, []);

  const clearRequests = () => {
    setHasFetchedUserServices(false);
    setHasPlanUserDetails(false);
    setHasFetchedCreditResume(false);
    setHasFetchedUserDetails(false);
    setHasFetchedWallet(false);
    setHasFetchedTrasactionsHistory(false);
    setDataTrasactionsHistory([]);
  };

  const setUserData = async (
    data: any,
    partner_type: string,
    partner_id: string | null = null,
    partner_token: string | null = null,
  ) => {
    const newData = {
      ...data,
      user: {
        ...data.user,
        partner_type,
        partner_id,
        partner_token,
      },
    };
    const { user, auth } = newData;
    await setAsyncStorage({ user, auth });
    setData(newData);
    api.defaults.headers.authorization = auth.token;
    setLoginMethod(partner_type);
    clearRequests();
    return newData;
  };

  const registerUser = useCallback(async (dados: NewUser) => {
    const {
      data: { data },
    } = await api.post('/users/signup', dados);
    return setUserData(data, 'primepass');
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Primepass:user', '@Primepass:auth']);
    setData({} as AuthState);
    clearRequests();
    setLoginMethod('');
  }, []);

  const signIn = useCallback(async ({ phone, code }: CredentialProps) => {
    const {
      data: { data },
    } = await api.post('/users/login', { phone, token: code });
    return setUserData(data, 'primepass');
  }, []);

  const signInOld = useCallback(async (dados: OldUserCredentials) => {
    await signOut();
    const {
      data: { data },
    } = await api.post('/users/first-access', dados);
    return setUserData(data, 'primepass');
  }, []);

  const updateAccess = useCallback(
    async ({ user_id, phone, code }: UpdateData) => {
      const {
        data: { data },
      } = await api.post('/users/update-access', {
        phone,
        user_id,
        token: code,
      });
      return setUserData(data, 'primepass');
    },
    [],
  );

  const socialLogin = useCallback(async (socialLoginData: SocialLogin) => {
    const { partner_type, partner_id, partner_token } = socialLoginData;
    const {
      data: { data },
    } = await api.post('/users/partner-login', socialLoginData);
    return setUserData(data, partner_type, partner_id, partner_token);
  }, []);

  const socialSignUp = useCallback(async (signUpData: SocialSignUp) => {
    const { partner_type, partner_id, partner_token } = signUpData;
    const {
      data: { data },
    } = await api.post('/users/partner-signup', signUpData);
    return setUserData(data, partner_type, partner_id, partner_token);
  }, []);

  const partnerSignIn = useCallback(
    async ({ phone, partner_type, partner_token }: PartnerSignIn) => {
      const {
        data: { data },
      } = await api.post(`/users/login/${partner_type}`, {
        phone: phone.replace('+', ''),
        pin: partner_token,
      });
      return setUserData(data, partner_type);
    },
    [],
  );

  const partnerSignUp = useCallback(async (signUpData: PartnerSignUp) => {
    const {
      phone, name, email, partner_token, partner_type,
    } = signUpData;
    try {
      const {
        data: { data },
      } = await api.post(`/users/login/${partner_type}`, {
        phone: phone.replace('+', ''),
        name,
        email,
        pin: partner_token,
      });
      return await setUserData(data, partner_type);
    } catch (error) {
      throw new Error('Opps, algo deu errado, tente mais tarde.');
    }
  }, []);

  const validateUser = useCallback(async (email: string) => {
    const {
      data: { data },
    } = await api.get(`/users?email=${email}`);
    const [user] = data;
    return user;
  }, []);

  const setDataGraphql = useCallback(async ({ user }: { user: User }) => {
    if (dados.auth) {
      await setAsyncStorage({ user, auth: dados.auth });
    }
  }, []);

  const loadStorageData = async (): Promise<void> =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      const [user, auth] = await AsyncStorage.multiGet([
        '@Primepass:user',
        '@Primepass:auth',
      ]);

      if (user[1] && auth[1]) {
        setData({
          user: JSON.parse(user[1]),
          auth: JSON.parse(auth[1]),
        });
        api.defaults.headers.authorization = JSON.parse(auth[1]).token;

        resolve(JSON.parse(user[1]));
      }

      resolve();
    });
  return (
    <AuthContext.Provider
      value={{
        user: dados.user,
        auth: dados.auth,
        validatePinCode,
        verify,
        verifyLogin,
        registerUser,
        signOut,
        signIn,
        signInOld,
        updateAccess,
        validateUser,
        setDataGraphql,
        socialLogin,
        socialSignUp,
        partnerSignIn,
        partnerSignUp,
        loadStorageData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth should be used with an AuthProvider');
  }

  return context;
}

export { useAuth, AuthProvider };
