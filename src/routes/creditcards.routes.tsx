import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import List from '../pages/CreditCards/pages/List';
import Create from '../pages/CreditCards/pages/Create';

const CreditCardsStack = createStackNavigator();

const CreditCardsRoutes: React.FC = () => (
  <CreditCardsStack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      headerMode: 'float',
    }}
  >
    <CreditCardsStack.Screen
      name="Create"
      component={Create}
      options={{
        headerShown: false,
      }}
    />
    <CreditCardsStack.Screen
      name="List"
      component={List}
      options={{
        headerShown: false,
      }}
    />
  </CreditCardsStack.Navigator>
);

export default CreditCardsRoutes;
