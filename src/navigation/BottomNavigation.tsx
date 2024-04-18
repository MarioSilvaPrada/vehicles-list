import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {VehiclesList} from '../screens/VehiclesList';
import {Favorites} from '../screens/Favorites';
import {CarIcon} from '../assets/svg/car';
import {HeartIcon} from '../assets/svg/heart';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Vehicles"
        component={VehiclesList}
        options={{
          tabBarIcon: ({color}) => <CarIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({color}) => <HeartIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
