import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import TransactionCheckIn from '../pages/Transactions/pages/TransactionCheckIn';
import TransactionTheaters from '../pages/Transactions/pages/TransactionTheaters';
import TransactionTicketConfirm from '../pages/Transactions/pages/TransactionTicketConfirm';
import TheaterMap from '../pages/Transactions/pages/TheaterMap';
import TransactionsHistory from '../pages/TransactionsHistory';

const Transactions = createStackNavigator();

const TransactionsRoutes: React.FC = () => (
  <Transactions.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      cardStyleInterpolator:
          CardStyleInterpolators.forHorizontalIOS,
      headerMode: 'float',

    }}
    initialRouteName="TransactionTheaters"
  >
    <Transactions.Screen
      name="TransactionTheaters"
      component={TransactionTheaters}
    />
    <Transactions.Screen
      name="TheaterMap"
      component={TheaterMap}
    />
    <Transactions.Screen
      name="TransactionTicketConfirm"
      component={TransactionTicketConfirm}
    />
    <Transactions.Screen
      name="TransactionCheckIn"
      component={TransactionCheckIn}
      options={{ gestureEnabled: false }}
    />
    <Transactions.Screen
      name="TransactionsHistory"
      component={TransactionsHistory}
    />

  </Transactions.Navigator>

);

export default TransactionsRoutes;
