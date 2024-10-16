import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from '../pages/Profile';
import SocialManager from '../pages/Profile/pages/SocialManager';

const ProfileStack = createStackNavigator();

const ProfileRoutes: React.FC = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      headerMode: 'float',
    }}
    initialRouteName="Profile"
  >
    <ProfileStack.Screen name="Profile" component={Profile} />
    <ProfileStack.Screen
      name="managersocial"
      component={SocialManager}
      options={{
        headerShown: false,
      }}
    />
  </ProfileStack.Navigator>
);

export default ProfileRoutes;
