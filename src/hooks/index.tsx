import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ActionsProvider } from './actions';
import { AnimationProvider } from './animation';
import { AuthProvider } from './auth';
import { CreditResumeProvider } from './creditResume';
import { GraphQlProvider } from './graphql';
import { LocationProvider } from './location';
import { UserServicesProvider } from './userServices';
import { ThemeProvider } from './theme';
import { TransactionsHistoryProvider } from './transactionsHistory';
import { UserDetailsProvider } from './userDetails';
import { WalletProvider } from './wallet';

import combineComponents from '../utils/combineComponents';

const providers = [
  ThemeProvider,
  GraphQlProvider,
  LocationProvider,
  AnimationProvider,
  ActionsProvider,
  UserDetailsProvider,
  CreditResumeProvider,
  UserServicesProvider,
  TransactionsHistoryProvider,
  WalletProvider,
  AuthProvider,
  SafeAreaProvider,
];

const AppProvider = combineComponents(...providers);

export default AppProvider;
