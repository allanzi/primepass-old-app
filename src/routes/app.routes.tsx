import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import Callback from '../pages/Callback';
import CallbackPartner from '../pages/CallbackPartner';
import Onboard from '../pages/Onboard';
import ServerError from '../pages/ServerError';
import ConnectionError from '../pages/ConnectionError';
import AuthRoutes from './auth.routes';
import CreditCardsRoutes from './creditcards.routes';
import TabNavigation from './navigations/TabNavigation';
import Settings from './settings.routes';
import HelpDeskRoutes from './helpdesk.routes';
import Promotions from './promotions.routes';
import Transactions from './transactions.routes';
import HistoryTheater from '../pages/HistoryTheater';
import HistoryResume from '../pages/HistoryResume';
import SuccessfullyReleased from '../pages/SuccessfullyReleased';
import DeletedAccount from '../pages/DeletedAccount';

import { getDeepLink } from '../utils/deepLink';
import { useAuth } from '../hooks/auth';

const App = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  const linking: LinkingOptions = {
    prefixes: [
      getDeepLink(),
    ],
    config: {
      screens: {
        Callback: 'oauth2/callback/:code/:product/:companyId',
        CallbackPartner: 'partner-login/callback/:companyId/:subscriberId',
      },
    },
  };

  SplashScreen.hide();

  return (
    <NavigationContainer linking={linking}>
      <App.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <App.Screen name="Login" component={AuthRoutes} />
            <App.Screen name="Home" component={TabNavigation} />
          </>
        ) : (
          <>
            <App.Screen name="Home" component={TabNavigation} />
            <App.Screen name="Login" component={AuthRoutes} />
          </>
        )}
        <App.Screen name="Onboard" component={Onboard} options={{ gestureEnabled: false }} />
        <App.Screen name="HistoryTheater" component={HistoryTheater} />
        <App.Screen name="HistoryResume" component={HistoryResume} />
        <App.Screen name="SuccessfullyReleased" component={SuccessfullyReleased} />
        <App.Screen name="Callback" component={Callback} />
        <App.Screen name="CallbackPartner" component={CallbackPartner} />
        <App.Screen name="ConnectionError" component={ConnectionError} />
        <App.Screen name="ServerError" component={ServerError} />
        <App.Screen name="Settings" component={Settings} />
        <App.Screen name="CreditCards" component={CreditCardsRoutes} />
        <App.Screen name="Promotions" component={Promotions} />
        <App.Screen name="HelpDeskMenu" component={HelpDeskRoutes} />
        <App.Screen name="Transactions" component={Transactions} />
        <App.Screen
          name="DeletedAccount"
          component={DeletedAccount}
          options={{ gestureEnabled: false }}
        />
      </App.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
