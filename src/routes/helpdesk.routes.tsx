import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import HelpDeskMenu from '../pages/HelpDesk';
import HowToUseMyTicket from '../pages/HelpDesk/pages/HowToUseMyTicket';

const HelpDeskStack = createStackNavigator();

const HelpDeskRoutes: React.FC = () => (
  <HelpDeskStack.Navigator
    screenOptions={{
      headerShown: false,
      gestureDirection: 'horizontal',
      gestureEnabled: true,
      headerMode: 'float',
    }}
    initialRouteName="HelpDesk"
  >
    <HelpDeskStack.Screen
      name="HelpDeskMenu"
      component={HelpDeskMenu}
      options={{
        headerShown: false,
      }}
    />
    <HelpDeskStack.Screen
      name="HowToUseMyTicket"
      component={HowToUseMyTicket}
      options={{
        headerShown: false,
      }}
    />
  </HelpDeskStack.Navigator>
);

export default HelpDeskRoutes;
