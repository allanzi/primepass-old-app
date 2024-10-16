import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import PlansAndServices from '../pages/PlansServices';
import Unsubscribe from '../pages/PlansServices/pages/Unsubscribe';
import Reason from '../pages/PlansServices/pages/Reason';
import SuccessfullyUnsubscribed from '../pages/PlansServices/pages/SuccessfullyUnsubscribed';

const PlansServices = createStackNavigator();

const PlansServicesPage: React.FC = () => (
  <PlansServices.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      cardStyleInterpolator:
          CardStyleInterpolators.forHorizontalIOS,
      headerMode: 'float',
    }}
    initialRouteName="PlansServices"
  >
    <PlansServices.Screen
      name="PlansServices"
      key="PlansServices"
      component={PlansAndServices}
    />
    <PlansServices.Screen
      name="Unsubscribe"
      key="Unsubscribe"
      component={Unsubscribe}
    />
    <PlansServices.Screen
      name="Reason"
      key="Reason"
      component={Reason}
    />
    <PlansServices.Screen
      name="SuccessfullyUnsubscribed"
      key="SuccessfullyUnsubscribed"
      component={SuccessfullyUnsubscribed}
    />
  </PlansServices.Navigator>

);

export default PlansServicesPage;
