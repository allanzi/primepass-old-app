import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Host } from 'react-native-portalize';
import { Platform } from 'react-native';
import { ThemeContext } from 'styled-components';

import DashboardFill from '../../../assets/img/dashboardFill.svg';
import DashboardIcon from '../../../assets/img/dashboard.svg';
import Home from '../../../pages/Home';
import HomeFill from '../../../assets/img/homeFill.svg';
import HomeIcon from '../../../assets/img/home.svg';
import Menu from '../../../assets/img/menu.svg';
import MenuActive from '../../../assets/img/menuActive.svg';
import MyTickets from '../../../pages/MyTickets';
import PlansServices from '../../plansAndServices.routes';
import ProfileRoutes from '../../profile.routes';
import PromotionFill from '../../../assets/img/promoFill.svg';
import PromotionIcon from '../../../assets/img/promo.svg';
import Redeem from '../../../pages/RedeemCode';
import Ticket from '../../../assets/img/ticket.svg';
import TicketFill from '../../../assets/img/ticketFill.svg';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const theme = useContext(ThemeContext);

  return (
    <Host>
      <Tab.Navigator
        initialRouteName="TabNavigation"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderTopWidth: 0.3,
            borderTopColor: theme.colors.opacity,
            shadowOpacity: 0.5,
            shadowOffset: { width: 0, height: 2 },
            elevation: 20,
            paddingBottom: Platform.OS === 'ios' ? 22 : 6,
            paddingHorizontal: 8,
            height: Platform.OS === 'ios' ? 70 : 50,
          },
          tabBarActiveTintColor: theme.colors.primaryBlue,
          tabBarInactiveTintColor: theme.colors.icon,
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen
          name="TabNavigation"
          component={Home}
          options={{
            tabBarLabel: 'Início',
            tabBarLabelStyle: { color: theme.colors.icon },
            tabBarIcon: ({ focused, color }) => (
              focused ? (
                <HomeFill width={22} height={22} marginTop={6} />
              ) : (
                <HomeIcon width={22} height={22} fill={color} marginTop={6} />

              )
            ),
          }}
        />

        <Tab.Screen
          name="Redeem"
          component={Redeem}
          options={{
            tabBarLabel: 'Resgate',
            tabBarLabelStyle: { color: theme.colors.icon },
            tabBarIcon: ({ focused }) => (
              focused ? (
                <PromotionFill width={22} height={22} marginTop={6} />
              ) : (
                <PromotionIcon width={22} height={22} marginTop={6} />
              )
            ),
          }}
        />

        <Tab.Screen
          name="MyTickets"
          component={MyTickets}
          options={{
            tabBarLabel: 'Ingressos',
            tabBarLabelStyle: { color: theme.colors.icon },
            tabBarIcon: ({ focused, color }) => (
              focused ? (
                <TicketFill width={22} height={22} marginTop={6} />
              ) : (
                <Ticket width={22} height={22} fill={color} marginTop={6} />
              )

            ),
          }}
        />

        <Tab.Screen
          name="PlansServices"
          component={PlansServices}
          options={{
            tabBarLabel: 'Planos',
            tabBarLabelStyle: { color: theme.colors.icon },
            tabBarIcon: ({ focused, color }) => (
              focused ? (
                <DashboardFill width={22} height={22} marginTop={6} />
              ) : (
                <DashboardIcon width={22} height={22} fill={color} marginTop={6} />
              )
            ),
          }}
        />

        <Tab.Screen
          name="More"
          component={ProfileRoutes}
          options={{
            tabBarLabel: 'Mais',
            tabBarLabelStyle: { color: theme.colors.icon },
            tabBarIcon: ({ focused, color }) => (
              focused ? (
                <MenuActive width={22} height={22} fill={color} marginTop={6} />
              ) : (
                <Menu width={22} height={22} fill={color} marginTop={6} />
              )
            ),
          }}
        />
      </Tab.Navigator>
    </Host>
  );
}
