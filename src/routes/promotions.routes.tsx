import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ActivateService from '../pages/RedeemCode/pages/ActivateService';
import RedeemCode from '../pages/RedeemCode';
import RedeemComboService from '../pages/RedeemCode/pages/RedeemComboService';
import RedeemDetails from '../pages/RedeemCode/pages/RedeemDetails';
import RedeemSelectService from '../pages/RedeemCode/pages/RedeemSelectService';
import SuccessfullyRedeemed from '../pages/RedeemCode/pages/SuccessfullyRedeemed';

const TheatersStack = createStackNavigator();

const RedeemCodeRoutes: React.FC = () => (
  <TheatersStack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      headerMode: 'float',
    }}
    initialRouteName="RedeemCode"
  >
    <TheatersStack.Screen
      name="RedeemCode"
      component={RedeemCode}
      options={{
        headerShown: false,
      }}
    />
    <TheatersStack.Screen
      name="RedeemDetails"
      component={RedeemDetails}
      options={{
        headerShown: false,
      }}
    />
    <TheatersStack.Screen
      name="RedeemSelectService"
      component={RedeemSelectService}
      options={{
        headerShown: false,
      }}
    />
    <TheatersStack.Screen
      name="SuccessfullyRedeemed"
      component={SuccessfullyRedeemed}
      options={{
        headerShown: false,
      }}
    />
    <TheatersStack.Screen
      name="ActivateService"
      component={ActivateService}
      options={{
        headerShown: false,
      }}
    />
    <TheatersStack.Screen
      name="RedeemComboService"
      component={RedeemComboService}
      options={{
        headerShown: false,
      }}
    />
  </TheatersStack.Navigator>
);

export default RedeemCodeRoutes;
