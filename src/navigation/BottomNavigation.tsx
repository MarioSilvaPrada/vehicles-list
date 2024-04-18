import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {VehiclesList} from '../screens/VehiclesList';
import {Favorites} from '../screens/Favorites';
import {CarIcon} from '../assets/svg/car';
import {HeartIcon} from '../assets/svg/heart';

export type BottomStackParamList = {
  VEHICLES: undefined;
  FAVORITES: undefined;
};

const Tab = createBottomTabNavigator<BottomStackParamList>();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="VEHICLES"
        component={VehiclesList}
        options={{
          tabBarIcon: ({color}) => <CarIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="FAVORITES"
        component={Favorites}
        options={{
          tabBarIcon: ({color}) => <HeartIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
