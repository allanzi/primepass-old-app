import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import Header from '../components/Header';
import Partners from '../pages/Partners';
import ValidatedAccess from '../pages/Partners/pages/ValidatedAccess';
import AccessNotFound from '../pages/Partners/pages/AccessNotFound';
import mapAuth from './map/auth';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: true,
      header: () => <Header />,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      cardStyleInterpolator:
          CardStyleInterpolators.forHorizontalIOS,
      headerMode: 'float',
    }}
    initialRouteName="Welcome"
  >

    {mapAuth.map((route) => (
      <Auth.Screen
        name={route.name}
        key={route.name}
        component={route.component}
        options={route.options}
      />
    ))}
    <Auth.Screen
      name="Partners"
      key="Partners"
      component={Partners}
      options={{ headerShown: false }}
    />
    <Auth.Screen
      name="ValidatedAccess"
      key="ValidatedAccess"
      component={ValidatedAccess}
      options={{ headerShown: false }}
    />
    <Auth.Screen
      name="AccessNotFound"
      key="AccessNotFound"
      component={AccessNotFound}
      options={{ headerShown: false }}
    />
  </Auth.Navigator>
);

export default AuthRoutes;
