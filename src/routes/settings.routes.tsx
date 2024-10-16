import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import Settings from '../pages/Settings';
import Theme from '../pages/Settings/pages/Theme';

const Setting = createStackNavigator();

const SettingRoutes: React.FC = () => (
  <Setting.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      cardStyleInterpolator:
          CardStyleInterpolators.forHorizontalIOS,
      headerMode: 'float',
    }}
    initialRouteName="Settings"
  >
    <Setting.Screen
      name="Settings"
      component={Settings}
    />

    <Setting.Screen
      name="Theme"
      component={Theme}
    />

  </Setting.Navigator>

);

export default SettingRoutes;
